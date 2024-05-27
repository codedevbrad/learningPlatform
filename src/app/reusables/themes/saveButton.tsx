import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


export default function ButtonSaving ( { isSaved } : { isSaved : boolean }) {
    
    const [isSaving, setIsSaving] = useState(false);
    let timer: NodeJS.Timeout;

    const onSave = ( ) => {
        
        setIsSaving( true );
        timer = setTimeout(() => {
        setIsSaving(false);
        clearTimeout(timer);
        console.log('ended')
        }, 3000 ); // Simulate saving delay of 2 seconds
    }

    useEffect(() => {
        return () => clearTimeout(timer);
      }, [ ] );

    return (
        <>
          { !isSaved ?
            <Button type="submit" onClick={ () => onSave() }>
               Save
            </Button> : (
              <Button disabled>
                 { isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving ...
                    </>
                 ) : (
                    'Saved.'
                 )}
              </Button>
            )
          }
        </>
    )
  }