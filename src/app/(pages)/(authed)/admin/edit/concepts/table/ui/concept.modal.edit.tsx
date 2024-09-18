'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ExtendedConcepts } from "../../../../../../../../../prisma/schema.types";
import CategoriesChosen from "@/app/reusables/components/tags/tag.categories";
import { action_editConcept } from "../../actions";
import { Textarea } from "@/components/ui/textarea";

interface EditConceptModalProps {
  concept: ExtendedConcepts | {};
  state: boolean;
  modalAction: (state: boolean) => void;
  updateTable: (concepts: ExtendedConcepts[], toast: string) => any;
}

export default function EditConceptModal({ concept, state, modalAction, updateTable }: EditConceptModalProps) {
  const [title, changeTitle] = useState('');
  const [description, changeDescription] = useState(''); // Add description state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    changeTitle(concept.title);
    changeDescription(concept.description); // Set initial description
    // Initialize selectedCategories with ids from challenge.categories
    if (concept.categories) {
      setSelectedCategories(concept.categories.map(category => category.id));
    }
  }, [concept]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log('submitted...');
      let challengesUpdated = await action_editConcept({
        conceptId: concept.id,
        conceptData: {
          title,
          description, // Include description in the submission
          selectedCategories,
        },
      });
      console.log(challengesUpdated);

      updateTable(challengesUpdated, 'updated concept');
      modalAction(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={state} onOpenChange={modalAction}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Title for Concept ...</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-4 gap-4">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => changeTitle(e.target.value)}
                placeholder="Enter challenge title"
                className="flex-grow w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => changeDescription(e.target.value)}
                placeholder="Enter concept description"
                className="flex-grow w-full"
              />
            </div>
            <CategoriesChosen
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Update Concept</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
