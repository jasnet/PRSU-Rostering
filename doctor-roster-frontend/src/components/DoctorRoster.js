import { useState } from "react";
import { generateRoster } from "../api/rosterApi";

function DoctorRoster() {
    const [doctorId, setDoctorId] = useState("D001");
    const [roster, setRoster] = useState(null);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        try {
            setError("");
            const res = await generateRoster(doctorId);
            setRoster(res.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div>
            <h2>Generate Doctor Roster</h2>
            <input value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
            <button onClick={handleGenerate}>Generate</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {roster && (
                <div>
                    <h3>{roster.doctorName} - {roster.department}</h3>
                    <ul>
                        {roster.schedule.map((s, idx) => (
                            <li key={idx}>{s.day}: {s.activity} ({s.startTime} - {s.endTime})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DoctorRoster;