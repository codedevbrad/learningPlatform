'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CategoriesChosen from "@/app/reusables/components/tags/tag.categories"
import LanguagesChosen from "@/app/reusables/components/tags/tag.languges"
import { action__editChallenge } from "../../actions"


export default function EditChallengeDialog({ challenge, state, editStateHelper, modalAction, challengeId }) {
    const [title, setTitle] = useState(challenge.title || '');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

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
            modalAction();
        } 
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={state} onOpenChange={editStateHelper}>
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