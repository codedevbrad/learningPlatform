import Title from "@/app/reusables/content/title"

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <div>
            <Title title="Concept" variant="heading" />
            { params.slug }
        </div>
    )
}