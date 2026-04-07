import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/User/UserContext';

export default function Login() {
    const [formValues, setFormValues] = useState({ "e_id": "", "password": "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const userContext = useContext(UserContext);
    const { handleSetUserData } = userContext;

    const handleLoginValueChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        setError("");
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/login-user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(formValues)
            });

            const json = await response.json();

            if (json && json['Employee'] && json['Employee'].length > 0) {
                handleSetUserData(json['Employee'][0]);
                sessionStorage.setItem('user', JSON.stringify(json['Employee'][0]));
                navigate("/", { state: json });
                window.location.reload();
            } else {
                setError("Invalid Employee ID or Password. Please try again.");
            }

        } catch (error) {
            setError("Could not connect to server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #1e3050 0%, #2a4270 50%, #1a2840 100%);
                    position: relative;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                }
                .login-page::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -30%;
                    width: 80%;
                    height: 150%;
                    background: radial-gradient(circle, rgba(244, 123, 44, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }
                .login-page::after {
                    content: '';
                    position: absolute;
                    bottom: -30%;
                    left: -20%;
                    width: 60%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(244, 123, 44, 0.08) 0%, transparent 60%);
                    pointer-events: none;
                }
                .login-container {
                    display: flex;
                    width: 950px;
                    max-width: 95vw;
                    min-height: 580px;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.4);
                    position: relative;
                    z-index: 1;
                }
                .login-left {
                    flex: 1;
                    background: linear-gradient(160deg, #f47b2c 0%, #e36518 100%);
                    padding: 60px 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                .login-left::before {
                    content: '';
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                }
                .login-left::after {
                    content: '';
                    position: absolute;
                    bottom: -80px;
                    left: -30px;
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.06);
                }
                .login-left h1 {
                    color: white;
                    font-weight: 800;
                    font-size: 2.2rem;
                    margin-bottom: 16px;
                    line-height: 1.2;
                    position: relative;
                    z-index: 1;
                }
                .login-left p {
                    color: rgba(255,255,255,0.85);
                    font-size: 1.05rem;
                    line-height: 1.7;
                    position: relative;
                    z-index: 1;
                }
                .login-features {
                    margin-top: 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    position: relative;
                    z-index: 1;
                }
                .login-feature-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: white;
                    font-weight: 500;
                    font-size: 0.95rem;
                }
                .login-feature-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }
                .login-right {
                    flex: 1;
                    background: white;
                    padding: 60px 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .login-right h2 {
                    color: #1e3050;
                    font-weight: 800;
                    font-size: 1.75rem;
                    margin-bottom: 6px;
                }
                .login-right .subtitle {
                    color: #8c95a6;
                    font-size: 0.9rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 32px;
                }
                .login-input-group {
                    margin-bottom: 22px;
                }
                .login-input-group label {
                    display: block;
                    color: #1e3050;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }
                .login-input {
                    width: 100%;
                    padding: 14px 18px;
                    border: 2px solid #eef0f4;
                    border-radius: 12px;
                    font-size: 1rem;
                    background: #f8f9fc;
                    transition: all 0.3s;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                    box-sizing: border-box;
                }
                .login-input:focus {
                    border-color: #f47b2c;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(244,123,44,0.1);
                }
                .login-input::placeholder {
                    color: #b0b8c9;
                }
                .login-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #f47b2c, #e36518);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-family: 'Inter', sans-serif;
                    letter-spacing: 0.3px;
                    margin-top: 8px;
                }
                .login-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(244,123,44,0.4);
                }
                .login-btn:active {
                    transform: translateY(0);
                }
                .login-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
                .login-error {
                    background: #fff0f0;
                    color: #d32f2f;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    margin-bottom: 20px;
                    border: 1px solid #ffd6d6;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .login-register-link {
                    text-align: center;
                    margin-top: 24px;
                    color: #8c95a6;
                    font-size: 0.9rem;
                }
                .login-register-link a {
                    color: #1e3050;
                    font-weight: 700;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .login-register-link a:hover {
                    color: #f47b2c;
                }
                @media (max-width: 768px) {
                    .login-left { display: none; }
                    .login-container { width: 100%; max-width: 450px; min-height: auto; }
                    .login-right { padding: 40px 30px; }
                }
            `}</style>

            <div className="login-page">
                <div className="login-container">
                    <div className="login-left">
                        <h1>PESU Rostering System</h1>
                        <p>A scalable and brilliant approach to managing your entire clinical team schedule and patient operations.</p>
                        <div className="login-features">
                            <div className="login-feature-item">
                                <div className="login-feature-icon">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <span>Smart Staff Scheduling</span>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <span>24/7 Roster Management</span>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <span>Real-time Analytics</span>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <span>Secure Employee Portal</span>
                            </div>
                        </div>
                    </div>

                    <div className="login-right">
                        <h2>Welcome Back</h2>
                        <p className="subtitle">Authorized Personnel Only</p>

                        {error && (
                            <div className="login-error">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLoginSubmit}>
                            <div className="login-input-group">
                                <label>Employee ID</label>
                                <input
                                    type="text"
                                    className="login-input"
                                    placeholder="e.g., Emp_01"
                                    value={formValues.e_id}
                                    name="e_id"
                                    onChange={handleLoginValueChange}
                                    required
                                />
                            </div>

                            <div className="login-input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="••••••••"
                                    value={formValues.password}
                                    name="password"
                                    onChange={handleLoginValueChange}
                                    required
                                />
                            </div>

                            <button className="login-btn" type="submit" disabled={loading}>
                                {loading ? (
                                    <><i className="fas fa-spinner fa-spin me-2"></i>Signing in...</>
                                ) : (
                                    <>Log In Securely <i className="fas fa-arrow-right ms-2"></i></>
                                )}
                            </button>
                        </form>

                        <div className="login-register-link">
                            Don't have an account? <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register here</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
