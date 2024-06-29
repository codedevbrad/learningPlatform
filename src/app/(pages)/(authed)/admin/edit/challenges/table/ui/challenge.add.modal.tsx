'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CategoriesChosen from "@/app/reusables/components/tags/tag.categories"
import LanguagesChosen from "@/app/reusables/components/tags/tag.languges"

import { action__addChallenge } from "../../actions"


export default function AddChallengeDialog({ addStateHelper }) {
    const [ stateModal, updateModal ] = useState( false );
    const [ title, setTitle ] = useState('');
    const [ selectedCategories, setSelectedCategories ] = useState<string[]>([]);
    const [ selectedLanguages, setSelectedLanguages ]   = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        
        try {
          e.preventDefault();
          // Handle form submission logic here
          console.log( selectedCategories );
          let challengesUpdated = await action__addChallenge({ 
            title, 
            selectedCategories, 
            selectedLanguages 
          });
          updateModal( false );
          addStateHelper( challengesUpdated );
        }
        catch ( error ) {
          console.error( error );
        }
    }

    return (
      <Dialog open={stateModal } onOpenChange={ updateModal }>
        <DialogTrigger asChild>
            <Button variant="outline"> Add Challenge </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">

          <DialogHeader>
            <DialogTitle> Create a new challenge </DialogTitle>
            <DialogDescription>
               Create a new Challenge for users to compete and beat.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={ handleSubmit }>
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
                        selectedLanguages={ selectedLanguages }
                        setSelectedLanguages={ setSelectedLanguages }
                />
              </div>
              <DialogFooter>
                <Button type="submit"> Create Challenge </Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
}
