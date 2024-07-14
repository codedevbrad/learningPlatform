'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CategoriesChosen from "@/app/reusables/components/tags/tag.categories"
import LanguagesChosen from "@/app/reusables/components/tags/tag.languges"
import { action__editChallenge, action__deleteChallenge } from "../../actions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"


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