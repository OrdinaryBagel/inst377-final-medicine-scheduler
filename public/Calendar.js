/*async function createCalender(){

const { Calendar } = calendarjs;
    Calendar(document.getElementById('calender'), {
    type: 'inline',
    value: new Date()
});

const { Schedule } = calendarjs;

Schedule(document.getElementById('schedule'), {
    type: 'week',
    value: '2026-05-16',
    data: [
        { guid: 'evt-1', title: 'Team Meeting', date: '2026-05-16', start: '10:00', end: '11:00', color: '#3498db' },
        { guid: 'evt-2', title: 'Project Review', date: '2026-05-20', start: '14:00', end: '15:30', color: '#e74c3c' }
    ]
});
}
*/
async function createCalender(){
    const calendarInstance = new calendarJs( "calendar" );
}

window.onload = createCalender;