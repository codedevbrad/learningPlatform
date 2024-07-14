'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { ExtendedConcepts } from "../../../../../../../../../prisma/schema.types"
import CategoriesChosen from "@/app/reusables/components/tags/tag.categories"
import { action_editConcept } from "../../actions"


interface EditConceptModalProps {
    concept: ExtendedConcepts | {};
    state: boolean;
    modalAction: (state: boolean ) => void;
    updateTable: ( concepts: ExtendedConcepts[] , toast: string ) => any;
}


export default function EditConceptModal ({ concept, state, modalAction, updateTable }: EditConceptModalProps) {

    const [title, changeTitle] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect( ( ) => {
            changeTitle( concept.title );
            // Initialize selectedCategories with ids from challenge.categories
            if ( concept.categories ) {
                setSelectedCategories(concept.categories.map(category => category.id));
            }
    }, [ concept ] );

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            console.log('submitted...');
            let challengesUpdated = await action_editConcept({ 
                conceptId: concept.id,
                conceptData: {
                    title, 
                    selectedCategories
                }
             });
            console.log( challengesUpdated );

            updateTable( challengesUpdated , 'updated concept' );
            modalAction(false);
        } 
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={ state } onOpenChange={ modalAction }>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle> Edit Title for Concept ... </DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
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
                                onChange={(e) => changeTitle(e.target.value)}
                                placeholder="Enter challenge title"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <CategoriesChosen
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>    
                    <DialogFooter>
                        <Button type="submit"> Update Concept </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
