'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action__getAllChallenges, action__deleteChallenge } from '../actions'
import { Button } from '@/components/ui/button'
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, 
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import AddChallengeDialog from './ui/challenge.add.modal'
import EditChallengeDialog from './ui/challenge.edit.modal'
import Link from 'next/link'


const ChallengeModal = ({ challenge, editStateHelper, deleteStateHelper, challengeId , challengeIndex }) => {

    const [ editModalState , setModalState ] = useState( false );

    const deleteChallenge = async ( ) => {
        try {
            await action__deleteChallenge( challengeId );
            deleteStateHelper( challengeIndex );
        }
        catch ( err ) {
            console.error('Failed to delete challenge:', err );
        }
    }

    return ( 
    <> 
        <EditChallengeDialog challenge={ challenge } state={ editModalState } editStateHelper={ editStateHelper } challengeId={ challengeId } modalAction={ setModalState } />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline"> ... </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
                Challenge Control 
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <div onClick={() => setModalState( true )}> edit </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span onClick={ () => deleteChallenge()}> Delete </span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
    )
}


export default function ChallengesEditTable() {
    const [challenges, setChallenges] = useState([]);



    // Function to fetch challenges on component mount
    useEffect(() => {
        async function fetchChallenges() {
            try {
                let challenges = await action__getAllChallenges();
                setChallenges(challenges);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                // Handle error fetching challenges
            }
        }
        fetchChallenges();
    }, []);

    // Function to add a challenge to the table
    const addedChallengeRefresh = (challenges) => {
        setChallenges( prev =>  challenges );
    }

    const editedChallengeRefresh = (challenges) => {
        setChallenges( prev =>  challenges );
    }

    // Function to delete a challenge from the table based on index
    const deleteFromTable = (indexToDelete) => {
        setChallenges(prev => {
            // Create a new array excluding the challenge at indexToDelete
            const updatedChallenges = prev.filter((_, index) => index !== indexToDelete);
            return updatedChallenges;
        });
    }

    return (
        <div className="p-4">
            <div className="overflow-x-auto mb-4">
                <Table className="min-w-full">
                    <TableCaption className="font-medium py-2">List of Challenges</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-100 border-b">
                            <TableHead className="text-left p-2">Title</TableHead>
                            <TableHead className="text-left p-2">Categories</TableHead>
                            <TableHead className="text-left p-2">Languages</TableHead>
                            <TableHead className='text-left p-2'>View Page</TableHead>
                            <TableHead className="text-left p-2"> </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {challenges.map((challenge, challenge_index) => (
                            <TableRow key={challenge.id} className="">
                                <TableCell className="p-2 font-medium">{challenge.title}</TableCell>
                                <TableCell className="p-2">
                                    {challenge.categories.map((category, index) => (
                                        <Button key={`challenge_c__${index}`} variant={'outline'} className="mx-1">
                                            {category.name}
                                        </Button>
                                    ))}
                                </TableCell>
                                <TableCell className="p-2">
                                    {challenge.languages.map((language, index) => (
                                        <Button key={`challenge_l__${index}`} variant={'outline'} className="mx-1">
                                            {language.name}
                                        </Button>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/admin/edit/challenges/${challenge.id}`}>
                                        <Button variant={'outline'}>
                                            edit challenge
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    <ChallengeModal 
                                         challenge={ challenge } 
                                         challengeIndex={challenge_index} 
                                         editStateHelper={ editedChallengeRefresh } 
                                         deleteStateHelper={deleteFromTable} 
                                         challengeId={challenge.id} 
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full bg-white fixed bottom-0 left-0 h-[100px] flex justify-center items-center">
                <AddChallengeDialog addStateHelper={ addedChallengeRefresh } />
            </div>
        </div>
    );
}