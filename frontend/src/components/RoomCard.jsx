import React from 'react';

const RoomCard = ({ room, onReserve }) => {
  const isAvailable = room.disponible;

  return (
    <article className={`room-card ${!isAvailable ? 'room-card-disabled' : ''}`}>
      <div className="room-card-image-wrapper">
        <img src={room.imagen} alt={`Habitación ${room.tipo}`} className="room-card-image" />
        <div className="room-card-badge">
          {isAvailable ? (
            <span className="badge-available">Disponible</span>
          ) : (
            <span className="badge-unavailable">Agotada</span>
          )}
        </div>
      </div>
      <div className="room-card-content">
        <h4 className="room-card-title">Habitación {room.tipo}</h4>
        <div className="room-card-details">
          <p className="room-card-capacity">
            <span className="icon-users">👥</span> Capacidad: {room.capacidad} pers.
          </p>
        </div>
        <div className="room-card-footer">
          <div className="room-card-price-info">
            <span className="price-value">${room.precio}</span>
            <span className="price-period">/ noche</span>
          </div>
          <button 
            className={`room-card-btn ${!isAvailable ? 'btn-disabled' : 'btn-primary'}`} 
            disabled={!isAvailable} 
            onClick={() => onReserve && onReserve(room.id)}
          >
            {isAvailable ? 'Reservar' : 'No Disponible'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
