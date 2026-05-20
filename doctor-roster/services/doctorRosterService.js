const psychiatryClinics = {
    Monday: "Psychomotor and Neuropsychiatry Clinic",
    Tuesday: "De-addiction Clinic",
    Wednesday: "Child Psychiatry Clinic",
    Thursday: "Family Counselling and Marital Therapy",
    Friday: "Geriatric Mental Health Clinic",
    Saturday: "OPD"
};

function createSlot(day, activity, details = "") {
    let startTime = "09:00 AM";
    let endTime = "04:30 PM";

    if (activity === "OT") {
        startTime = "08:00 AM";
        endTime = "02:00 PM";
        details = details || "Scheduled Surgery";
    }

    if (activity === "Personal Agenda") {
        startTime = "10:00 AM";
        endTime = "01:00 PM";
        details = details || "Teaching / Research / Meetings";
    }
    return { day, activity, startTime, endTime, details };
}

function generateMajorRoster() {
    return [
        createSlot("Monday", "OPD", "Patient Consultation and Teaching"),
        createSlot("Tuesday", "OT"),
        createSlot("Wednesday", "OPD", "Patient Consultation and Teaching"),
        createSlot("Thursday", "OT"),
        createSlot("Friday", "Personal Agenda"),
        createSlot("Saturday", "OPD", "Patient Consultation and Teaching")
    ];
}

function generatePsychiatryRoster() {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days.map((day) => {
        const activity = psychiatryClinics[day] || "OPD";
        return createSlot(day, activity, "Specialty Clinic / OPD");
    });
}
function generateMinorRoster() {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days.map((day, index) => {
        if (index === 2) {
            return createSlot(day, "Personal Agenda");
        }

        return createSlot(day, "OPD", "Patient Consultation and Teaching");
    });
}

function generateDoctorRoster(doctor) {
    if (doctor.departmentType === "Major") {
        return generateMajorRoster();
    }

    if (doctor.department === "Psychiatry") {
        return generatePsychiatryRoster();
    }

    return generateMinorRoster();
}

module.exports = { generateDoctorRoster };