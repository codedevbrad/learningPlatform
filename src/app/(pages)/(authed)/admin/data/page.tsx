'use client';
import Title from "@/app/reusables/content/title";
import { Card } from "@/components/ui/card";
import LanguagesSection  from './components/data.languages'; // Assuming the correct path
import CategoriesSection from './components/data.categories'; // Assuming the correct path

export default function DataPage() {
    return (
        <div className="flex w-full justify-center items-center">  
            <Card className="w-full p-6 px-9">
                <Title title="Data" variant="heading" noMargin={false} />

                {/* Languages Section */}
                <LanguagesSection />

                {/* Categories Section */}
                <CategoriesSection />
            </Card>
        </div>
    );
}
