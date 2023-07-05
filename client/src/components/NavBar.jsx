import React from 'react';
import { Link } from 'react-router-dom';
import "../css/NavBar.css";

function NavBar() {
  return (
    <nav>
        <ul>
            <li className="nav-item">
                <Link to="/">
                <img src={process.env.PUBLIC_URL + '/images/home.png'}  alt="Home"/>
                </Link>
            </li>
            <li className="nav-item">
                <div className="pages">
                    <Link to="/hardware">
                    <img src={process.env.PUBLIC_URL + '/images/hardware_2.png'} alt="Hardware" />
                    Hardware
                    </Link>
                </div>
            </li>
            <li className="nav-item">
                <div className="pages">
                    <Link to="/software">
                    <img src={process.env.PUBLIC_URL + '/images/software_2.png'} alt="Software" />
                    Software
                    </Link>
                </div>
            </li>
            <li className="nav-item">
                <div className="pages">
                    <Link to="/vulnerabilities">
                    <img src={process.env.PUBLIC_URL + '/images/vulnerabilities.png'} alt="Vulnerabilities" />
                    Vulnerabilities
                    </Link> 
                </div>
            </li>
        </ul>
    </nav>
  );
}

export default NavBar;