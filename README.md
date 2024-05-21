

when i make changes to my prisma schema it seems to break all records in the db. say i add a field and 
update the schema i can no longer fetch that data because where records should have that field its seen as null.

i'd love that when i make changes to the schema it can regenerate a file for all the typescript types i use.
i'm sure there's a framework or library in react / next that encorporates ORM's with typescript both frontend and backend.

so there's a massive issue with how i render concepts, courses and challenges right? all will have a data object
that is passed and used to render the page content right. why have i not used a headless cms? well because i may want
anyone to sign up as a tutor later on to write their own content.

what i need to know
* will courses and concepts look exactly the same. if so, then what makes a course better and more unique than
  a concept?.

i've also got i real issue with how i do admin edit for concepts/courses and challenges.
Do i do the edit in the actual page? or do i seperate this into the admin. 

at the moment i've got concept, courses and challenges that are all using the same blocks and get rendered the same way. I'm
really not sure about this though.

you'd think really, i should be adding the admin sections into the page content
