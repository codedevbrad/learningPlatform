import { appVersion } from "@/data"

export default function AppVersion ( { size } ) {
    return (
        <span className="text-sm py-0.5 px-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semi bold rounded"> 
            v { appVersion } 
        </span>
    )
}