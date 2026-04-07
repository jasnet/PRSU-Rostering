import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isOpen = true, toggleSidebar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const userLoggedIn = sessionStorage.getItem('user');

    const handleLoggedOut = () => {
        sessionStorage.removeItem('user');
        navigate('/logged-out');
    };

    if (!userLoggedIn) {
        // We still show the sidebar so they can see the gorgeous UI even if logged out!
    }

    const navItems = [
        { name: 'Dashboard', icon: 'fas fa-th-large', path: '/' },
        { name: 'Schedule', icon: 'far fa-calendar-alt', path: '/schedule' },
        { name: 'Leave Request', icon: 'fas fa-file-medical', path: '/leave-request' },
        { name: 'Admin', icon: 'fas fa-user-shield', path: '/admin' },
        { name: 'Profile', icon: 'fas fa-user', path: '/profile' }
    ];

    return (
        <div className="sidebar bg-light position-fixed h-100 border-end transition-all" style={{ width: isOpen ? '260px' : '80px', top: '70px', left: 0, zIndex: 1000, paddingTop: '20px', transition: 'width 0.3s ease-in-out' }}>
            
            <div className={`px-4 mb-4 d-flex align-items-center ${isOpen ? 'justify-content-between' : 'justify-content-center'}`}>
                {isOpen && (
                    <div>
                        <p className="text-muted small fw-bold mb-1" style={{ letterSpacing: '1px' }}>QUICK ACTIONS</p>
                        <h6 className="fw-bolder text-navy m-0" style={{ color: '#1e3050' }}>Patient Services</h6>
                    </div>
                )}
                {toggleSidebar && (
                    <button onClick={toggleSidebar} className="btn btn-sm btn-light border shadow-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-secondary`}></i>
                    </button>
                )}
            </div>
            
            <div className={`d-flex flex-column gap-2 ${isOpen ? 'px-3' : 'px-2 align-items-center'}`}>
                {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            to={item.path} 
                            key={idx} 
                            className={`d-flex align-items-center ${isOpen ? 'gap-3 px-3' : 'justify-content-center px-0'} py-2 rounded-3 text-decoration-none transition-all ${isActive ? 'bg-white shadow-sm fw-bold text-navy' : 'text-secondary hover-bg-light'}`}
                            style={{ color: isActive ? '#1e3050' : '#6c757d', width: isOpen ? '100%' : '48px', height: '48px' }}
                            title={!isOpen ? item.name : undefined}
                        >
                            <i className={`${item.icon} ${isActive ? 'text-navy' : 'text-secondary'} fs-5`} style={{ width: isOpen ? '20px' : 'auto' }}></i>
                            {isOpen && <span>{item.name}</span>}
                        </Link>
                    )
                })}
            </div>

            <div className={`position-absolute bottom-0 w-100 ${isOpen ? 'p-4' : 'p-2 d-flex justify-content-center'}`} style={{ paddingBottom: '100px !important' }}>
                {userLoggedIn ? (
                    <button onClick={handleLoggedOut} className={`btn text-white fw-bold py-2 rounded-3 ${isOpen ? 'w-100' : 'd-flex justify-content-center align-items-center'}`} style={{ backgroundColor: '#1e3050', width: isOpen ? '100%' : '48px', height: '48px' }} title={!isOpen ? "Logout" : undefined}>
                        {isOpen ? "Logout" : <i className="fas fa-sign-out-alt"></i>}
                    </button>
                ) : (
                    <button className={`btn text-white fw-bold py-2 rounded-3 ${isOpen ? 'w-100' : 'd-flex justify-content-center align-items-center'}`} style={{ backgroundColor: '#1e3050', width: isOpen ? '100%' : '48px', height: '48px' }} title={!isOpen ? "Book Appointment" : undefined}>
                        {isOpen ? "Book Appointment" : <i className="fas fa-calendar-plus"></i>}
                    </button>
                )}
            </div>
        </div>
    );
}
