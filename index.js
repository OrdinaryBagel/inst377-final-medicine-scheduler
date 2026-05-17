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

app.post('/newmedicine', async (req, res) => {
  console.log('Adding user');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const state = req.body.state;

  if (!isValidStateAbbreviation(state)) {
    console.log(`State: ${state} is invalid`);
    res.statusCode = 400;
    res.json({
      message: `${state} is not a valid 2 Letter Abbreviation for State`,
    });
    return;
  }

  const { data, error } = await supabase
    .from('customer')
    .insert({
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_state: state,
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

app.post('/signup/:user', async (req, res) => {
  console.log('Adding user');
  const user = req.params.user;
  const { data, error } = await supabase
    .from('customer')
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

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});


