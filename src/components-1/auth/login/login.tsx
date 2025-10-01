import React from 'react';
import './login.css';

const Login = () => {
    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Implement login logic here
    };

    return (
        <div className="login___container">
            <h1 className="login___title">Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className="login___form">
                <div className="login___input-group">
                    <label htmlFor="username" className="login___label">Usuario</label>
                    <input type="text" id="username" className="login___input" required />
                </div>
                <div className="login___input-group">
                    <label htmlFor="password" className="login___label">Contraseña</label>
                    <input type="password" id="password" className="login___input" required />
                </div>
                <button type="submit" className="login___button">Entrar</button>
            </form>
        </div>
    );
};

export default Login;