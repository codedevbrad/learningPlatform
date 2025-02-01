'use server'

import CalendarSystem from "./calendar";

export default async function StudentsPage() {
    return (
        <div className="flex w-full m-5 flex-col space-y-8">      
            <CalendarSystem />
        </div>
    );
}
