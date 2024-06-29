import { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { action_getCategories } from "./actions"

interface Category {
    id: string; // Change id to string
    name: string;
}

interface Option {
    value: string; // Change value to string
    label: string;
}

interface CategoriesChosenProps {
    selectedCategories: string[]; // Change to string array
    setSelectedCategories: (categories: string[]) => void;
}

export default function CategoriesChosen({ selectedCategories, setSelectedCategories }: CategoriesChosenProps) {
    const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const categoriesData: Category[] = await action_getCategories();
            setCategoryOptions(categoriesData.map(category => ({
                value: category.id,
                label: category.name
            })));
        }
        fetchCategories();
    }, []);

    const handleCategoryChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedCategories(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="categories" className="text-right">
                Categories
            </label>
            <Select
                id="categories"
                className="col-span-3"
                options={categoryOptions}
                isMulti
                value={categoryOptions.filter(option => selectedCategories.includes(option.value))}
                onChange={handleCategoryChange}
            />
        </div>
    );
}