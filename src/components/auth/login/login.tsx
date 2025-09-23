import './login.css'
import { FaLock } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
const Login = () => {
    return (
        <main className='lgn___container'>
            <h1>Aurora Corporative</h1>
            <div className='lgn___form-container'>
                <header className='lgn___form-header'>
                    <h2>Bienvenido</h2>
                    <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
                </header>
                <form action="" className='lgn___form'>
                    <div className='input___container'>
                        <label htmlFor="username">Usuario</label>
                        <div className='input___container-icon'>
                            <LuMail color='#45B199' />
                            <input type="text" id='username' name='username' placeholder='Ingresa tu usuario' />
                        </div>
                    </div>
                    <div className='input___container'>
                        <label htmlFor="password">Contraseña</label>
                        <div className='input___container-icon'>
                            <FaLock color='#45B199' />
                            <input type="password" id='password' name='password' placeholder='Ingresa tu contraseña' />
                        </div>
                        <div className='lgn___forgot_link'>
                            <a href="">Has olvidado tu contrasena?</a>
                        </div>
                    </div>
                </form>
                <div className='lgn___sigin-button'>
                    <button type="submit">Iniciar Sesion</button>
                </div>
                <div className='lgn___register-link'>
                    <a href="/register   ">Aun no tienes cuenta?, has click aqui</a>
                </div>
            </div>
        </main>
    )
}

export default Login