import './PersonalinfoStep.css'
import { FaUser } from 'react-icons/fa'
import { LuMail } from 'react-icons/lu'

interface PersonalInfoStepProps {
        values: { firstName: string; lastName: string; email: string }
        onChange: (patch: Partial<{ firstName: string; lastName: string; email: string }>) => void
        onNext: () => void
        canContinue: boolean
}

const PersonalinfoStep = ({ values, onChange, onNext, canContinue }: PersonalInfoStepProps) => {
        return (
                <div className='stper___container'>
                        <header className='stper___header'>
                                <h2>Información Personal</h2>
                                <p className='stper___desc'>Ingresa tus datos personales.</p>
                        </header>
                        <form className='stper___form' autoComplete='off' onSubmit={(e) => { e.preventDefault(); if (canContinue) onNext() }}>
                                <div className='input___container'>
                                        <label htmlFor='firstName'>Nombres</label>
                                        <div className='input___container-icon'>
                                                <FaUser color='#45B199' />
                                                <input
                                                        id='firstName'
                                                        name='firstName'
                                                        type='text'
                                                        placeholder='Ingresa tus nombres'
                                                        value={values.firstName}
                                                        onChange={e => onChange({ firstName: e.target.value })}
                                                />
                                        </div>
                                </div>
                                <div className='input___container'>
                                        <label htmlFor='lastName'>Apellidos</label>
                                        <div className='input___container-icon'>
                                                <FaUser color='#45B199' />
                                                <input
                                                        id='lastName'
                                                        name='lastName'
                                                        type='text'
                                                        placeholder='Ingresa tus apellidos'
                                                        value={values.lastName}
                                                        onChange={e => onChange({ lastName: e.target.value })}
                                                />
                                        </div>
                                </div>
                                <div className='input___container'>
                                        <label htmlFor='email'>Email</label>
                                        <div className='input___container-icon'>
                                                <LuMail color='#45B199' />
                                                <input
                                                        id='email'
                                                        name='email'
                                                        type='email'
                                                        placeholder='correo@ejemplo.com'
                                                        value={values.email}
                                                        onChange={e => onChange({ email: e.target.value })}
                                                />
                                        </div>
                                </div>
                        </form>
                        <div className='stper___actions'>
                                <button
                                        type='button'
                                        className='stper___next-btn'
                                        onClick={() => canContinue && onNext()}
                                        disabled={!canContinue}
                                        aria-disabled={!canContinue}
                                >Siguiente</button>
                        </div>
                </div>
        )
}

export default PersonalinfoStep
