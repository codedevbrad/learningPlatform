/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Bot } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import BlockSelector from "./part.blockSelector"
import { useState } from "react"
import axios from 'axios'
import { DataForBuild } from "@/app/reusables/components/render"
import { useToast } from "@/components/ui/use-toast"
 

import promptCreator from './prompt'

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
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogTrigger asChild>
          <Button>
            <Bot  className="hover:animate-bounce"/>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle> 
              Generate the content using a.i
            </DialogTitle>
            <DialogDescription className="pt-2">
              Using chatGTP 4.0 we'll generate content blocks for { title } 
            </DialogDescription>
          </DialogHeader>

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
        
          <DialogFooter>
            <Button onClick={() => generateBlocks()} disabled={isLoading}> 
              <span className="mr-2"> { isLoading ? "Generating..." : "Generate" } </span> 
              <div className={ isLoading ? "animate-bounce" : "" }>
                <Bot /> 
              </div>
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>     
    </div>
  );
}
