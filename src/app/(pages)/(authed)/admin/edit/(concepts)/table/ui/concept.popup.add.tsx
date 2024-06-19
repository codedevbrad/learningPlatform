'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import CategoriesChosen from "@/app/reusables/components/tags/tag.categories"
import { action_addNewConcept } from '../../actions'
import { ExtendedConcepts } from '../../../../../../../prisma/schema.types'

// Define the props interface
interface AddConceptPopupProps {
    updateTable: (concepts: ExtendedConcepts[], message: string) => void;
}


const AddConceptPopup: React.FC<AddConceptPopupProps> = ({ updateTable }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [active, setActive] = useState<boolean>(true);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const handleSave = async ( ) => {
        try {
            // Handle save logic here, e.g., call addData with the form data
            const conceptData = {
                title,
                description,
                active,
                imgUrl,
                categories: selectedCategories,
            };
            console.log(conceptData);
            let conceptsUpdated = await action_addNewConcept( conceptData );
            console.log( conceptsUpdated );
            setOpen(false);
            updateTable( conceptsUpdated, 'Created new Concept' );
        }
        catch ( err ) {
            console.error( err );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Concept</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Concept</DialogTitle>
                    <DialogDescription>
                        Add details for the new concept here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            className="col-span-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="active" className="text-right">
                            Active
                        </Label>
                        <Checkbox
                            id="active"
                            className="col-span-3"
                            checked={active}
                            onCheckedChange={(checked) => setActive(checked)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imgUrl" className="text-right">
                            Image URL
                        </Label>
                        <Input
                            id="imgUrl"
                            className="col-span-3"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                    </div>
                    <CategoriesChosen
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddConceptPopup;