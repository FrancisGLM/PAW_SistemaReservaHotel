import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const response = await login(email, password);
    if (response.success) {
      navigate(from, { replace: true });
    } else {
      setError(response.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="d-flex min-vh-100 page-enter" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Mitad Izquierda - Formulario */}
      <div className="d-flex flex-column justify-content-center align-items-center w-50 p-5 position-relative">
        <Link to="/" className="position-absolute top-0 start-0 m-4 text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
          <i className="bi bi-arrow-left me-2"></i> Volver al inicio
        </Link>
        
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Bienvenido de nuevo</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Ingresa a tu cuenta para gestionar tus reservas.</p>
          </div>

          {error && (
            <div className="alert alert-danger border-0 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(232, 65, 24, 0.1)', color: '#e84118', borderRadius: '12px' }}>
              <i className="bi bi-exclamation-circle-fill"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control px-4 shadow-none auth-input" 
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: '56px', borderRadius: '12px' }}
                required
              />
            </div>
            
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label small fw-bold text-uppercase m-0" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Contraseña</label>
                <Link to="#" className="small text-decoration-none" style={{ color: 'var(--accent-gold)' }}>¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="position-relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="form-control px-4 shadow-none auth-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: '56px', borderRadius: '12px', paddingRight: '50px' }}
                  required
                />
                <button 
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 5, padding: '0 15px', color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-marriott w-100 fw-bold text-uppercase mt-2" style={{ height: '56px', letterSpacing: '1px', borderRadius: '12px' }}>
              Iniciar Sesión
            </button>
          </form>

          <p className="text-center mt-5" style={{ color: 'var(--text-secondary)' }}>
            ¿No tienes una cuenta? <Link to="/register" className="fw-bold text-decoration-none" style={{ color: 'var(--text-primary)' }}>Regístrate aquí</Link>
          </p>
        </div>
      </div>

      {/* Mitad Derecha - Imagen Lujosa */}
      <div className="w-50 d-none d-lg-block position-relative">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backgroundImage: 'url("https://media.staticontent.com/media/pictures/078dca32-b9a2-40e3-8242-3c58385571fa/800x600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {/* Overlay Oscuro/Dorado para integrarlo a la paleta */}
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(45deg, rgba(28,28,28,0.8) 0%, rgba(194, 155, 98, 0.4) 100%)' }}></div>
        </div>
        <div className="position-absolute bottom-0 start-0 p-5 text-white">
          <h3 className="fw-bold" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>Explora el Lujo</h3>
          <p className="lead" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>Reserva tu próxima escapada inolvidable con beneficios exclusivos.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
