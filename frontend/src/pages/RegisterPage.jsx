import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validaciones muy básicas
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const response = await register({ nombre, email, password });
    if (response.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(response.error || "Error al crear la cuenta");
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Mitad Izquierda - Imagen Lujosa (Invertido respecto al login para dar variedad) */}
      <div className="w-50 d-none d-lg-block position-relative">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backgroundImage: 'url("https://media.staticontent.com/media/pictures/a3b43c24-af48-4cac-a2c0-d5e3cfa399c0/800x600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(45deg, rgba(28,28,28,0.9) 0%, rgba(194, 155, 98, 0.3) 100%)' }}></div>
        </div>
        <div className="position-absolute bottom-0 start-0 p-5 text-white">
          <h3 className="fw-bold" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>Tu Viaje Comienza Aquí</h3>
          <p className="lead" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>Únete a Buhotel y obtén acceso a tarifas preferenciales y experiencias únicas.</p>
        </div>
      </div>

      {/* Mitad Derecha - Formulario */}
      <div className="d-flex flex-column justify-content-center align-items-center w-50 p-5 position-relative">
        <Link to="/" className="position-absolute top-0 end-0 m-4 text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
          Volver al inicio <i className="bi bi-arrow-right ms-2"></i>
        </Link>
        
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Crear Cuenta</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Regístrate y comienza a planear tu próxima aventura.</p>
          </div>

          {error && (
            <div className="alert alert-danger border-0 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(232, 65, 24, 0.1)', color: '#e84118', borderRadius: '12px' }}>
              <i className="bi bi-exclamation-circle-fill"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Nombre Completo</label>
              <input 
                type="text" 
                className="form-control border-0 shadow-none px-4" 
                placeholder="Ej. Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', height: '56px', borderRadius: '12px' }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control border-0 shadow-none px-4" 
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', height: '56px', borderRadius: '12px' }}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Contraseña</label>
              <input 
                type="password" 
                className="form-control border-0 shadow-none px-4" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', height: '56px', borderRadius: '12px' }}
                required
              />
              <div className="form-text mt-2" style={{ color: 'var(--text-secondary)' }}>Debe contener al menos 6 caracteres.</div>
            </div>

            <button type="submit" className="btn btn-marriott w-100 fw-bold text-uppercase mt-2" style={{ height: '56px', letterSpacing: '1px', borderRadius: '12px' }}>
              Registrarse
            </button>
          </form>

          <p className="text-center mt-5" style={{ color: 'var(--text-secondary)' }}>
            ¿Ya tienes una cuenta? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'var(--text-primary)' }}>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
