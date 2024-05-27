

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

at the moment i've got concept, courses and challenges that are all using the same blocks and get rendered the same way. I'm really not sure about this though.

you'd think really, i should be adding the admin sections into the page content

interesting. i have my ts prisma schema and i have the data that i get by querying the db. i first made these types myself in a seperate file and exported them so that i could give the correct typing when using. but i found it hard to keep track since the models are going to update + data may or may not include relations. 

So, i tried using the prisma models directly as types from prisma/client. i have now found
  'When you import a Prisma model in TypeScript, the type you get represents the shape of the data stored in the database. However, the Prisma Client doesn't include relational fields directly in the imported type. This is because the type generated is a basic representation of the table's columns, without relations or nested objects'.

  If you need to define a type that includes these relations in TypeScript, you can create an extended type manually:
  import { Concepts, Topics, CategoriesConcept } from '@prisma/client';

    type ExtendedConcepts = Concepts & {
      topics: Topics[];
      categories: CategoriesConcept[];
    };
    
  but i found categoriesConcept shows the ids whereas when i query for concepts to include the categories through a seperate fetch i need the actual properties. so, i now export like so:
    // categories with the actual object properties in the categories array.
    /*
      {
          id: string;
        name: string;
        color: string;
      }
    */
    export type ExtendedConcepts = Concepts & {
      topics: Topic[];
      categories: Categories[];
    };

    // categories with the object properties containing the id connectors for categories.
    /*
      {
                id: string;
        conceptId: string;
        categoryId: string;
      }
    */
    export type ExtendedConceptsNotAttached = Concepts & {
      topics: Topic[];
      categories: CategoriesConcept[];
    };


    now i'm having trouble figuring out how do delete db data that have relationships with other
    models.
    take the concepts. it has relations to categories through the categoryConcept, along with 
    topics.