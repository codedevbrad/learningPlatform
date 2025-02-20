

1. Students
2. Tutor
3. Admin

what is the flow of these users...
    student.
    teacher.
    admin.

an admin is only made from the server side. 

a student is made through
    * a tutor generated capture url that sets up the signup of 
       * the user to clerk + creates the tutor to student relation (using the tutor id )
    * user expressing interest in the app.
       * a tutor generated url is sent to the users email after a call with the user.

a student clicks 'enter bootcamp
  * if logged
       > straight to bootcamp
  * if new
        > onBoard payment to upgrade to tutoring membership.              

==== ** ** Ways to know everthing works correct ** ** ==== 

STUDENT 
1. can we create a student?
2. is the student given a tutor correctly.

CALENDAR
1. can a calendar be created given a good or bad relation to a tutor.
2. if a TUTOR is removed, does the calendar get removed
3. is the availability json formatted correctly 
    3.1 does it include all days in correct sequence.
    3.2 is times for startTime and endTime correct.
    3.3 is selected a boolean.

SESSION 
1. can a session be created.
2. dopes the session creation handle
    2.1. bad dates
    2.2. an incorrect time. 
    2.3. does it use a calendar correctly.
    2.4. 

TUTOR

2. can a create an admin
3. can we convert an admin to a tutor
4. can a 