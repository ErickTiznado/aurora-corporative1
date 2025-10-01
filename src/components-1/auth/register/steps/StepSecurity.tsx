import React from 'react';
import './StepSecurity.css';

interface StepSecurityProps {
    onNext: () => void;
    onBack: () => void;
}

const StepSecurity: React.FC<StepSecurityProps> = ({ onNext, onBack }) => {
    return (
        <div className="step-security">
            <h2>Security Details</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" required />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onBack}>Back</button>
                    <button type="button" onClick={onNext}>Next</button>
                </div>
            </form>
        </div>
    );
};

export default StepSecurity;