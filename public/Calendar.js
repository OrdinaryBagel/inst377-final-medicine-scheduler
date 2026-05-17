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
id=0;
async function createCalendar() {
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    }
  });
  calendar.render();
  populateCalender(calendar);
}
async function populateCalender(calendar) {
    await fetch('/user/testuser')//this should be based on whos signed in if i get to that
    .then((result) => result.json())
    .then((resultJson) => {
        for(let i = 0; i<resultJson.length;i++){
            current = new Date(resultJson[i]['date_started']+ 'T00:00:00');
            s = 0;
            if(resultJson[i]['cycle'] === "Week"){
                schedule = between(resultJson[i]['days_taken_week']);
            }
            else if(resultJson[i]['cycle'] === "Month"){
                schedule = resultJson[i]['days_taken_month'];
            }
            else{
                schedule = [];
            }
            medicine = resultJson[i]["medicine_name"]
            for(let k = 0; k<resultJson[i]['servings'];){
                for(let l = 0; l<resultJson[i]['time_taken'].length; l++){
                    id++;
                    k++;
                    console.log(k)
                    noskip = true
                    time = resultJson[i]['time_taken'][l];
                    if(time == null) continue;
                    let [hours, minutes, seconds] = time.split(/[:+]/);
                    current.setHours(hours, minutes, seconds)
                    if(resultJson[i]["times_missed"] != null){
                        for(let p = 0;p<resultJson[i]["times_missed"].length;p++){
                            miss = new Date(resultJson[i]["times_missed"][p])
                            console.log('comparing:', current.toISOString(), 'vs missed:', miss.toISOString());
                            if (Math.abs(current.getTime()- miss.getTime())<3600000){
                                noskip = false
                                break;
                            }
                        }
                    }
                    if(noskip){
                    calendar.addEvent({ id: id, title: medicine, start: new Date(current)})
                    }
                    else{
                        k=k-1
                    }
                    if(k==resultJson[i]['servings']){
                        break;
                    }
                }
                if(resultJson[i]['cycle'] === "Week"){
                    current.setDate(current.getDate() + schedule[s])
                }
                if(resultJson[i]['cycle'] === "Daily"){
                    current.setDate(current.getDate() + 1)
                }
                else if(resultJson[i]['cycle'] === "Month"){
                    numdays = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
                    if(numdays < schedule[s]){
                        current.setDate(numdays)
                    }
                    else{
                        current.setDate(schedule[s])
                    }
                }
                s++
                if(s>schedule.length-1){
                    s=0
                }
            }
        }
    });
}
function between(days){
    if(days.length ==1){
        return [7]
    }
    datemap = {
        'monday': 1,
        'tuesday': 2,
        'wednesday': 3,
        'thursday': 4,
        'friday':5,
        'saturday':6,
        'sunday':7
    }
    temp = days.map(day => datemap[day]);
    temp.sort((a, b) => a - b)
    daysbetween = []
    daysbetween.length = temp.length
    for(let t = 0; t<temp.length; t++){
        if(t===temp.length -1){
            daysbetween[t] = 7 - temp[t] + temp[0]
        }
        else{
        daysbetween[t] = temp[t+1] - temp[t]
        }
    }
    return daysbetween;
}

window.onload = createCalendar;
