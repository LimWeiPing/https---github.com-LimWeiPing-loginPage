import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'// Import Bootstrap CSS
import myImage from './nus_logo_full-vertical.jpg'
import { Link, useNavigate } from 'react-router-dom'
import LoginCheck from './LoginCheck'
import axios from 'axios'
import Card from 'react-bootstrap/Card';


function LoginPage() {

    //state using useState to store user input
    const [values,setValues] = useState({
        Email: '',
        Password: '',
        keepLoggedIn: false
    })


    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //input change handle to update the state for user input
    const handleInput = (event) => {
        setValues(prev=> ({...prev, [event.target.name]:[event.target.value]}))
    }

    // allow frontend to include credentials when making requests to backend
    axios.defaults.withCredentials = true;

    const PORT = process.env.PORT || 5000;

    // To check whether is loggedin or not
    useEffect(()=> {
        axios.get(`http://localhost:${PORT}/LoginPage`)
        .then((res) => {
            if (res.data.loggedIn === true) {
            setIsLoggedIn(res.data.user)
            } else {
                setIsLoggedIn(false);
            }
        }) 
        .catch(err =>  console.log(err));
    }, [PORT])

    // use axios to send HTTP requests and handle the responses asynchronously.
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(LoginCheck(values)); 
        if(errors.Email ==="" && errors.Password === "") {
            axios.post(`http://localhost:${PORT}/LoginPage`, values)
            .then(res => {
                if (res.data.loggedIn === true) {
                    setIsLoggedIn(res.data.user);
                    console.log(res);
                    navigate('/');
                }else {
                    alert("Invalid Email or Password");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (  
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/SignupPage">Register</a> 
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/LogoutPage">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div>
            <div className="card h-50">
                <img src={ myImage } className="rounded mx-auto d-block" alt="Nus logo" style={{width: '150px', height: '175px' }}/>
                <div className="card-body text-center">
                <h5 className="card-title">Btech of Cybersecurity</h5>
                <p className="card-text">Welcome to TIC4303 Mini Project</p>
                </div>
            </div>
        </div>
        {isLoggedIn ? (
            <div className="card text-center">
            <Card>
            <Card.Header as="h5">Hello</Card.Header>
                <Card.Body>
                <Card.Title> { isLoggedIn.Name }</Card.Title>
                <Card.Text>
                    Please select...
                </Card.Text>
                <Link to='/ProfilePage' className='btn btn-primary border m-3'>Profile</Link>
                <Link to='/FormPage' className='btn btn-primary border m-3'>Users</Link>
            </Card.Body>
            </Card>
            </div>
        ) : (
        <div className="container my-5">
        <div className="card" style={{ width: '50%' }}>
            <div className="card-body">
              <h2 className="card-title"><strong>Login</strong></h2>
              <form action = "" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">Email address</label>
                  <input type="email" name="Email" id="Email" className="form-control" placeholder='Enter Your Email Address' autoComplete="off"
                  onChange = {handleInput}/>
                  {errors.Email && <span className='text-danger'> {errors.Email}</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Password</label>
                  <input type="password" name="Password" id="Password" className="form-control" placeholder='Enter Your Password' 
                  onChange = {handleInput} autoComplete="off" />
                  {errors.Password && <span className='text-danger'> {errors.Password}</span>}
                </div>
                <div className="mb-3 form-check">
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    <input  type="checkbox" 
                            className="form-check-input" 
                            id="exampleCheck1"
                            checked={values.keepLoggedIn}
                            onChange={() => setValues({ ...values, keepLoggedIn: !values.keepLoggedIn })}/>
                        Keep me logged in</label>
                </div>
                <button type='submit' className='btn btn-success w-33 m-1'><strong>LOG IN</strong></button>
                <Link to="/" className='btn btn-default border w-33 bg-light m-1'>Cancel</Link>
                <div className='mb-3'> 
                <p></p>
                    <p>Don't have an account yet?</p>
                    <Link to="/SignupPage" className='btn btn-default border w-100 bg-light'>Create a Free Account</Link>
                </div>
              </form>
            </div>
        </div>
    </div>
    )
}
        </>

    );
}

export default LoginPage;