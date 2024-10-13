import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { action_addNewTopic } from '../../actions'
import { ExtendedConcepts } from '@/../prisma/schema.types'
import LanguagesChosen from '@/app/reusables/components/tags/tag.languges'

interface AddTopicModalProps {
  updateTable: (topics: ExtendedConcepts[], message: string) => void;
  conceptId: string;
}

const AddTopicModal: React.FC<AddTopicModalProps> = ({ updateTable, conceptId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect( ( ) => {
      console.log('hey')
  }, [ ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const topicsUpdated = await action_addNewTopic({conceptId, title, description, selectedLanguages});
      setTitle('');
      setDescription('');
      setSelectedLanguages([]);
      updateTable(topicsUpdated, 'created topic successfully'); // Refresh the table to reflect the new topic
      setOpen(false);
    } 
    catch (error) {
      console.error('Failed to add new topic:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>
            Add a new topic to the concept. Fill in the title and description.
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
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <LanguagesChosen selectedLanguages={ selectedLanguages } setSelectedLanguages={ setSelectedLanguages } />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;