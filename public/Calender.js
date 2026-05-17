async function createCalender(){
    const { Calendar } = calendarjs;
    Calendar(document.getElementById('calender'), {
    type: 'inline',
    value: new Date()
});
}

window.onload = createCalender;