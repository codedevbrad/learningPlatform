'use client'
import { Tldraw, useEditor } from 'tldraw'
import { useEffect, useState } from 'react'
import 'tldraw/tldraw.css'
import Title from '../../content/title'

// Main component that renders the drawing canvas with a button to toggle fullscreen mode
export default function DrawCanvas({ title }) {
    // State to control full-screen mode
    const [isFullScreen, setIsFullScreen] = useState(false)

    // Toggle full-screen mode
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    }

    return (
        <div className='flex flex-col space-y-4 pb-5'>
            <Title title={title} variant="heading" noMargin={false} />
            <div className={` ${ isFullScreen ? 'fixed w-full h-full top-0 left-0' : 'h-[500px]' }`}>
                    <Tldraw>
                        <CanvasEditor />
                    </Tldraw>
            </div>
           <div className='flex justify-end'>
                <button onClick={toggleFullScreen} className={`p-3 bg-black text-white rounded-md shadow-md ${ isFullScreen ? 'z-50 fixed bottom-5 right-5' : ''}`}>
                    {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                </button>
           </div>
        </div>
    )
}

// Component to handle editor state and actions
function CanvasEditor() {
  // Access the editor instance
  const editor = useEditor()

  // Function to save the state of the editor
  const saveState = () => {
    if (editor) {
      const content = editor.store
      console.log(content)
    }
  }

  // Track editor changes and save state when changes occur
  useEffect(() => {
    if (!editor) return

    // Track changes to the canvas and save them
    const unsubscribe = editor.store.listen(() => {
      saveState()
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [editor])

  return null // No UI needed for this component
}
