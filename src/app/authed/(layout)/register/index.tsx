"use client"
import { useState } from 'react'
import Title from "@/app/reusables/content/title"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export default function AuthedButRegister () {
  const [ modalState , changeModalState ] = useState( true );
  const [ aboutState, setAboutState ] = useState('');
  
  // Handler to prevent dialog from closing
  const handleOpenChange = (isOpen: boolean ) => {
    if (!isOpen) {
      // Keep the dialog open
      changeModalState(true);
    }
  };

  const handleSubmit = ( ) => {
     changeModalState( false );
  }

  return (
    <Dialog open={ modalState } onOpenChange={ handleOpenChange }>
      <DialogContent className="sm:max-w-[825px]">

        <DialogHeader>
            <Title title='We need a few things first' variant={'heading'} />
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>

        <div className="">
            <div className="flex flex-col space-y-4">
              <Label htmlFor="bio" className="text-left">
                Tell us why you want to join our platform?
              </Label>
              <textarea 
              id="username" 
              className="col-span-3 border border-grey-300 rounded-lg p-3" 
              cols={ 8 }
              onChange={ ( e ) => setAboutState( e.target.value )}
              placeholder='I would like to learn / get better at ...'
              > 
                { aboutState }
              </textarea>
            </div>
        </div>

        <DialogFooter>
          <Button onClick={ handleSubmit }> Start Learning </Button>
        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}