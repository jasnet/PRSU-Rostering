import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoggedOut() {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('user');
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3050 0%, #2a4270 100%)', fontFamily: "'Inter', sans-serif" }}>
            <div className="card border-0 rounded-4 shadow-lg text-center" style={{ maxWidth: '450px', width: '90%' }}>
                <div className="card-body p-5">
                    <div className="rounded-circle d-inline-flex justify-content-center align-items-center mb-4" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(40,167,69,0.1)' }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
                    </div>
                    <h2 className="fw-bold mb-3" style={{ color: '#1e3050' }}>Logged Out Successfully</h2>
                    <p className="text-secondary mb-4">You have been securely signed out. Thank you for using PESU Rostering System.</p>
                    <button className="btn w-100 text-white fw-bold py-3" style={{ backgroundColor: '#f47b2c', borderRadius: '12px' }} onClick={() => navigate('/login')}>
                        <i className="fas fa-sign-in-alt me-2"></i>Log In Again
                    </button>
                </div>
            </div>
        </div>
    )
}
