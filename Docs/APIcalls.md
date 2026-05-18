##API calls\
\
#GET /medication/:user\
Gets all the prescriptions of a user\
Parameter   |   Type    |   Description\
User            String      Username\
\
#GET /signin/:user\
Checks if the user exists in the Users table\
Parameter   |   Type    |   Description\
User            String      Username\
\
#GET /shortage/:medicine\
Gets information on shortages of a medication\
Parameter   |   Type    |   Description\
Medicine        String      Medicine name\
\
#GET /recall/:medicine\
Gets information on recalls of a medication\
Parameter   |   Type    |   Description\
Medicine        String      Medicine name\
\
#GET /NYTnews\
Gets New York Times news articles about Healthcare\
#POST /newmedicine/:user\
Creates a new prescription for a user\
Parameter   |   Type    |   Description\
User            String      Username\
Medicine        String      Medicine name\
date            Date        Date prescription starts\
time            time[]      time(s) of day you need to take the medicine\
Cycle           string      Daily, Week, Month\
Servings        INT         Number of Servings you received\
Daysweeks       string[]    Days of the week you need to take your medicine(only works when cycle is week)\
Daysmonths      int[]       Days of the month you need to take your medicine(only works when cycle is month)\
\
#POST /signup/:user\
Adds a user to the Users table if they dont already exist\
Parameter   |   Type    |   Description\
User            String      Username\
\
#POST /forget/:user/:medicine/:date\
Adds a date to the times_missed array\
Parameter   |   Type    |   Description\
User            String      Username\
date            Date        The date forgotten\
Medicine        String      Medicine name\
#DELETE /delete/:user/:medicine\
Deletes a row that matches the username and Medication\
Parameter   |   Type    |   Description\
User            String      Username\
Medicine        String      Medicine name\