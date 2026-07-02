import React from 'react';
import { Link } from 'react-router-dom';

const Configuracion = () => {
  return (
    <div className="container py-5 mt-5 min-vh-100 page-enter">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Configuración</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Ajusta las preferencias de tu cuenta.</p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-light d-flex align-items-center gap-2" style={{ borderColor: 'var(--border-color)' }}>
          <i className="bi bi-arrow-left"></i> Volver al Panel
        </Link>
      </div>

      <div className="card border-0" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', boxShadow: 'var(--shadow-subtle)' }}>
        <div className="card-body p-4 p-xl-5">
          <div className="row g-4">
            <div className="col-md-6 border-end" style={{ borderColor: 'var(--border-color) !important' }}>
              <h5 className="fw-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
                <i className="bi bi-bell-fill me-2"></i> Notificaciones
              </h5>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" role="switch" id="notifEmail" defaultChecked style={{ backgroundColor: 'var(--accent-gold)', borderColor: 'var(--accent-gold)' }} />
                <label className="form-check-label ms-2" htmlFor="notifEmail" style={{ color: 'var(--text-primary)' }}>Recibir ofertas por correo electrónico</label>
              </div>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" role="switch" id="notifSms" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }} />
                <label className="form-check-label ms-2" htmlFor="notifSms" style={{ color: 'var(--text-primary)' }}>Notificaciones SMS de reservas</label>
              </div>
            </div>

            <div className="col-md-6 ps-md-4">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
                <i className="bi bi-globe-americas me-2"></i> Preferencias Regionales
              </h5>
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Idioma Preferido</label>
                <select className="form-select auth-input px-4 shadow-none" style={{ height: '50px', borderRadius: '12px' }}>
                  <option value="es">Español (Latinoamérica)</option>
                  <option value="en">English (US)</option>
                  <option value="pt">Português (Brasil)</option>
                </select>
              </div>
              <div>
                <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Moneda</label>
                <select className="form-select auth-input px-4 shadow-none" style={{ height: '50px', borderRadius: '12px' }}>
                  <option value="CLP">CLP - Peso Chileno</option>
                  <option value="USD">USD - Dólar Estadounidense</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-top text-end" style={{ borderColor: 'var(--border-color) !important' }}>
            <button className="btn btn-marriott px-5 py-2 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
