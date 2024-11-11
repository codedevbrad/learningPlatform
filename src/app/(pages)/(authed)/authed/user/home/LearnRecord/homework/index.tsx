'use server'
import Title from '@/app/reusables/content/title'
import AdminHomework from '@/app/reusables/features/homework/render.admin'

export default async function Homework ({ renderType }) {
  return (
    <div>
        <Title title="Your tasks / Homework 👍" variant="subheading1" noMargin={false} />
        <AdminHomework />
    </div>
)
}
