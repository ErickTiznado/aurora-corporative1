import './register.css'
import Stepper from './steps/Stepper'
import PersonalinfoStep from './steps/PersonalinfoStep'
import StepSecurity from './steps/StepSecurity'
import { useState } from 'react'

interface PersonalInfoData {
        firstName: string
        lastName: string
        email: string
}

interface SecurityData {
        password: string
        passwordConfirm: string
        terms: boolean
}

const stepsLabels = ['Información personal', 'Seguridad']

const Register = () => {
        const [currentStep, setCurrentStep] = useState(0)
        const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
                firstName: '',
                lastName: '',
                email: ''
        })
        const [securityData, setSecurityData] = useState<SecurityData>({
                password: '',
                passwordConfirm: '',
                terms: false
        })
        const [submitting, setSubmitting] = useState(false)

        const goNext = () => setCurrentStep(s => Math.min(s + 1, stepsLabels.length - 1))
        const goBack = () => setCurrentStep(s => Math.max(s - 1, 0))

        const updatePersonal = (patch: Partial<PersonalInfoData>) =>
                setPersonalInfo(prev => ({ ...prev, ...patch }))

        const updateSecurity = (patch: Partial<SecurityData>) =>
                setSecurityData(prev => ({ ...prev, ...patch }))

        const canContinuePersonal =
                personalInfo.firstName.trim().length > 1 &&
                personalInfo.lastName.trim().length > 1 &&
                /.+@.+\..+/.test(personalInfo.email)

        const canSubmitSecurity = (() => {
                const { password, passwordConfirm, terms } = securityData
                return (
                        password.length >= 8 &&
                        password === passwordConfirm &&
                        terms
                )
        })()

        const handleSubmit = async () => {
                if (!canSubmitSecurity) return
                try {
                        setSubmitting(true)
                        // Simulación de envío (reemplazar con llamada a API real)
                        await new Promise(res => setTimeout(res, 1200))
                        // Por ahora sólo mostramos datos en consola
                        // eslint-disable-next-line no-console
                        console.log('REGISTER DATA', { ...personalInfo, ...securityData })
                        // TODO: redirigir / mostrar confirmación
                        alert('Cuenta creada (demo)')
                } catch (e) {
                        // eslint-disable-next-line no-console
                        console.error(e)
                } finally {
                        setSubmitting(false)
                }
        }

        return (
                <main className='rgt___container'>
                        <div className='rgt___register-cont'>
                                <header className='rgt___header'>
                                        <h1>Crear cuenta</h1>
                                </header>
                                <Stepper current={currentStep} total={stepsLabels.length} labels={stepsLabels} onStepClick={(idx) => {
                                        // Permitir volver a pasos anteriores solamente
                                        if (idx < currentStep) setCurrentStep(idx)
                                }} />
                                <div className='steps___container'>
                                        {currentStep === 0 && (
                                                <PersonalinfoStep
                                                        values={personalInfo}
                                                        onChange={updatePersonal}
                                                        onNext={goNext}
                                                        canContinue={canContinuePersonal}
                                                />
                                        )}
                                        {currentStep === 1 && (
                                                <StepSecurity
                                                        values={securityData}
                                                        onChange={updateSecurity}
                                                        onBack={goBack}
                                                        onSubmit={handleSubmit}
                                                        canSubmit={canSubmitSecurity && !submitting}
                                                        submitting={submitting}
                                                />
                                        )}
                                </div>
                                <div className='rgpt___login-redirect'>
                                        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
                                </div>
                        </div>
                </main>
        )
}

export default Register