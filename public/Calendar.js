id=0;
async function createCalendar() {
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    eventClick: function(info) {
        const result = confirm(`Did you forget to take this on ${info.event.start.toLocaleDateString()} at ${info.event.start.toLocaleTimeString()}`);
        if(result){
            reqs = [info.event.start, info.event.title]
            addforget(reqs)
        }
    }
  });
  calendar.render();
  const user = localStorage.getItem('user');
    await fetch(`/medication/${user}`)
    .then((result) => result.json())
    .then((resultJson) => {
    if(resultJson.length > 0){
        populateCalender(calendar);
    }
    });
}
async function populateCalender(calendar) {
    const user = localStorage.getItem('user');
    await fetch(`/medication/${user}`)
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
                    noskip = true
                    time = resultJson[i]['time_taken'][l];
                    if(time == null) continue;
                    let [hours, minutes, seconds] = time.split(/[:+]/);
                    current.setHours(hours, minutes, seconds)
                    if(resultJson[i]["times_missed"] != null){
                        for(let p = 0;p<resultJson[i]["times_missed"].length;p++){
                            miss = new Date(resultJson[i]["times_missed"][p])
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
                    if(resultJson[i]['cycle'] === "Month"){
                        current.setMonth(current.getMonth() + 1);
                    }
                }
            }
        }
        mednames=[]
        mednames.length=resultJson.length
        for(let i = 0; i<resultJson.length;i++){
            mednames[i] = medicine = resultJson[i]["medicine_name"]
        }
        recallAndShortage(mednames)
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
async function recallAndShortage(mednames){
    for(let i = 0; i<mednames.length;i++){
    await fetch(`/shortage/${mednames[i]}`)
    .then((result) => result.json())
    .then((resultJson) => {
        if('results' in resultJson){
            for(let k = 0; k<resultJson['results'].length; k++){
                today = new Date()
                update = new Date(resultJson['results'][k]["update_date"])
                difference = (today-update)/86400000
                console.log(difference)
                if (difference<30){
                    const h1 = document.createElement('h1');
                    h1.textContent = `${mednames[i]} IS CURRENTLY IN SHORTAGE!`;
                    document.getElementById('warnings').appendChild(h1);
                }
            }
        }
    });
    await fetch(`/recall/${mednames[i]}`)
    .then((result) => result.json())
    .then((resultJson) => {
        if('results' in resultJson){
            for(let k = 0; k<resultJson['results'].length; k++){
                today = new Date()
                update = new Date(resultJson['results'][k]["update_date"])
                difference = (today-update)/86400000
                console.log(difference)
                if (difference<30){
                    const h1 = document.createElement('h1');
                    h1.textContent = `${mednames[i]} IS CURRENTLY IN RECALL, LOOK ONLINE TO SEE IF IT AFFECTS YOU!`;
                    document.getElementById('warnings').appendChild(h1);
                }
            }
        }
    });
    }
}
async function addforget(reqs){
    const user = localStorage.getItem('user');
    medicine = reqs[1]
    date = new Date(reqs[0])
    const forgetrq = await fetch(`/forget/${user}/${medicine}/${date.toLocaleString('sv')}`, {
        method: 'POST',
    });
    window.location.href = '/MedicineCalendar.html'
}


window.onload = createCalendar;
