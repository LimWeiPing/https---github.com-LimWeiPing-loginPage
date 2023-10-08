import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'

const FormPage = () => {
    const [data, setData] = useState([]);


    axios.defaults.withCredentials = true;

    const PORT = process.env.PORT || 5000;

    useEffect(() => {
        // Fetch data from Node.js server
        axios.get(`http://localhost:${PORT}/FormPage`)
        .then((res) => {
            if (res.data.loggedIn === true) {
            setData(res.data.users);
            console.log(res.data.users);
            } else {
                setData(false);
            }
        })
        .catch(err =>  console.log(err));
      }, [PORT])

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
      <h1>Users Database</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>HashedPassword</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Gender</th>
            <th>Qualification</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.Email}>
              <td>{row.Name}</td>
              <td>{row.Email}</td>
              <td>{row.Password}</td>
              <td>{row.Phone}</td>
              <td>{row.Country}</td>
              <td>{row.Gender}</td>
              <td>{row.Qualification}</td>
            </tr>
          ))}
        </tbody>
        </Table>
        <Link to='/' className='btn btn-secondary border m-3'style={{ backgroundColor: 'dark' }} >Back</Link>
    </div>
    </>
    );
}

export default FormPage;