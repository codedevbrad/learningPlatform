import Title from "@/app/reusables/content/title";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Challenge {
  name: string;
  categories: string[]; // Changed type to an array for categories
  languages: string[]; // Added languages field
  projectOrTask: "project" | "task"; // Added projectOrTask field
  completed: boolean;
}

interface Props {
  challenges: Challenge[];
}

const ChallengeTable: React.FC<Props> = ({ challenges }) => {
  return (
    <Table>
      <TableCaption>This list of challenges is a work in progress.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Challenge</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Languages</TableHead>
          <TableHead> Type </TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {challenges.map((challenge, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{challenge.name}</TableCell>

            <TableCell className="font-medium">
                 <div className="flex flex-wrap">
                    <div className="border px-2 py-1 mr-2 mb-2 rounded" >
                        { challenge.type }
                    </div>
                </div>
            </TableCell>

            <TableCell className="font-medium">
              <div className="flex flex-wrap">
                {challenge.categories.map((category, i) => (
                  <div
                    key={i}
                    className="border px-2 py-1 mr-2 mb-2 rounded"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex flex-wrap">
                {challenge.languages.map((language, i) => (
                  <div
                    key={i}
                    className="border px-2 py-1 mr-2 mb-2 rounded"
                  >
                    {language}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div
                className={`rounded px-3 py-1 inline-block ${
                  challenge.completed ? "bg-black" : "bg-gray-400"
                } text-white`}
              >
                {challenge.completed ? "Completed" : "Not Completed"}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function ChallengePage() {
  // Example usage
  const challenges = [
    {
      name: "Fetch and display from an API.",
      languages: ["ExpressJs"],
      categories: ["Frontend", "API"],
      type: "task",
      completed: false,
    },
    {
      name: "Start a basic server with expressJs.",
      languages: ["ExpressJs"],
      categories: ["Backend", "REST"],
      type: "task",
      completed: false,
    },
    {
      name: "Create a Rest API endpoint.",
      languages: ["ExpressJs"],
      categories: ["Backend", "REST"],
      type: "task",
      completed: true,
    },
    {
      name: "grasp all Js dom concepts",
      languages: ["Js"],
      categories: ["Frontend", "Js"],
      type: "task",
      completed: true,
    },
    {
      name: "Create a quiz application",
      languages: ["ReactJs"],
      categories: ["Frontend"],
      type: "project",
      completed: true,
    },
  ];

  return (
    <main className="flex flex-col p-4">
      <div className="flex justify-center">
        <Title title="Challenge yourself 🧠" variant="heading" />
      </div>
      <div className="my-6">
        <ChallengeTable challenges={challenges} />;
      </div>
    </main>
  );
}
