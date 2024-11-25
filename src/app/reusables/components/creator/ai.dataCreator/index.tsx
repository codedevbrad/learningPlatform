/* eslint-disable react/no-unescaped-entities */
import { Button, buttonVariants } from "@/components/ui/button"
import { Bot } from 'lucide-react'
import BlockSelector from "./part.blockSelector"
import { useState } from "react"
import axios from 'axios'
import { DataForBuild } from "@/app/reusables/components/render"
import { useToast } from "@/components/ui/use-toast"

import {   
  PushSheet, PushSheetTrigger, PushSheetContent, PushSheetClose, PushSheetHeader,
  PushSheetFooter, PushSheetTitle, PushSheetDescription, 
} from "@/components/custom/sheetPush"
 

import promptCreator from './prompt'
import DivAsButton from "@/components/custom/divAsButton"

interface AI_BlockGeneratorProps {
    title: string;
    description: string;
    updateTableWithGeneration: ( dataAltered : DataForBuild[] ) => any;
}


export default function AI_BlockGenerator({ title , description , updateTableWithGeneration } : AI_BlockGeneratorProps ) {
  const [blocksChosen, setBlocksChosen] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [dialogState, setDialogState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { toast } = useToast();

  async function generateBlocks() {
    try {
      setIsLoading(true);

      let blockNamesChosen = blocksChosen.map( block => block.label );

      let prompt = promptCreator({ title, description, explanation, blockNamesChosen });

      const response = await axios.post('/services/chatgpt/api/generate-blocks', {
          prompt: prompt
      });

      const data = response.data;
      console.log('data generated', data);

      const dataArray = new Function(`return ${data.generatedBlocks }`)();
    
      console.log( dataArray );

      updateTableWithGeneration( dataArray );  
      setDialogState(false);
      setIsLoading(false);

      toast({
        title: `Successfully generated block content for ${ title }`
      });
    } 
    catch (error) {
      console.error('Error generating blocks:', error);
      setIsLoading(false);
      toast({
        title: `Oops, we couldnt generate block content for ${ title }`,
        className: 'bg-red-500 text-white border-none'
      });
    }
  }

  return (
    <div className="mx-2">
      <PushSheet side="right" className={'p-5'}>
        <PushSheetTrigger className="" isOpen={dialogState} onToggle={setDialogState} >
            <DivAsButton variant={'default'}> 
              <Bot className="hover:animate-bounce"/>
            </DivAsButton>
        </PushSheetTrigger>
        <PushSheetHeader className={undefined}>
          <PushSheetTitle className={undefined}>
             Generate the content using a.i
          </PushSheetTitle>
          <PushSheetDescription className={undefined}>
            Using chatGTP 4.0 we'll generate content blocks for { title } 
          </PushSheetDescription>
        </PushSheetHeader>
        
        <div className="py-4 flex flex-col">
            <BlockSelector updatedBlocks={setBlocksChosen} />
            <div className="gap-4">
              <p className="my-4 text-sm text-slate-500"> 
                Provide some explanation on what you'd like to generate. 
              </p>
              <textarea 
                className="border border-gray-200 w-full text-gray-600 p-2 text-sm" 
                rows={4} 
                value={explanation} 
                onChange={(event) => setExplanation(event.target.value)}
              />
            </div>
          </div>
        
        <PushSheetFooter>
            <div className="flex justify-end">
            <Button onClick={() => generateBlocks()} disabled={isLoading}> 
              <span className="mr-2"> { isLoading ? "Generating..." : "Generate" } </span> 
              <div className={ isLoading ? "animate-bounce" : "" }>
                <Bot /> 
              </div>
            </Button>
            </div>
        </PushSheetFooter>
      </PushSheet>
    </div>
  );
}