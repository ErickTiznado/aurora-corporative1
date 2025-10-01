import "./StepSecurity.css"
import { FaLock } from "react-icons/fa"
import { useMemo } from "react"
import { evaluatePassword, getPasswordRecommendations } from "../../../../utils/evaluatePassword"

interface StepSecurityProps {
    values: { password: string; passwordConfirm: string; terms: boolean }
    onChange: (patch: Partial<{ password: string; passwordConfirm: string; terms: boolean }>) => void
    onBack: () => void
    onSubmit: () => void
    canSubmit: boolean
    submitting: boolean
}

const StepSecurity = ({ values, onChange, onBack, onSubmit, canSubmit, submitting }: StepSecurityProps) => {
    const { password, passwordConfirm, terms } = values
    const strength = useMemo(() => evaluatePassword(password), [password])

    const { segments, colorClass } = useMemo(() => {
        let seg = 0
        let cls: "weak" | "medium" | "strong" | "" = ""
        if (!password) {
            seg = 0
            cls = ""
        } else if (strength <= 1) {
            seg = 1
            cls = "weak"
        } else if (strength <= 3) {
            seg = 2
            cls = "medium"
        } else {
            seg = 3
            cls = "strong"
        }
        return { segments: seg, colorClass: cls }
    }, [strength, password])

    const barWidth = (index: number) => (segments >= index ? "100%" : "0%")
    const passwordsMatch = password.length > 0 && password === passwordConfirm
    const recommendations = useMemo(() => getPasswordRecommendations(password), [password])

    return (
        <div className="stpse___container">
            <header className="stpse___header">
                <h2>Seguridad de la cuenta</h2>
                <p className='stpse___desc'>Crea y confirma tu contraseña para continuar.</p>
            </header>
            <div className="stpse___form-container">
                <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); if (canSubmit) onSubmit() }}>
                    <div className="input___container">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input___container-icon">
                            <FaLock color="#45B199" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => onChange({ password: e.target.value })}
                                aria-describedby="password-strength"
                            />
                        </div>
                        <div className="stpse___password-strength" id="password-strength" aria-live="polite">
                            <span className="stpse___password-strength-indicator">
                                <span className={`stpse___password-strength-fill ${colorClass}`} style={{ width: barWidth(1) }} />
                                <span className={`stpse___password-strength-fill ${colorClass}`} style={{ width: barWidth(2) }} />
                                <span className={`stpse___password-strength-fill ${colorClass}`} style={{ width: barWidth(3) }} />
                            </span>
                        </div>
                        {password && (
                            <ul className="stpse___password-advice" aria-live="polite">
                                {recommendations.length === 0 ? (
                                    <li className="ok">Tu contraseña se ve bien.</li>
                                ) : (
                                    recommendations.map((r, idx) => <li key={idx}>{r}</li>)
                                )}
                            </ul>
                        )}
                    </div>
                    <div className="input___container">
                        <label htmlFor="passwordConfirm">Confirmar contraseña</label>
                        <div className="input___container-icon">
                            <FaLock color="#45B199" />
                            <input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                placeholder="Vuelve a escribir tu contraseña"
                                value={passwordConfirm}
                                onChange={(e) => onChange({ passwordConfirm: e.target.value })}
                                aria-invalid={passwordConfirm.length > 0 && !passwordsMatch}
                            />
                        </div>
                        {passwordConfirm.length > 0 && (
                            <p className="stpse___match-hint" role="status">
                                {passwordsMatch ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
                            </p>
                        )}
                    </div>
                    <div className="stpse___terms-input">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={terms}
                            onChange={(e) => onChange({ terms: e.target.checked })}
                        />
                        <label htmlFor="terms">
                            He leído y acepto los{' '}
                            <a href="/terminos" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
                            {' '}y la{' '}
                            <a href="/privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.
                        </label>
                    </div>
                </form>
                <div className="stpse___actions-btn">
                    <button type="button" onClick={onBack}>Atrás</button>
                    <button type="button" onClick={onSubmit} disabled={!canSubmit} aria-disabled={!canSubmit}>
                        {submitting ? 'Creando...' : 'Crear cuenta'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StepSecurity