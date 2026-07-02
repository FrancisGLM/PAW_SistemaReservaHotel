import React, { useState, useRef, useEffect } from 'react';

const PassengerSelector = ({ disabled, theme = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [rooms, setRooms] = useState([{ adults: 2, childrenAges: [] }]);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  };

  const totalPassengers = rooms.reduce((acc, room) => acc + room.adults + room.childrenAges.length, 0);
  const totalRooms = rooms.length;

  const updateRoom = (index, field, value) => {
    const newRooms = [...rooms];
    if (field === 'adults') {
      if (value >= 1 && value + newRooms[index].childrenAges.length <= 8) {
        newRooms[index].adults = value;
      }
    } else if (field === 'childrenCount') {
      const currentChildren = newRooms[index].childrenAges.length;
      if (value > currentChildren && newRooms[index].adults + value <= 8) {
        newRooms[index].childrenAges.push(0); // add new child with age 0
      } else if (value < currentChildren) {
        newRooms[index].childrenAges.pop(); // remove last child
      }
    }
    setRooms(newRooms);
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].childrenAges[childIndex] = parseInt(age);
    setRooms(newRooms);
  };

  const addRoom = () => {
    if (rooms.length < 4) {
      setRooms([...rooms, { adults: 2, childrenAges: [] }]);
    }
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const newRooms = [...rooms];
      newRooms.splice(index, 1);
      setRooms(newRooms);
    }
  };

  return (
    <div className="position-relative flex-grow-1 m-0 p-0" style={{ height: '54px' }} ref={dropdownRef}>
      <div 
        className={`form-control border-0 shadow-none hero-search-input w-100 h-100 d-flex align-items-center justify-content-between m-0 ${disabled ? 'input-disabled-state' : (theme === 'dark' ? 'bg-transparent' : 'bg-white')}`} 
        style={{ borderRadius: '8px', cursor: disabled ? 'not-allowed' : 'pointer' }}
        onClick={handleToggle}
      >
        <div className={`d-flex align-items-center fw-bold ${theme === 'dark' ? '' : 'text-dark'}`} style={{ fontSize: '1rem', color: theme === 'dark' ? 'var(--text-primary)' : '' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', color: 'var(--accent-gold)' }}>
            <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
            <path d="M12 4v6"></path>
            <rect x="2" y="10" width="20" height="6" rx="2" ry="2"></rect>
            <path d="M4 16v2"></path>
            <path d="M20 16v2"></path>
          </svg>
          <span style={{ marginRight: '16px' }}>{totalRooms}</span>
          
          <i className="bi bi-person" style={{ fontSize: '1.3rem', marginRight: '6px', color: 'var(--accent-gold)' }}></i>
          <span>{totalPassengers}</span>
        </div>
        <i className="bi bi-chevron-down ms-2"></i>
      </div>

      {(isOpen || isClosing) && (
        <div className={`position-absolute bg-white shadow-lg rounded p-3 ${isClosing ? 'passenger-dropdown-closing' : 'passenger-dropdown'}`} style={{ top: '100%', left: 0, width: '320px', zIndex: 1000, marginTop: '10px' }}>
          <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }} className="pe-2">
            {rooms.map((room, rIndex) => (
              <div key={rIndex} className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-dark font-urbanist">Habitación {rIndex + 1}</span>
                  {rIndex > 0 && (
                    <button type="button" className="btn btn-link text-danger p-0 text-decoration-none small" onClick={() => removeRoom(rIndex)}>Eliminar</button>
                  )}
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <div className="text-dark fw-semibold font-urbanist">Mayores</div>
                    <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Desde 18 años</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={() => updateRoom(rIndex, 'adults', room.adults - 1)} disabled={room.adults <= 1}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="mx-3 text-dark fw-bold">{room.adults}</span>
                    <button type="button" className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={() => updateRoom(rIndex, 'adults', room.adults + 1)} disabled={room.adults + room.childrenAges.length >= 8}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="text-dark fw-semibold font-urbanist">Menores</div>
                    <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Hasta 17 años</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={() => updateRoom(rIndex, 'childrenCount', room.childrenAges.length - 1)} disabled={room.childrenAges.length <= 0}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="mx-3 text-dark fw-bold">{room.childrenAges.length}</span>
                    <button type="button" className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={() => updateRoom(rIndex, 'childrenCount', room.childrenAges.length + 1)} disabled={room.adults + room.childrenAges.length >= 8}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>

                {room.childrenAges.map((age, cIndex) => (
                  <div key={cIndex} className="d-flex justify-content-between align-items-center mt-2 bg-light p-2 rounded">
                    <div>
                      <div className="small text-dark">Edad del menor {cIndex + 1}</div>
                    </div>
                    <select className="form-select form-select-sm w-auto shadow-none cursor-pointer" value={age} onChange={(e) => updateChildAge(rIndex, cIndex, e.target.value)}>
                      <option value="0">Menos de 1 año</option>
                      {[...Array(17)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} años</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
            <button type="button" className="btn btn-link text-decoration-none fw-semibold p-0" style={{ color: 'var(--accent-gold)' }} onClick={addRoom} disabled={rooms.length >= 4}>Añadir habitación</button>
            <button type="button" className="btn btn-marriott px-4 rounded-pill font-urbanist fw-bold" onClick={() => setIsOpen(false)}>Aplicar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerSelector;
