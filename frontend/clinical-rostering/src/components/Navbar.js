import React, { useState } from 'react';

import {
    useNavigate
} from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);

    // -----------------------------------
    // LOGOUT
    // -----------------------------------
    const logout = () => {

        sessionStorage.removeItem('user');

        navigate('/login');

    };

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

                    .profile-avatar {

                        width: 42px;

                        height: 42px;

                        border-radius: 50%;

                        overflow: hidden;

                        cursor: pointer;

                        border: 2px solid white;

                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);

                        transition: all 0.2s ease;

                    }

                    .profile-avatar:hover {

                        transform: scale(1.05);

                    }

                    .profile-dropdown {

                        position: absolute;

                        right: 0;

                        top: 55px;

                        background: white;

                        border-radius: 12px;

                        min-width: 160px;

                        box-shadow: 0 10px 30px rgba(0,0,0,0.12);

                        border: 1px solid #f1f1f1;

                        overflow: hidden;

                        animation: fadeIn 0.2s ease;

                    }

                    .dropdown-item-custom {

                        padding: 12px 18px;

                        cursor: pointer;

                        font-weight: 500;

                        transition: background 0.2s;

                    }

                    .dropdown-item-custom:hover {

                        background: #f8f9fc;

                    }

                    @keyframes fadeIn {

                        from {

                            opacity: 0;

                            transform: translateY(-8px);

                        }

                        to {

                            opacity: 1;

                            transform: translateY(0);

                        }

                    }

                `}

            </style>

            <nav className="navbar navbar-expand-lg navbar-custom px-4 shadow-sm">

                {/* ----------------------------------- */}
                {/* LOGO */}
                {/* ----------------------------------- */}

                <a

                    className="navbar-brand d-flex align-items-center"

                    href="/"

                >

                    <img

                        className='me-2 rounded-circle shadow-sm'

                        src={require('../resources/new-logo.png')}

                        alt='logo'

                        style={{

                            width: "36px",

                            height: "36px",

                            objectFit: "cover"

                        }}

                    />

                    <span className="brand-navy fs-4">

                        PESUIMSR

                    </span>

                </a>

                {/* ----------------------------------- */}
                {/* RIGHT SECTION */}
                {/* ----------------------------------- */}

                <div className="ms-auto position-relative">

                    <div

                        className="profile-avatar"

                        onClick={() =>

                            setShowDropdown(

                                !showDropdown

                            )

                        }

                    >

                        <img

                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"

                            alt="Avatar"

                            className="w-100 h-100 object-fit-cover"

                        />

                    </div>

                    {

                        showDropdown && (

                            <div className="profile-dropdown">

                                <div

                                    className="dropdown-item-custom"

                                    onClick={() =>

                                        navigate('/profile')

                                    }

                                >

                                    Profile

                                </div>

                                <div

                                    className="dropdown-item-custom text-danger"

                                    onClick={logout}

                                >

                                    Logout

                                </div>

                            </div>

                        )

                    }

                </div>

            </nav>

        </React.Fragment>

    );

}