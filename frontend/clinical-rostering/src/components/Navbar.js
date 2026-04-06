import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setUserLoggedIn(true);
        }
    }, []);

    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <React.Fragment>
            <style>
                {`
                    .navbar-custom {
                        height: 70px;
                        background-color: white !important;
                        position: fixed;
                        top: 0;
                        width: 100%;
                        z-index: 1030;
                        border-bottom: 1px solid #eaeaea;
                    }
                    .brand-navy {
                        color: #1e3050 !important;
                        font-weight: 800;
                        font-family: 'Inter', sans-serif;
                    }
                    .nav-top-link {
                        color: #6c757d;
                        font-weight: 600;
                        padding: 23px 15px;
                        margin: 0 5px;
                        border-bottom: 3px solid transparent;
                        transition: all 0.2s;
                        text-decoration: none;
                    }
                    .nav-top-link:hover {
                        color: #1e3050;
                    }
                    .active-link {
                        color: #1e3050 !important;
                        border-bottom: 3px solid #f47b2c;
                    }
                    .btn-emergency {
                        background-color: #f47b2c;
                        color: white !important;
                        border-radius: 8px;
                        padding: 8px 24px;
                        font-weight: 600;
                        border: none;
                    }
                    .btn-emergency:hover {
                        background-color: #e36a1b;
                    }
                `}
            </style>

            <nav className="navbar navbar-expand-lg navbar-custom px-4 shadow-sm">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img className='me-2 rounded-circle shadow-sm' src={require('../resources/new-logo.png')} alt='logo' style={{ width: "36px", height: "36px", objectFit: "cover" }} />
                    <span className="brand-navy fs-4">PESU Hospital</span>
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <div className="d-flex align-items-center mx-auto">
                        <Link to="/nurses" className={`nav-top-link ${isActive('/nurses')}`}>Nurses</Link>
                        {/* <Link to="/doctors" className={`nav-top-link ${isActive('/doctors')}`}>Doctors</Link> */}
                        <Link to="/speciality-clinics" className={`nav-top-link ${isActive('/speciality-clinics')}`}>Specialities</Link>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <button className="btn-emergency shadow-sm">Emergency</button>
                        <div className="rounded-circle overflow-hidden shadow-sm border border-2 border-white" style={{ width: "40px", height: "40px", cursor: "pointer" }}>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="Avatar" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}
