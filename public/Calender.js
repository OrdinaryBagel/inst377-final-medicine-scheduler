import calendarjs from "@calendarjs/ce";

async function createCalender(){
    const { Calendar } = calendarjs;
    Calendar(document.getElementById('calender'), {
    type: 'inline',
    value: new Date()
});
}