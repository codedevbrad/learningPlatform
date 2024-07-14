import { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { action_getLanguages } from './actions'

interface Language {
    id: string; // Change id to string
    name: string;
}

interface Option {
    value: string; // Change value to string
    label: string;
}

interface LanguagesChosenProps {
    selectedLanguages: string[]; // Change to string array
    setSelectedLanguages: (languages: string[]) => void;
}

export default function LanguagesChosen({ selectedLanguages, setSelectedLanguages }: LanguagesChosenProps) {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [languageOptions, setLanguageOptions] = useState<Option[]>([]);

    useEffect(() => {
        async function fetchLanguages() {
            try {
                const languagesData: Language[] = await action_getLanguages(); // Implement getLanguages function in your API
                setLanguages(languagesData);
                setLanguageOptions(
                    languagesData.map((language) => ({
                        value: language.id,
                        label: language.name,
                    }))
                );
            } catch (error) {
                console.error('Error fetching languages:', error);
                // Handle error state or logging as needed
            }
        }
        fetchLanguages();
    }, []);

    const handleLanguageChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedLanguages(selectedOptions ? selectedOptions.map((option) => option.value) : []);
    };

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="languages" className="text-right">
                Languages
            </label>
            <Select
                id="languages"
                className="col-span-3"
                options={languageOptions}
                isMulti
                value={languageOptions.filter((option) => selectedLanguages.includes(option.value))}
                onChange={handleLanguageChange}
            />
        </div>
    );
}
