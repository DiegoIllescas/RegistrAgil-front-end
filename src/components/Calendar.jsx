import React, { useState } from 'react';
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
  const [meetings, setMeetings] = useState([
    {
      anfitrion: 'Carlos Villareal',
      asunto: 'Reunión General',
      sala: 'Sala A',
      fecha: '2024-06-05',
      horai: '08:00',
      horaf: '10:00',
      direccion: 'CDMX',
      descripcion: 'Description 1'
    },
    {
      anfitrion: 'Jesus Pérez',
      asunto: 'Reunión equipo Back-End',
      sala: 'Sala B',
      fecha: '2024-06-05',
      horai: '07:00',
      horaf: '09:00',
      direccion: 'CDMX',
      descripcion: 'Description 2'
    },
    {
      anfitrion: 'Ana Medina',
      asunto: 'Reunión equipo Front-End',
      sala: 'Sala A',
      fecha: '2024-06-20',
      horai: '10:00',
      horaf: '11:00',
      direccion: 'CDMX',
      descripcion: 'Description 3'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailedMeeting, setDetailedMeeting] = useState(null);

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

  const getMeetingsForDay = (day) => {
    return meetings.filter(meeting => moment(meeting.fecha).isSame(day, 'day')).sort((a, b) => moment(a.horai, 'HH:mm') - moment(b.horai, 'HH:mm'));
  };

  const getMeetingStatus = (meeting) => {
    const now = moment();
    const start = moment(meeting.fecha + ' ' + meeting.horai, 'YYYY-MM-DD HH:mm');
    const end = moment(meeting.fecha + ' ' + meeting.horaf, 'YYYY-MM-DD HH:mm');

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
      <p className="mb-2"><Icon.Clock color="#0B1215" size={14} className="me-2" />{meeting.horai} - {meeting.horaf}</p>
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
                  <p><Icon.Clock color="#0B1215" size={13} className="me-2" />{detailedMeeting.horai} - {detailedMeeting.horaf}</p>
                  <p><Icon.GeoAlt color="#0B1215" size={15} className="me-2" />{detailedMeeting.direccion} - {detailedMeeting.sala}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button className="boton" onClick={() => { setShowDetailModal(false); setShowModal(true) }}>
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
