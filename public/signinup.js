async function signin(){
    user = document.getElementById('username').value
    await fetch(`/signin/${user}`)
    .then((result) => result.json())
    .then((resultJson) => {
    if(resultJson.length === 0){
        alert('username not in database')
    }
    else{
        localStorage.setItem('user', user);
        window.location.href = '/MedicineCalendar.html';
    }
    });
}
async function signup(){
    user = document.getElementById('username').value
    const checkrq = await fetch(`/user/${user}`);
    const checkjson = await checkrq.json();

    if(checkjson.length > 0) {
        alert('username already in use');
        return;
    }
    const signuprq = await fetch(`/signup/${user}`, {
        method: 'POST',
    });
    const signupjson = await signuprq.json();

    if(signuprq.ok) {
        localStorage.setItem('user', user);
        window.location.href = '/MedicineCalendar.html';
    } else {
        alert('Error creating account');
    }
}