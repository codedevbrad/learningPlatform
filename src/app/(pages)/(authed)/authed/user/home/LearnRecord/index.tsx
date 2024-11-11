import Title from "@/app/reusables/content/title"
import Homework from "./homework"
import UserHistory from "./History"

export default function LearningPage ( ) {
    return (
        <div className="bg-white p-5">
            <Homework />
            <UserHistory />
        </div>
    )
}