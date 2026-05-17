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
document.addEventListener('DOMContentLoaded', function () {
      const calendarEl = document.getElementById('calendar');

      // Create a new FullCalendar instance
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', 
        initialDate: '2026-05-16',   
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        navLinks: true, // Click day/week names to navigate views
        selectable: true, // Allow selecting dates
        selectMirror: true,
        events: [
          {
            title: 'Meeting',
            start: '2026-05-17T10:30:00',
            end: '2026-05-17T12:30:00'
          },
          {
            title: 'Conference',
            start: '2026-05-20',
            end: '2026-05-22'
          }
        ]
      });
      calendar.render();
    });

/*window.onload = createCalender;*/