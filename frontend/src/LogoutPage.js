import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

 

function LogoutPage() {
    
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const PORT = process.env.PORT || 5000;

    const handleLogout = () => {
            axios.get(`http://localhost:${PORT}/LogoutPage`)
            .then(res => {
                if (res.data.status === "success"){
                    //window.location.reload(true);
                    navigate('/');
                } else {
                    alert("Logout Failed!");
                }
            }). catch(err => console.log(err))
        }

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
                            <button className="nav-link disabled" aria-disabled="true" href="/LogoutPage">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="card text-center">
                <div className="card-header">
                    National University of Singapore
                </div>
                <div className="card-body">
                    <h5 className="card-title"><strong>Thank you</strong></h5>
                    <p className="card-text">Hope to visit our webpage again.</p>
                    <button onClick = {handleLogout} className="btn btn-primary">Logout</button>
                </div>
                <div className="card-footer text-body-secondary">
                    NUS_TIC4303_Mini_Poject
                </div>
            </div></>
    );
}

export default LogoutPage;