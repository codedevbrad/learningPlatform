'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { action__getStudents } from "./action";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import ControlStudentAccesspopup from "@/app/reusables/access/admin/admin.controlAccess.popup";

export default function StudentsList() {
  const [selectedUser, setSelectedUser] = useState("");
  const [popoverOpen, setPopoverOpen] = useState({}); // State for tracking popover open state per user

  // Define the fetcher function
  const fetcher = async () => {
    try {
      console.log("Fetching students data");
      const data = await action__getStudents();
      console.log("Fetched students to chat:", data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Failed to fetch students:", error);
      return [];
    }
  };

  // Use SWR to fetch users
  const { data: users = [], error, isLoading, isValidating, mutate } = useSWR("fetchUsers", fetcher, {
    onSuccess: (data) => {
      console.log("Data fetched successfully:", data);
    },
    onError: (error) => {
      console.log("Error fetching data:", error);
    },
  });

  useEffect(() => {
    const currentUrl = window.location.href;
    const userId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    setSelectedUser(userId);
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading users...");
    }
    console.log("Users data from cache:", !isValidating);
  }, [isValidating, isLoading]);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  const handlePopoverHover = (userId, isOpen) => {
    setPopoverOpen((prev) => ({ ...prev, [userId]: isOpen }));
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
            <div
              key={user.id}
              onMouseEnter={() => handlePopoverHover(user.id, true)}
              onMouseLeave={() => handlePopoverHover(user.id, false)}
            >
              <Popover open={popoverOpen[user.id] || false}>
                <PopoverTrigger asChild>
                  <div>
                    <Link href={`/admin/students/student/${user.id}`} passHref>
                      <Card
                        className={`py-5 px-4 rounded-md flex items-center gap-4 cursor-pointer w-full ${
                          selectedUser === user.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleUserClick(user.id)}
                      >
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={user.avatar} alt="Avatar" />
                          <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            {user.nickname}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          <ControlStudentAccesspopup
                            studentId={user.id}
                            status={user.status}
                            rerenderUsers={mutate}
                          />
                        </div>
                      </Card>
                    </Link>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="center"
                  sideOffset={10}
                  className="min-w-72 p-4"
                >
                  <p className="font-medium text-sm mb-2">
                      { user.nickname }
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    has been incredibly dedicated to learning JavaScript. 
                    They struggled with callbacks earlier in the bootcamp, 
                    but their persistence has really paid off. I'm impressed 
                    with their improvement in problem-solving and teamwork."
                  </p>
                  <div className="flex flex-col space-y-4 mt-2">
                      <span className="bg-gray-100 p-2 rounded-md text-nowrap"> 07715 656 191 </span>
                      <span className="bg-gray-100 p-2 rounded-md text-nowrap"> brad12468@gmail.com </span>
                  </div>
                
                </PopoverContent>
              </Popover>
            </div>
          ))
        )}
      </div>
    </div>
  );
}