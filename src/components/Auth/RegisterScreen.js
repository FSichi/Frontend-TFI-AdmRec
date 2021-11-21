import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const [formValues, handleInputChange] = useForm({
        name: 'Facu Sichi',
        email: 'pepeArgento@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
    }

    return (

        <section className="mt-5 gradient-custom"> {/* vh-100 --> Estilo para centrarlo */}
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-5 mt-md-4 pb-1" onSubmit={handleRegister}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Crea tu Cuenta</h2>
                                    <p className="text-white-50">Por favor Completa los siguientes campos.</p>
                                    <p className="text-white-50 mb-5">En caso de no disponer de
                                        la clave maestra, contactate con un Administrador.</p>

                                    <div className="form-outline form-white mb-4">
                                        <input 
                                            type="text"  
                                            className="form-control form-control-lg text-center" 
                                            placeholder='Nombre'
                                            name='name'
                                            value={name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

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

                                    <div className="form-outline form-white mb-4">
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg text-center" 
                                            placeholder='Password'
                                            name='password'
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg text-center" 
                                            placeholder='Repite Password'
                                            name='password2'
                                            value={password2}
                                            onChange={handleInputChange}
                                        />
                                    </div>

            {/*                         <p class="small  pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}

                                    <button 
                                        className="btn btn-outline-light btn-lg px-5 mt-4" 
                                        type="submit">
                                        Registrarse
                                    </button>

                                </form>

                                <div>
                                    <span className="mb-0">Ya tienes una cuenta?
                                        <Link  className="fw-bold ms-2" to='/auth/login' style={{textDecoration: 'none'}}> 
                                            Inicia Sesion
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
