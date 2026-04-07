import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        e_id: '',
        password: '',
        confirmPassword: '',
        fname: '',
        lname: '',
        e_type: '',
        primarydesg: '',
        secondarydesg: '',
        location: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formValues.e_id || !formValues.fname || !formValues.password) {
            setError('Employee ID, First Name, and Password are required.');
            return;
        }

        if (formValues.password !== formValues.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formValues.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                e_id: formValues.e_id,
                e_name: `${formValues.fname} ${formValues.lname}`.trim(),
                e_type: formValues.e_type || 'Staff',
                primary_specialization: formValues.primarydesg,
                secondary_specialization: formValues.secondarydesg,
                location: formValues.location,
                password: formValues.password
            };

            const response = await fetch('http://localhost:8000/register-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                const errData = await response.json();
                setError(errData.detail || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Could not connect to server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const roleOptions = [
        'Doctor', 'Nurse', 'Pharmacist', 'Radiology Technician',
        'Lab Technician', 'Admin Assistant', 'Surgeon', 'Therapist', 'Other'
    ];

    return (
        <>
            <style>{`
                .register-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #1e3050 0%, #2a4270 50%, #1a2840 100%);
                    position: relative;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                    padding: 40px 20px;
                }
                .register-page::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -30%;
                    width: 80%;
                    height: 150%;
                    background: radial-gradient(circle, rgba(244, 123, 44, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }
                .register-container {
                    display: flex;
                    width: 1050px;
                    max-width: 95vw;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.4);
                    position: relative;
                    z-index: 1;
                }
                .register-left {
                    width: 380px;
                    flex-shrink: 0;
                    background: linear-gradient(160deg, #f47b2c 0%, #e36518 100%);
                    padding: 60px 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                .register-left::before {
                    content: '';
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                }
                .register-left::after {
                    content: '';
                    position: absolute;
                    bottom: -80px;
                    left: -30px;
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.06);
                }
                .register-left h1 {
                    color: white;
                    font-weight: 800;
                    font-size: 2rem;
                    margin-bottom: 16px;
                    line-height: 1.2;
                    position: relative;
                    z-index: 1;
                }
                .register-left p {
                    color: rgba(255,255,255,0.85);
                    font-size: 1rem;
                    line-height: 1.7;
                    position: relative;
                    z-index: 1;
                }
                .register-steps {
                    margin-top: 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    position: relative;
                    z-index: 1;
                }
                .register-step {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .step-number {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 800;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }
                .step-text {
                    color: white;
                    font-weight: 500;
                    font-size: 0.95rem;
                }
                .register-left-footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    position: relative;
                    z-index: 1;
                }
                .register-left-footer p {
                    font-size: 0.85rem;
                    margin-bottom: 0;
                }
                .register-left-footer a {
                    color: white;
                    font-weight: 700;
                    text-decoration: underline;
                    cursor: pointer;
                }
                .register-right {
                    flex: 1;
                    background: white;
                    padding: 50px 50px;
                    overflow-y: auto;
                    max-height: 90vh;
                }
                .register-right h2 {
                    color: #1e3050;
                    font-weight: 800;
                    font-size: 1.75rem;
                    margin-bottom: 6px;
                }
                .register-right .subtitle {
                    color: #8c95a6;
                    font-size: 0.85rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 28px;
                }
                .form-row {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 18px;
                }
                .form-row .input-group {
                    flex: 1;
                }
                .input-group {
                    margin-bottom: 18px;
                }
                .input-group label {
                    display: block;
                    color: #1e3050;
                    font-weight: 700;
                    font-size: 0.78rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 6px;
                }
                .reg-input, .reg-select {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid #eef0f4;
                    border-radius: 10px;
                    font-size: 0.95rem;
                    background: #f8f9fc;
                    transition: all 0.3s;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                    box-sizing: border-box;
                }
                .reg-input:focus, .reg-select:focus {
                    border-color: #f47b2c;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(244,123,44,0.1);
                }
                .reg-input::placeholder {
                    color: #b0b8c9;
                }
                .reg-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236c757d' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    padding-right: 36px;
                    cursor: pointer;
                }
                .section-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 24px 0 18px;
                }
                .section-divider .line {
                    flex: 1;
                    height: 1px;
                    background: #eef0f4;
                }
                .section-divider span {
                    color: #8c95a6;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    white-space: nowrap;
                }
                .register-btn {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #f47b2c, #e36518);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-family: 'Inter', sans-serif;
                    margin-top: 8px;
                }
                .register-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(244,123,44,0.4);
                }
                .register-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
                .alert-error {
                    background: #fff0f0;
                    color: #d32f2f;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 0.88rem;
                    font-weight: 500;
                    margin-bottom: 18px;
                    border: 1px solid #ffd6d6;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .alert-success {
                    background: #f0fff4;
                    color: #28a745;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 0.88rem;
                    font-weight: 500;
                    margin-bottom: 18px;
                    border: 1px solid #c3e6cb;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                @media (max-width: 768px) {
                    .register-left { display: none; }
                    .register-container { max-width: 500px; }
                    .register-right { padding: 30px 24px; }
                    .form-row { flex-direction: column; gap: 0; }
                    .form-row .input-group { margin-bottom: 18px; }
                }
            `}</style>

            <div className="register-page">
                <div className="register-container">
                    <div className="register-left">
                        <h1>Join PESU Hospital</h1>
                        <p>Create your employee account to access the clinical rostering system and manage your schedule.</p>

                        <div className="register-steps">
                            <div className="register-step">
                                <div className="step-number">1</div>
                                <span className="step-text">Fill in your details</span>
                            </div>
                            <div className="register-step">
                                <div className="step-number">2</div>
                                <span className="step-text">Set your credentials</span>
                            </div>
                            <div className="register-step">
                                <div className="step-number">3</div>
                                <span className="step-text">Login & start managing</span>
                            </div>
                        </div>

                        <div className="register-left-footer">
                            <p>Already have an account?<br />
                                <a onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign in here</a>
                            </p>
                        </div>
                    </div>

                    <div className="register-right">
                        <h2>Create Account</h2>
                        <p className="subtitle">Employee Registration</p>

                        {error && (
                            <div className="alert-error">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert-success">
                                <i className="fas fa-check-circle"></i>
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <div className="form-row">
                                <div className="input-group">
                                    <label>First Name *</label>
                                    <input type="text" className="reg-input" placeholder="John" name="fname" value={formValues.fname} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input type="text" className="reg-input" placeholder="Smith" name="lname" value={formValues.lname} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Employee ID *</label>
                                    <input type="text" className="reg-input" placeholder="e.g., Emp_06" name="e_id" value={formValues.e_id} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Role / Type</label>
                                    <select className="reg-select" name="e_type" value={formValues.e_type} onChange={handleChange}>
                                        <option value="">Select Role</option>
                                        {roleOptions.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Specialization */}
                            <div className="section-divider">
                                <div className="line"></div>
                                <span>Specialization</span>
                                <div className="line"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Primary Specialization</label>
                                    <input type="text" className="reg-input" placeholder="e.g., Cardiology" name="primarydesg" value={formValues.primarydesg} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Secondary Specialization</label>
                                    <input type="text" className="reg-input" placeholder="e.g., Internal Medicine" name="secondarydesg" value={formValues.secondarydesg} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Department / Location</label>
                                <input type="text" className="reg-input" placeholder="e.g., Cardiology Ward" name="location" value={formValues.location} onChange={handleChange} />
                            </div>

                            {/* Security */}
                            <div className="section-divider">
                                <div className="line"></div>
                                <span>Security</span>
                                <div className="line"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Password *</label>
                                    <input type="password" className="reg-input" placeholder="Min 6 characters" name="password" value={formValues.password} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Confirm Password *</label>
                                    <input type="password" className="reg-input" placeholder="Re-enter password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} required />
                                </div>
                            </div>

                            <button className="register-btn" type="submit" disabled={loading}>
                                {loading ? (
                                    <><i className="fas fa-spinner fa-spin me-2"></i>Creating account...</>
                                ) : (
                                    <>Create Account <i className="fas fa-arrow-right ms-2"></i></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}