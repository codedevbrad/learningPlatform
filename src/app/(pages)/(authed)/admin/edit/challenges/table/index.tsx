'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action__getAllChallenges } from '../actions'
import { Button } from '@/components/ui/button'
import AddChallengeDialog from './ui/challenge.add.modal'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import useSWR, { mutate } from 'swr'
import DropdownMenuComponent from '@/components/custom/dropdown'

import { action__editChallenge, action__deleteChallenge } from '../actions'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CategoriesChosen from '@/app/reusables/components/tags/tag.categories'
import LanguagesChosen from '@/app/reusables/components/tags/tag.languges'
import { DialogFooter } from '@/components/ui/dialog'


function EditChallengeForm({ item, onSubmit }) {
    const [title, setTitle] = useState(item.title || '');
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);

    useEffect(() => {
        if (item.categories) {
            setSelectedCategories(item.categories.map(category => category.id));
        }

        if (item.languages) {
            setSelectedLanguages(item.languages.map(language => language.id));
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, selectedCategories, selectedLanguages });
    };

    return (
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
                <Button type="submit">Update Challenge ... </Button>
            </DialogFooter>
        </form>
    );
}


export default function ChallengesEditTable() {
    const { toast } = useToast();
  
    const fetcher = async () => {
      const data = await action__getAllChallenges();
      return data;
    };
  
    const { data: challenges, error, isLoading, isValidating } = useSWR('fetchData', fetcher, {
      onSuccess: (data) => {
        console.log('Data fetched successfully:', data);
      },
      onError: (error) => {
        console.log('Error fetching data:', error);
      },
      onLoadingSlow: () => {
        console.log('Loading is slow fetching challenges for admin...');
      },
    });

    useEffect(( ) => {
      console.log('Challenges from cache:', !isValidating);
    }, [] );
  
    if (isLoading) {
      console.log('Loading challenges...');
      return <div>Loading...</div>;
    }
    if (error) {
      console.log('Error loading data');
      return <div>Error loading data</div>;
    }

    const addedChallengeRefresh = async () => {
      const updatedChallenges = await fetcher();
      mutate('fetchData', updatedChallenges, false);
      toast({
        title: 'Added new Challenge',
      });
    };
  
    const editedChallengeRefresh = async () => {
      const updatedChallenges = await fetcher();
      mutate('fetchData', updatedChallenges, false);
      toast({
        title: 'Edited Challenge'
      });
    };
  
    const deleteFromTable = (indexToDelete) => {
      mutate('fetchData', challenges.filter((_, index) => index !== indexToDelete), false);
      toast({
        title: 'Deleted Challenge',
      });
    };
  
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
                    <DropdownMenuComponent
                      item={challenge}
                      editStateHelper={editedChallengeRefresh}
                      deleteStateHelper={deleteFromTable}
                      itemId={challenge.id}
                      itemIndex={challenge_index}
                      action__editItem={action__editChallenge}
                      action__deleteItem={action__deleteChallenge}
                      EditForm={EditChallengeForm}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-full bg-white fixed bottom-0 left-0 h-[100px] flex justify-center items-center">
          <AddChallengeDialog addStateHelper={addedChallengeRefresh} />
        </div>
      </div>
    );
  }