import type { Metadata } from "next"
import NextBreadcrumb from "@/app/reusables/layouts/breadcrumb"
import Title from "@/app/reusables/content/title"

export const metadata: Metadata = {
  title: "CodeBootcamp.com",
  description: "Generated by create next app",
};

export default function ContentWorkEditLayout ({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
        <div className="p-5">
            <div>
            <NextBreadcrumb breadcrumbs={[]}/>
            </div>
            <Title title="Content Work" variant="heading" noMargin={false} />
            <div className="mt-5 flex w-full flex-col">
               { children }
            </div>
        </div>
  );
}