import Link from "next/link"
import { useState, useEffect } from "react"
import { action_getTopicById , action_saveTopicBlock } from "../../../actions"
import { Button } from "@/components/ui/button"

import PlatformContentBlocks, { DataForBuild } from "@/app/reusables/components/render"
import { AdminToolsProps } from '@/app/admin/_types/type.adminTools'

import AddNewDataBlock from "./addNewBlock"
import Title from "@/app/reusables/content/title"

interface UpdateDataBlockProps {
    type: 'new' | 'update';
    blockData: DataForBuild;
    blockIndex: number;
}

export type {
  UpdateDataBlockProps
};

export default function EditDataComponent({ topicId } : { topicId: string }) { 
  
    const [conceptData, setConceptData] = useState<any>({}); 
    const [ data , setData ] = useState<DataForBuild[]>([]);
    const [ inAdminMode , changeAdminView ] = useState(true);

    function DataDisplaySwitch ( ) {
        const buttonTitle = inAdminMode ? 'Switch to student mode' : 'View in Admin mode';
        return (
          <Button variant={'outline'} className="mx-3" onClick={ () => changeAdminView( !inAdminMode ) }> { buttonTitle } </Button>
        )
    }

    const updateDataBlock = async ( { type = 'update', blockData, blockIndex } : UpdateDataBlockProps ) => {
        // index of block and content
        console.log(type, data, blockData, blockIndex );  
        let arrayCopy = [...data];
        if ( type === 'update' ) {
          arrayCopy[blockIndex ] = blockData;
        }
        else if ( type === 'new' ) {
          arrayCopy.push( blockData );
        }
        let savedData = await action_saveTopicBlock(topicId, arrayCopy );
        setData( arrayCopy );
    }
  
    // Define a function to fetch topic data.
    const fetchTopicData = async (topicId: string) => {
      try {
        const topic = await action_getTopicById(topicId);
        setConceptData(topic); 
        setData( topic?.data )
      } 
      catch (error) {
        console.error('Failed to fetch topic data:', error);
      }
    };
  
    // UseEffect hook to fetch topic data when component mounts...
    useEffect(() => {
      fetchTopicData( topicId );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts...
  
    return (
      <div className="flex flex-col">
          <div className="flex-1 p-4 flex-row flex justify-between items-center">
            
              <div key={conceptData.id}>
                  <Title variant="heading" title={ conceptData.title } />
                  <p>{conceptData.description}</p>
              </div>

              <div>

                <DataDisplaySwitch />
               
                <Link href={`/authed/content/concepts/${topicId}`} rel="noopener noreferrer" target="_blank">
                    <Button>
                        View page
                    </Button>
                </Link>
              </div>
          </div>

          <div>
              {/* render blocks based on data. */}
              <PlatformContentBlocks data={ data } isInAdminMode={ inAdminMode } adminTools={{
                  updateDataBlock
              } as AdminToolsProps } />
              <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center">
                  <AddNewDataBlock addDataToBlock={ updateDataBlock } />
              </div>
          </div>
      </div>
    );
}