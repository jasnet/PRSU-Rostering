import React from 'react'

export default function Footer() {
    return (
        <footer className="mt-auto py-5" style={{ backgroundColor: '#1e3050', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container-fluid px-5">
                <div className="row align-items-center">
                    
                    {/* Left Side Branding */}
                    <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
                        <h4 className="fw-bold text-white mb-3">PESU Hospital</h4>
                        <p className="small mb-0" style={{ color: '#8a99b5', letterSpacing: '0.5px' }}>
                            © 2024 PESU HOSPITAL DIGITAL EXPERIENCE. CLINICAL CURATOR SYSTEM.
                        </p>
                    </div>

                    {/* Right Side Links */}
                    <div className="col-md-6 text-center text-md-end">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-4 mb-3 align-items-center">
                            <span className="fw-bold tracking-wider fs-6" style={{ color: '#f47b2c' }}>
                                EMERGENCY: +91 80 1234 5678
                            </span>
                            <a href="#!" className="text-decoration-none small text-uppercase tracking-wider fw-bold hover-text-white transition-all" style={{ color: '#8a99b5' }}>
                                Ambulance Services
                            </a>
                            <a href="#!" className="text-decoration-none small text-uppercase tracking-wider fw-bold hover-text-white transition-all" style={{ color: '#8a99b5' }}>
                                Privacy Policy
                            </a>
                        </div>
                        <div className="d-flex justify-content-center justify-content-md-end">
                            <a href="#!" className="text-decoration-none small text-uppercase tracking-wider fw-bold hover-text-white transition-all" style={{ color: '#8a99b5' }}>
                                Terms of Service
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            
            <style>
                {`
                    .tracking-wider { letter-spacing: 1px; }
                    .hover-text-white:hover { color: #ffffff !important; }
                `}
            </style>
        </footer>
    )
}
