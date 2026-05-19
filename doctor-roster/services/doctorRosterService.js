function generateDoctorRoster(doctor) {
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const majorPattern = [
        'OPD',
        'OT',
        'OPD',
        'OT',
        'Personal Agenda',
        'OPD'
    ];

    const minorPattern = [
        'OPD',
        'OPD',
        'Personal Agenda',
        'OPD',
        'OPD',
        'OPD'
    ];

    const pattern =
        doctor.departmentType === 'Major'
            ? majorPattern
            : minorPattern;

    return days.map((day, index) => {
        const activity = pattern[index];

        let startTime = '09:00 AM';
        let endTime = '04:30 PM';
        let details = '';

        if (activity === 'OT') {
            startTime = '08:00 AM';
            endTime = '02:00 PM';
            details = 'Scheduled Surgery';
        }

        if (activity === 'Personal Agenda') {
            startTime = '10:00 AM';
            endTime = '01:00 PM';
            details = 'Teaching / Research / Meetings';
        }

        return {
            day,
            activity,
            startTime,
            endTime,
            details
        };
    });
}

module.exports = generateDoctorRoster;