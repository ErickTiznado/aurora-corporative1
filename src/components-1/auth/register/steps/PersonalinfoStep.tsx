import React from 'react';
import './PersonalinfoStep.css';

const PersonalinfoStep = () => {
    return (
        <div className="personal-info-step">
            <h2>Información Personal</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="firstName">Nombre:</label>
                    <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Apellido:</label>
                    <input type="text" id="lastName" name="lastName" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input type="tel" id="phone" name="phone" />
                </div>
                <button type="submit">Siguiente</button>
            </form>
        </div>
    );
};

export default PersonalinfoStep;