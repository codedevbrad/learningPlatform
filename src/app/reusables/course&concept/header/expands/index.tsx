"use client"
import Title from "@/app/reusables/content/title";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { FaRegFile } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";

function Notes({ }) {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="border p-5 m-4 rounded-md bg-white">
                    <FaBookOpenReader />
                </div> 
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <Title variant="subheading1" title="Notes you've made for this course" />
                </SheetHeader>
                <SheetDescription>
                    
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

function Resources({ }) {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="border p-5 m-4 rounded-md bg-white"> 
                    <FaRegFile />
                </div> 
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <Title variant="subheading1" title="Resources for this course" />
                </SheetHeader>
                <SheetDescription>
                    {/* Your resources content here */}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

function Completed({  }) {
    return (
        <div className="border p-5 m-4 rounded-md bg-white"> 
            <p className="text-sm"> completed 👍 </p>
        </div> 
    );
}

export default function CourseExtraExpandable() {

    return (
        <div className="flex justify-center items-center">
            <Notes />
            <Resources  />
            <Completed  />
        </div>
    );
}
