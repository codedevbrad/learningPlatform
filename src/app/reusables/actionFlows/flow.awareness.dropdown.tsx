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
        } 
        catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await action__deleteItem(itemId);
            deleteStateHelper(itemIndex);
            setDeleteConfirmBoxOpen(false);
        } 
        catch (err) {
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