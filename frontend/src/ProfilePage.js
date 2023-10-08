import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(false);

  axios.defaults.withCredentials = true;
  const PORT = process.env.PORT || 5000;

  useEffect(()=> {
    axios.get(`http://localhost:${PORT}/ProfilePage`)
    .then((res) => {
        if (res.data.loggedIn === true) {
        setProfileData(res.data.user);
        } else {
          setProfileData(false);
        }
    })
    .catch(err =>  console.log(err));
  }, [PORT])

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
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/FormPage">Form</a> 
                        </li> */}
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
          <h2>User Profile</h2>
          {profileData ? (
          <div>
            <p>Name: {profileData.Name}</p>
            <p>Email: {profileData.Email}</p>
            <p>Phone: {profileData.Phone}</p>
            <p>Country: {profileData.Country}</p>
            <p>Gender: {profileData.Gender}</p>
            <p>Qualification: {profileData.Qualification}</p>
          </div>
          ) : (
            <div>
              <p>Make sure you have logged in.</p>
              <p>Loading profile...</p>
            </div>
          )}
        </div>
        
      </div>
      <Link to='/' className='btn btn-secondary border m-3'style={{ backgroundColor: 'dark' }} >Back</Link>
    </div>
    
    </>  
  );
};
export default ProfilePage;