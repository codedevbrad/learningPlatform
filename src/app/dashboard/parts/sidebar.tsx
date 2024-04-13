'use client'
import Userheatmap from "@/app/reusables/user/heatmap"
import QuoteBlock from "@/app/reusables/content/quote"

export default function Sidebar ( ) {
    return (
        <div className="min-w-60">
            <Userheatmap dates={undefined} />
            <QuoteBlock quoteText="You're doing awesome. Keep it up 😁" />
        </div>
    )
}