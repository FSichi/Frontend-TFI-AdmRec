import React from 'react'
import { useForm } from '../../hooks/useForm';
import {Link} from 'react-router-dom'

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm({
        email: 'facusichi@gmail.com',
        password: '123456'
    });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        
    }

    return (
        <section className=" mt-5 gradient-custom"> {/* vh-100 --> Estilo para centrarlo */}
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleLogin}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Por favor Ingresa Tu correo y Contraseña</p>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Email'
                                            name='email'
                                            value={email}
                                            onChange={handleInputChange}
                                        />

                                    </div>

                                    <div className="form-outline form-white ">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Password'
                                            name='password'
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/*                         <p class="small  pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}

                                    <button
                                        className="btn btn-outline-light btn-lg px-5 mt-5"
                                        type="submit">Login
                                    </button>

                                </form>

                                <div>
                                    <span className="">Aun no Tienes Cuenta?
                                        <Link className="fw-bold ms-2" to='/auth/register' style={{ textDecoration: 'none' }}>
                                            Registrate
                                        </Link>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
