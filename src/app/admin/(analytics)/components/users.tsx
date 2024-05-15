'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/avatars/01.png",
    initials: "OM",
    status: "active"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/avatars/02.png",
    initials: "JL",
    status: "paused"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
    initials: "IN",
    status: "left"
  },
  // Add more user objects as needed
];


export default function UsersList ( ) {
    return (
      <Card>
          <CardHeader>
            <CardTitle> Users </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-8">
            {users.map((user, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={user.avatar} alt="Avatar" />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="ml-auto font-medium">
                  {user.status === 'active' && (
                    <span className="bg-black text-white px-2 py-1 rounded">Active</span>
                  )}
                  {user.status === 'paused' && (
                    <span className="bg-gray-500 text-white px-2 py-1 rounded">Paused</span>
                  )}
                  {user.status === 'left' && (
                    <span className="bg-gray-400 text-white px-2 py-1 rounded">Left</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>

      </Card>
    );
  }