##API calls

#GET /medication/:user
Gets all the prescriptions of a user
Parameter   |   Type    |   Description
User            String      Username

#GET /signin/:user
Checks if the user exists in the Users table
Parameter   |   Type    |   Description
User            String      Username

#GET

#POST /newmedicine/:user
Creates a new prescription for a user
Parameter   |   Type    |   Description
User            String      Username
Medicine        String      Medicine name
date            Date        Date prescription starts
time            time[]      time(s) of day you need to take the medicine
Cycle           string      Daily, Week, Month
Servings        INT         Number of Servings you received
Daysweeks       string[]    Days of the week you need to take your medicine(only works when cycle is week)
Daysmonths      int[]       Days of the month you need to take your medicine(only works when cycle is month)

#DELETE /delete/:user/:medicine
Deletes a row that matches the username and Medication
Parameter   |   Type    |   Description
User            String      Username
Medicine        String      Medicine name