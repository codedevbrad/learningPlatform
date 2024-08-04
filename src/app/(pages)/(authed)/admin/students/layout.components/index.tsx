'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import { action__getStudents } from "./action";

export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState('');

  // Define the fetcher function
  const fetcher = async () => {
    try {
      console.log('Fetching students data');
      const data = await action__getStudents();
      console.log('Fetched students to chat:', data);
      return Array.isArray(data) ? data : [];
    } 
    catch (error) {
      console.error('Failed to fetch students:', error);
      return [];
    }
  };

  // Use SWR to fetch users
  const { data: users = [], error, isLoading, isValidating } = useSWR('fetchUsers', fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.log('Error fetching data:', error);
    },
  });

  useEffect(() => {
    const currentUrl = window.location.href;
    const userId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    setSelectedUser(userId);
  }, []);


  useEffect(() => {
    if (isLoading) {
      console.log('Loading users...');
    }
    console.log('Users data from cache:', !isValidating);
  }, [isValidating, isLoading]);

  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div className="h-full min-w-[300px]">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <div className="flex flex-col space-y-4 p-4">
        {error ? (
          <div>Failed to load users</div>
        ) : (
          users.map((user) => (
            <Link href={`/admin/students/student/${user.id}`} key={user.id} passHref>
              <Card 
                className={`py-5 px-4 rounded-md flex items-center gap-4 cursor-pointer ${selectedUser === user.id ? 'bg-gray-100' : ''}`} 
                onClick={() => handleUserClick(user.id)}
              >
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={user.avatar} alt="Avatar" />
                  <AvatarFallback> { user.nickname[0] } </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none"> { user.nickname } </p>
                </div>
                <div className="ml-auto font-medium">
                      {user.status === 'ACTIVE' && (
                        <span className="bg-gray-900 text-white px-2 py-1 rounded">Active</span>
                      )}
                      {user.status === 'SUSPENDED' && (
                        <span className="bg-gray-800 text-white px-2 py-1 rounded">Suspended</span>
                      )}
                      {user.status === 'PAUSED' && (
                        <span className="bg-gray-700 text-white px-2 py-1 rounded">Paused</span>
                      )}
                      {user.status === 'COMPLETED' && (
                        <span className="bg-gray-600 text-white px-2 py-1 rounded">Completed</span>
                      )}
                      {user.status === 'INACTIVE' && (
                        <span className="bg-gray-500 text-white px-2 py-1 rounded">Inactive</span>
                      )}
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}