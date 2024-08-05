import React, { useEffect, useState } from "react"
import LanguagesChosen from "@/app/reusables/components/tags/tag.languges"
import { Button } from "@/components/ui/button"
import { action__updateTopicLanguages } from "./actions"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface TopicLanguagesDropdownProps {
  topicId: string;
  languages: any[];
}

const TopicLanguagesControl: React.FC<TopicLanguagesDropdownProps> = ({ languages, topicId }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [initialLanguages, setInitialLanguages] = useState<string[]>([]);
  const [buttonText, setButtonText] = useState("Save Changes");

  useEffect(() => {
    // Initialize selectedLanguages with ids from topic.languages
    if (languages) {
      const languageIds = languages.map(language => language.id);
      setSelectedLanguages(languageIds);
      setInitialLanguages(languageIds);
    }
  }, [languages]);

  const updateTopicLanguages = async () => {
    try {
      setButtonText("Saving...");
      // Perform the update operation here
      console.log("Updating topic languages for topicId:", topicId, "with languages:", selectedLanguages);
      await action__updateTopicLanguages({ topicId, languages: selectedLanguages });
      toast({ title: "Success", description: "Topic languages updated successfully!" }); // Show success toast
      setInitialLanguages(selectedLanguages); // Update the initial languages to the new state
      setButtonText("Saved Successfully");
    } 
    catch (err) {
      console.error('Failed to update topic languages:', err);
      toast({ title: "Error", description: "Failed to update topic languages.", className: 'bg-red-500 text-white'}); // Show error toast
      setButtonText("Save Changes");
    }
  };

  const hasChanges = JSON.stringify(initialLanguages) !== JSON.stringify(selectedLanguages);

  return (
    <div>
      <LanguagesChosen selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} showTitle={false} />
      {hasChanges && (
        <div className="my-3">
          <Button onClick={updateTopicLanguages} disabled={buttonText === "Saving..."}>
            {buttonText === "Saving..." && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopicLanguagesControl;
