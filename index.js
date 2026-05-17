const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const { isValidStateAbbreviation } = require('usa-state-validator');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/fullcalendar', express.static(__dirname + '/node_modules/fullcalendar'));
app.use('/fullcalendar', express.static(__dirname + '/node_modules/@fullcalendar/core'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/', (req, res) => {
  res.sendFile('public/SignInup.html', { root: __dirname });
});

app.get('/medication/:user', async (req, res) => {
  console.log('Attempting to get usertest medicine information');
  const username = req.params.user;
  const { data, error } = await supabase.from('medication').select().eq('username',username);

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Recieved Data:', data.length);
    res.json(data);
  }
});
app.get('/signin/:user', async (req, res) => {
  console.log('Attempting to get usertest medicine information');
  const username = req.params.user;
  const { data, error } = await supabase.from('Users').select().eq('username',username);

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Recieved Data:', data.length);
    res.json(data);
  }
});
app.delete('/delete/:user/:medicine',async (req,res)=>{
  const user = req.params.user
  const medicine = req.params.medicine
  await supabase.from('medication').delete()
  .eq('username', user)
  .eq('medicine_name', medicine);
  res.send('Deleted');
})
app.post('/newmedicine/:user', async (req, res) => {
  console.log('month:', req.body.month, typeof req.body.month);
  console.log('weeks:', req.body.weeks, typeof req.body.weeks);
  console.log('time:', req.body.time, typeof req.body.time);
  console.log('servings:', req.body.servings, typeof req.body.servings);
  console.log('Adding user');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const medicine = req.body.medicine_name;
  const date = req.body.date;
  const time = req.body.time;
  const cycle = req.body.cycle;
  const servings = Number(req.body.servings) || 1;
  const daysweeks = req.body.weeks;
  const daysmonth = req.body.month.filter(i => i !== '').map(Number);
  const user = req.params.user

  const { data, error } = await supabase
  .rpc('exec_sql')

  const { data, error } = await supabase
    .from('medication')
    .insert({
      medicine_name: medicine,
      date_started: date,
      time_taken: time,
      cycle: cycle,
      times_missed: [],
      servings: servings,
      days_taken_week: daysweeks,
      days_taken_month: `{${daysmonth.join(',')}}`,
      username: user,
    })
    .select();

  if (error) {
  console.log('Supabase error message:', error.message);
  console.log('Supabase error details:', error.details);
  console.log('Supabase error code:', error.code);
  res.statusCode = 500;
  return res.send(error.message);
  } else {
    res.json(data);
  }
});

app.get('/NYTnews',async (req,res) =>{
  const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/health.json?api-key=${process.env.NYTAPIKEY}`)
  const data = await response.json();
  res.json(data)
});

app.get('/recall/:medicine',async (req,res) =>{
  const med = req.params.medicine
  const response = await fetch(`https://api.fda.gov/drug/enforcement.json?search=openfda.brand_name=${med}`)
  const data = await response.json();
  res.json(data)
});

app.get('/shortage/:medicine',async (req,res) =>{
  const med = req.params.medicine
  const response = await fetch(`https://api.fda.gov/drug/shortages.json?search=openfda.brand_name=${med}`)
  const data = await response.json();
  res.json(data)
});

app.post('/signup/:user', async (req, res) => {
  console.log('Adding user');
  const user = req.params.user;
  const { data, error } = await supabase
    .from('Users')
    .insert({
      username: user,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.post('/forget/:user/:medicine/:date', async (req, res) => {
  console.log('Adding forget');
  const user = req.params.user;
  const medicine = req.params.medicine;
  const date = new Date(req.params.date);
  const {data: forget} = await supabase.from('medication').select('times_missed').eq('username',user).eq('medicine_name',medicine).single();
  console.log(forget)
  const newforget = [...(forget.times_missed || []), date];
  const { data, error } = await supabase
  .from("medication")
  .update({ times_missed: newforget}).eq('username', user)
  .eq('medicine_name', medicine).select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});


