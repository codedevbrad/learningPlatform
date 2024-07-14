
<p align="center">
  <img src="https://github.com/codedevbrad/chatGPT__Post_generator/assets/46296577/75f54e61-6df1-4411-b9e4-4019928a0f8c" 
  alt="Sublime's custom image" 
  />
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skills.thijs.gg/icons?i=nextjs,ts,tailwind,postman" />
  </a>
</p>

<div align="center">
  App description.

  <ul>
        <li> TailwindCss </li>
  </ul>
</div>

<br />
<br />

<div>
  Key Features:
</div>

<br />

## What needs to be done.
- [x] zod form management 
- [] documentation for all concepts


<br />
<br />


## .ENV variables
| Variable                 | Description                               |
|--------------------------|-------------------------------------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Public key for the Clerk authentication service. |
| CLERK_SECRET_KEY         | Secret key for the Clerk authentication service. |
| DATABASE_URL             | URL for the database connection.            |
| BASE_URL                 | Base URL for the application.               |
| OPENAI_CREDS             | Credentials for the OpenAI service.         |


---

## Setup

### Clerk auth.
Clerk.com is an authentication and user management service that simplifies the process of adding user authentication and management to your web applications.
steps involved.
1. head to https://dashboard.clerk.com/
2. add a new application and fill in name and login providers.
3. Select NextJs from the quickstart and Copy the API keys to .env file.

### Open a.i
ChatGPT which is the sibling model to InstructGPT, is a form of generative AI -- a tool that lets users enter prompts to receive humanlike images and text. We use this tool to generate the social media post ideas.
steps involved to setup.
1. head to https://openai.com/ and signup.
2. navigate to https://platform.openai.com/account/api-keys and generate a new secret key.
3. paste the key into the .env with the appropriate key name.



-----

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





    worked hard on making dropdowns with edit and delete usability resuable elsewhere. I had an Edit dropdown item that opens a modal to edit a challenge and then a delete item that pops open a alert dialog to confirm the action. Problem was having to redo this implementation for any other need. so i went from

    ```javascript
    

function EditChallengeDialog({ challenge, state, editStateHelper, modalAction, challengeId }) {
    const [title, setTitle] = useState(challenge.title || '');
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);

    useEffect(() => {
        // Initialize selectedCategories with ids from challenge.categories
        if (challenge.categories) {
            setSelectedCategories(challenge.categories.map(category => category.id));
        }

        // Initialize selectedLanguages with ids from challenge.languages
        if (challenge.languages) {
            setSelectedLanguages(challenge.languages.map(language => language.id));
        }
    }, [challenge]);

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            // Assuming action__editChallenge is an async function
            let challengesUpdated = await action__editChallenge({ 
                title, 
                selectedCategories, 
                selectedLanguages 
            }, challengeId );

            console.log( challengesUpdated );

            editStateHelper( challengesUpdated );
            modalAction(false);
        } 
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={state} onOpenChange={ modalAction }>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle> Edit challenge </DialogTitle>
                    <DialogDescription>
                       Edit the Current challenge.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter challenge title"
                                className="col-span-3"
                                required
                            />
                        </div>

                        <CategoriesChosen
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                        <LanguagesChosen
                            selectedLanguages={selectedLanguages}
                            setSelectedLanguages={setSelectedLanguages}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit"> Update Challenge</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}


function AlertDialogComponent({ continueAction, open, onOpenChange }) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='py-3'>
              <p> This action cannot be undone. This will permanently delete </p>
              <div className='pl-4 pt-3'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li className='leading-7'>
                    the <span className='bg-black text-white text-xs py-1 px-0.5 rounded mx-0.5'> Challenge </span>
                    and its page data.
                  </li>
                  <li className='leading-7'>
                    any <span className='bg-black text-white text-xs py-1 px-0.5 rounded mx-0.5'> User </span>
                    notes and progress model row relations to the <span className='bg-black text-white text-xs py-1 px-0.5 rounded mx-0.5'> Challenge </span>
                  </li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className={"bg-red-700"} onClick={continueAction}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}


export default function ChallengeDropdown ({ challenge, editStateHelper, deleteStateHelper, challengeId, challengeIndex })  {
    const [editModalState, setModalState] = useState(false);
    const [deleteConfirmBox, setdeleteConfirmBoxOpen] = useState(false);
    const [dropdownState, changeDropdownState] = useState(false);
  
    const deleteChallenge = async () => {
      try {
        await action__deleteChallenge(challengeId);
        deleteStateHelper(challengeIndex);
        setdeleteConfirmBoxOpen(false);
      }
      catch (err) {
        console.error('Failed to delete challenge:', err);
      }
    };
  
    return (
      <>
        <EditChallengeDialog challenge={challenge} state={editModalState} editStateHelper={editStateHelper} challengeId={challengeId} modalAction={setModalState} />
        <AlertDialogComponent continueAction={deleteChallenge} open={deleteConfirmBox} onOpenChange={setdeleteConfirmBoxOpen} />
  
        <DropdownMenu open={dropdownState} onOpenChange={changeDropdownState}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">...</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align='end'>
            <DropdownMenuLabel>Challenge Control</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => { changeDropdownState(false); setModalState(true) }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { changeDropdownState(false); setdeleteConfirmBoxOpen(true) }}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
};
```

to 

```javascript
'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

function EditDialog({ open, onOpenChange, formComponent: FormComponent, formProps }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription>
                        Edit the current item.
                    </DialogDescription>
                </DialogHeader>
                <FormComponent {...formProps} />
            </DialogContent>
        </Dialog>
    );
}

function ConfirmDeleteDialog({ open, onOpenChange, onConfirm }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='py-3'>
                        <p>This action cannot be undone. This will permanently delete the item and its related data.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700" onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function DropdownMenuComponent({ item, editStateHelper, deleteStateHelper, itemId, itemIndex, action__editItem, action__deleteItem, EditForm }) {
    const [editModalState, setEditModalState] = useState(false);
    const [deleteConfirmBox, setDeleteConfirmBoxOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState(false);

    const handleEditSubmit = async (formData) => {
        try {
            let updatedItem = await action__editItem(formData, itemId);
            editStateHelper(updatedItem);
            setEditModalState(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await action__deleteItem(itemId);
            deleteStateHelper(itemIndex);
            setDeleteConfirmBoxOpen(false);
        } catch (err) {
            console.error('Failed to delete item:', err);
        }
    };

    return (
        <>
            <EditDialog
                open={editModalState}
                onOpenChange={setEditModalState}
                formComponent={EditForm}
                formProps={{
                    item,
                    onSubmit: handleEditSubmit,
                }}
            />
            <ConfirmDeleteDialog
                open={deleteConfirmBox}
                onOpenChange={setDeleteConfirmBoxOpen}
                onConfirm={handleDelete}
            />

            <DropdownMenu open={dropdownState} onOpenChange={setDropdownState}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align='end'>
                    <DropdownMenuLabel>Item Control</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => { setDropdownState(false); setEditModalState(true) }}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setDropdownState(false); setDeleteConfirmBoxOpen(true) }}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default DropdownMenuComponent;
```

now i just need to do

```javascript

  function EditChallengeForm({ item, onSubmit }) {
      const [title, setTitle] = useState(item.title || '');
      const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
      const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);

      useEffect(() => {
          if (item.categories) {
              setSelectedCategories(item.categories.map(category => category.id));
          }

          if (item.languages) {
              setSelectedLanguages(item.languages.map(language => language.id));
          }
      }, [item]);

      const handleSubmit = (e) => {
          e.preventDefault();
          onSubmit({ title, selectedCategories, selectedLanguages });
      };

      return (
          <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                          Title
                      </Label>
                      <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter challenge title"
                          className="col-span-3"
                          required
                      />
                  </div>

                  <CategoriesChosen
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                  />
                  <LanguagesChosen
                      selectedLanguages={selectedLanguages}
                      setSelectedLanguages={setSelectedLanguages}
                  />
              </div>
              <DialogFooter>
                  <Button type="submit">Update Challenge ... </Button>
              </DialogFooter>
          </form>
      );
  }

   <DropdownMenuComponent
                      item={challenge}
                      editStateHelper={editedChallengeRefresh}
                      deleteStateHelper={deleteFromTable}
                      itemId={challenge.id}
                      itemIndex={challenge_index}
                      action__editItem={action__editChallenge}
                      action__deleteItem={action__deleteChallenge}
                      EditForm={EditChallengeForm}
                    />

```