async function showinfo(){
    var buttons = document.getElementById("buttonContainer");
    const user = localStorage.getItem('user');
    const medrq = await fetch(`/medication/${user}`);
    const medjson = await medrq.json();
    for(let i = 0; i<medjson.length;i++){
    var button1 = document.createElement("button");
    button1.dataset.status = 'active';
    button1.id = `b${i}`;
    button1.medicine = medjson[i]['medicine_name']
    button1.onclick = medclick;
    button1.textContent= medjson[i]['medicine_name']
    buttons.appendChild(button1);
    }
}

async function medclick(){
    const medrq = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name=${this.medicine}`);
    const medjson = await medrq.json();
    var info = document.getElementById("info")
    if(medjson["results"][0]["description"][0].ok){
    info.textContent = medjson["results"][0]["description"][0]
    }
    var remove = document.getElementById("info")
    if(document.getElementById(removebutton) === null){
    var button1 = document.createElement("button");
    button1.dataset.status = 'active';
    button1.id = `removebutton`;
    button1.medicine = this.medicine
    button1.textContent = 'remove'
    button1.onclick = removeMedication;
    remove.appendChild(button1);
    }
    else{
        removebutton = document.getElementById(removebutton)
        removebutton.medicine = this.medicine
    }
}

async function updateMedication(){
    const user = localStorage.getItem('user');
    const medicine = document.getElementById('medicine_name').value
    const medrq = await fetch(`/medication/${user}`);
    const medjson = await medrq.json();
    let temp=false;
    for(let i = 0;i<medjson.length;i++){
        if(medjson[i]['medicine_name'].toLowerCase()===medicine.toLowerCase()){
            temp=true
        }
    }
    if(temp===true){
        const result = confirm(`${medicine} perscription already exists, would you like to overwrite it?`)
        if(result){
            await fetch(`/delete/${user}/${medicine}`, {
                method: 'DELETE',
            });
            temp=false
        }
    }

    if(temp === false){
    const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
    const week = days.filter(day => document.getElementById(day).checked);
    const times = getTimes()
    const months = document.getElementById('monthly').value.split(',').map(Number)
    await fetch(`/newmedicine/${user}`, {
    method: 'POST',
    body: JSON.stringify({
      medicine_name: `${document.getElementById('medicine_name').value}`,
      date: `${document.getElementById('date').value}`,
      time: times,
      cycle: `${document.getElementById('cycle').value}`,
    servings: Number(document.getElementById('servings').value),
    weeks: week,
    month: months
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());
}
window.location.href = '/MedicineCalendar.html';
}
async function removeMedication(){
    const user = localStorage.getItem('user');
    const result = confirm(`Do you want to remove ${this.medicine}`)
    if(result){
        await fetch(`/delete/${user}/${this.medicine}`, {
            method: 'DELETE',
        });
        temp=false
    }
}
function addTime() {
    const input = document.createElement('input');
    input.type = 'time';
    input.className = 'times';
    document.getElementById('timecontainer').appendChild(input);
  }

function getTimes() {
    return [...document.querySelectorAll('.times')].map(i => i.value).filter(k => k !== ''); 
}

window.onload = showinfo;