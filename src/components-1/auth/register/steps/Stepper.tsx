import "./Stepper.css"
import { Fragment } from 'react'

interface StepperProps {
    current: number
    total: number
    labels?: string[]
    onStepClick?: (index: number) => void
}

const Stepper = ({ current, total, labels = [], onStepClick }: StepperProps) => {
    const stepsArray = Array.from({ length: total })

    return (
        <div className="stepper___container" aria-label="Progreso de registro" role="group">
            {stepsArray.map((_, idx) => {
                const active = idx === current
                const completed = idx < current
                const clickable = completed && onStepClick
                return (
                    <Fragment key={idx}>
                        <button
                            type="button"
                            className={`step ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
                            aria-current={active ? 'step' : undefined}
                            onClick={() => clickable && onStepClick && onStepClick(idx)}
                            disabled={!clickable}
                        >
                            <p>{idx + 1}</p>
                            {labels[idx] && <span className="visually-hidden">{labels[idx]}</span>}
                        </button>
                        {idx < total - 1 && <div className="hor___separator" role="separator" />}
                    </Fragment>
                )
            })}
        </div>
    )
}

export default Stepper