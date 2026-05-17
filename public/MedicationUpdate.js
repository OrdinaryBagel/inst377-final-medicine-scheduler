async function showinfo(){

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
