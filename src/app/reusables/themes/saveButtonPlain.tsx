import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";

export default function EditorButtonSavePlain ({ onSave, canSave }) {
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    let timer: string | number | NodeJS.Timeout | undefined;
  
    const handleSave = async () => {
      setIsSaving(true);
      setIsSaved(false);
      await onSave();
      timer = setTimeout(() => {
        setIsSaving(false);
        setIsSaved(true);
        clearTimeout(timer);
      }, 3000); // Simulate saving delay of 3 seconds
    };
  
    useEffect(() => {
      if (canSave) {
        setIsSaved(false);
      }
    }, [canSave]);
  
    useEffect(() => {
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <Button onClick={handleSave} disabled={isSaving || !canSave}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving ...
          </>
        ) : isSaved || !canSave ? (
          'Saved.'
        ) : (
          'Save'
        )}
      </Button>
    );
}