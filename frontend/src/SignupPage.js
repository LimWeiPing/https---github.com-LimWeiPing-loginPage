import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SignupCheck from './SignupCheck';

function SignupPage() {

    const [values, setValues] = useState ({
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
        Country: '',
        Gender: '',
        Qualification: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }

    axios.defaults.withCredentials = true;

    const PORT = process.env.PORT || 5000;
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(SignupCheck(values));
        //const jsonString = JSON.stringify(values);
        if(errors.Name === "" && errors.Email === "" && errors.Password === ""  && errors.Phone === "" 
        && errors.Country === "" && errors.Gender ==="" && errors.Qualification === ""){
            axios.post(`http://localhost:${PORT}/SignupPage`, values)
            .then(res => {
                if (res.data === "Email Existed") {
                    alert("The email has been registered!");
                }else{
                    alert("Registered successfully!");
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
        }
    }

    const PasswordRequirementsTooltip = () => (
        <div className="password-requirements-tooltip">
          <p>Password must include:
          <ul>
            <li>Be at least 8 characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one lowercase letter</li>
            <li>Contain at least one digit</li>
            <li>Contain at least one symbol</li>
          </ul></p>
        </div>
      );

    const [isPasswordTooltipVisible, setIsPasswordTooltipVisible] = useState(false);
    const handlePasswordMouseEnter = () => {
        setIsPasswordTooltipVisible(true);
    };
    
    const handlePasswordMouseLeave = () => {
        setIsPasswordTooltipVisible(false);
    };
    

    return ( 
        <><nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true" href="/SignupPage">Register</a> 
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/LogoutPage">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container my-5">
                <div className="card" style={{ width: '50%' }}>
                    <div className="card-body">
                        <h2 className="card-title"><strong>Registration Form</strong></h2>
                        <form action="" onSubmit = { handleSubmit }>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input type="name" className="form-control" id="Name" name="Name" placeholder="Enter Your Name" 
                                onChange={handleInput} autoComplete="off" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="Email" name="Email" aria-describedby="emailHelp" placeholder="Enter Your Email" 
                                onChange={handleInput} autoComplete="off" required />
                                {errors.Email && <span className='text-danger'> {errors.Email}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="Password" name="Password" placeholder="Enter Your Password" 
                                onChange={handleInput} autoComplete="off" required 
                                onMouseEnter={handlePasswordMouseEnter} onMouseLeave={handlePasswordMouseLeave}/>
                                {errors.Password && <span className='text-danger'> {errors.Password}</span>}
                                {isPasswordTooltipVisible && <PasswordRequirementsTooltip />}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Phone" className="form-label">Phone</label>
                                <input type="phone" className="form-control" id="Phone" name="Phone" placeholder="Enter Your Phone number" 
                                onChange={handleInput}  autoComplete="off" required />
                                {errors.Phone && <span className='text-danger'> {errors.Phone}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Country" className="form-label">Country</label>
                                <input type="country" className="form-control" id="Country" name="Country" placeholder="Enter Your Country" 
                                onChange={handleInput}  autoComplete="off" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Gender" className="form-label">Gender</label>
                                <input type="gender" className="form-control" id="Gender" name="Gender" placeholder="Enter Your Gender" 
                                onChange={handleInput}  required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Qualification" className="form-label">Qualification</label>
                                <input type="qualification" className="form-control" id="Qualification" name="Qualification" placeholder="Enter Your Qualification" 
                                onChange={handleInput}  required />
                            </div>
                            <button type='submit' className='btn btn-success w-33 m-2'><strong>SIGN UP</strong></button>
                            <Link to="/" className='btn btn-default border w-33 bg-light m-2'>Cancel</Link>
                            <p>You are agree to our terms and conditions.</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage;