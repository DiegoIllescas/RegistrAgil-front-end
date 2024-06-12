import React ,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Container, Modal, Button } from 'react-bootstrap';
import "../CSS/Calendar.css";
import moment from 'moment';
import * as Icon from "react-bootstrap-icons";

// Define los nombres de los meses y los días de la semana en español
const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [detailedMeeting, setDetailedMeeting] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      alert("No tienes permiso");
      navigate('/LogIn');
    }else{
    const options = {
      method : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ token
      },
      body : JSON.stringify({
        mes: currentDate.month() + 1,
        year : currentDate.year()
      }),
      referrerPolicy: "no-referrer"
    };
    fetch("http://localhost/backend/junta.php", options)
    .then((response) => response.json())
    .then((data) => {
      if(data.success) {
        setMeetings(data.juntas);
      }else{
        if(data.error == "Sesion expirada") {
          navigate('/LogIn')
        }
      }
    })
  }
  },[currentDate]);

  const startOfMonth = currentDate.clone().startOf('month').startOf('week');
  const endOfMonth = currentDate.clone().endOf('month').endOf('week');

  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    setSelectedDate(day.clone());
    setShowModal(true);
  };

  const handleDetailClick = (meeting) => {
    setDetailedMeeting(meeting);
    setShowModal(false);
    setShowDetailModal(true);
  };

  const handleGuestsClick = (meeting) => {
    setDetailedMeeting(meeting);
    setShowGuestsModal(true);
  };

  const getMeetingsForDay = (day) => {
    return meetings.filter(meeting => moment(meeting.fecha).isSame(day, 'day')).sort((a, b) => moment(a.hora_inicio, 'HH:mm') - moment(b.hora_inicio, 'HH:mm'));
  };

  const getMeetingStatus = (meeting) => {
    const now = moment();
    const start = moment(meeting.fecha + ' ' + meeting.hora_inicio, 'YYYY-MM-DD HH:mm');
    const end = moment(meeting.fecha + ' ' + meeting.hora_fin, 'YYYY-MM-DD HH:mm');

    if (now.isBefore(start)) return 'future';
    if (now.isBetween(start, end)) return 'in-progress';
    return 'past';
  };

  const renderStatusCircle = (status) => {
    const color = {
      'past': 'red',
      'in-progress': 'yellow',
      'future': 'green'
    }[status];
    return <span className="status-circle" style={{ backgroundColor: color }}></span>;
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  const renderCalendarDays = () => {
    const days = [];
    let day = startOfMonth.clone();

    while (day.isBefore(endOfMonth, 'day')) {
      const currentDay = day.clone();
      const isCurrentMonth = day.month() === currentDate.month();
      const isToday = day.isSame(moment(), 'day');
      const meetingsForDay = getMeetingsForDay(currentDay);
      const firstMeeting = meetingsForDay[0];
      days.push(
        <div
          key={currentDay.format('YYYY-MM-DD')}
          className={`calendar-day ${isCurrentMonth ? '' : 'disabled'} ${isToday ? 'today' : ''}`}
          onClick={() => handleDayClick(currentDay, isCurrentMonth)}
        >
          <div className="date">{currentDay.date()}</div>
          <div className="reunion">
            {firstMeeting && (
              <div>
                {renderStatusCircle(getMeetingStatus(firstMeeting))} {truncateText(firstMeeting.asunto, 12)}
              </div>
            )}
            {meetingsForDay.length > 1 && <div className="text-ver-mas">{meetingsForDay.length - 1} más</div>}
          </div>
        </div>
      );
      day.add(1, 'day');
    }

    return days;
  };

  const renderDayHeaders = () => {
    return diasSemana.map(day => (
      <div key={day} className="calendar-header-day">
        {day}
      </div>
    ));
  };

  const renderMeetingDetails = (meeting) => (
    <div key={meeting.asunto} className="mb-4">
      <h5>{renderStatusCircle(getMeetingStatus(meeting))} {meeting.asunto}</h5>
      <p>{meeting.anfitrion}</p>
      <p className="mb-2"><Icon.Clock color="#0B1215" size={14} className="me-2" />{meeting.hora_inicio} - {meeting.hora_fin}</p>
      <Button variant="link" className="boton-detalles-juntas" onClick={() => handleDetailClick(meeting)}>Ver más detalles</Button>
    </div>
  );

  return (
    <Container fluid className="mainContainer d-flex justify-content-center m-1 mt-3 mb-5">
      <Row className="d-flex justify-content-center" style={{ width: '100%' }}>
        <div className="calendar">
          <div className="calendar-header">
            <Button className='boton-regresar' onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'month'))}><Icon.ArrowLeft size={25} /></Button>
            <h2>{meses[currentDate.month()]} {currentDate.year()}</h2>
            <Button className="boton-regresar" onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}><Icon.ArrowRight size={25} /></Button>
          </div>
          <div className="calendar-grid">
            <div className="calendar-grid-header">
              {renderDayHeaders()}
            </div>
            <div className="calendar-grid-body">
              {renderCalendarDays()}
            </div>
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>Reuniones - {selectedDate && `${diasSemana[selectedDate.day()]} ${selectedDate.format('DD')} de ${meses[selectedDate.month()]} de ${selectedDate.format('YYYY')}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedDate && getMeetingsForDay(selectedDate).length > 0 ? (
                getMeetingsForDay(selectedDate).map(meeting => (
                  renderMeetingDetails(meeting)
                ))
              ) : (
                <p>Sin reuniones.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button className="boton" onClick={() => setShowModal(false)}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>Detalles de la Reunión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {detailedMeeting && (
                <div>
                  <h5 className='mb-3'>{renderStatusCircle(getMeetingStatus(detailedMeeting))} {detailedMeeting.asunto}</h5>
                  <p><strong>Anfitrión: </strong>{detailedMeeting.anfitrion}</p>
                  <p><strong>Descripción: </strong>{detailedMeeting.descripcion}</p>
                  <p><Icon.Calendar color="#0B1215" size={13} className="me-2" />{detailedMeeting.fecha}</p>
                  <p><Icon.Clock color="#0B1215" size={13} className="me-2" />{detailedMeeting.hora_inicio} - {detailedMeeting.hora_fin}</p>
                  <p><Icon.GeoAlt color="#0B1215" size={15} className="me-2" />{detailedMeeting.direccion} - {detailedMeeting.sala}</p>
                  <Button variant="link" className="boton-detalles-juntas" onClick={() => { setShowDetailModal(false); handleGuestsClick(detailedMeeting) }}>Ver invitados</Button>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button className="boton" onClick={() => { setShowDetailModal(false); setShowModal(true) }}>
                Regresar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showGuestsModal} onHide={() => setShowGuestsModal(false)} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>Invitados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {detailedMeeting && Array.isArray(detailedMeeting.invitados) && detailedMeeting.invitados.length > 0 ? (
                detailedMeeting.invitados.map((invitado, index) => (
                  <p key={index}>{index + 1}. {invitado}</p>
                ))
              ) : (
                <p>Sin invitados.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button className="boton" onClick={() => { setShowGuestsModal(false); setShowDetailModal(true) }}>
                Regresar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Row>
    </Container >
  );
};

export default Calendar;
