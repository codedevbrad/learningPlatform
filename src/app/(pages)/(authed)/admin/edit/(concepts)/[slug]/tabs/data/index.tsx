'use client'
import Link from "next/link"
import { useState } from "react"
import { action_saveTopicBlock } from "./actions"
import { Button, buttonVariants } from "@/components/ui/button"

import PlatformContentBlocks, { DataForBuild } from "@/app/reusables/components/render"
import { AdminToolsProps, props__AdminTool_UpdateDataBlock } from "@/app/(pages)/(authed)/admin/_types/type.adminTools"

import AddNewDataBlock from "./addNewBlock"
import Title from "@/app/reusables/content/title"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import SortableList from "@/app/reusables/usables/sortable"


interface TopicParams {
  topicId: string; 
  topicInfo: {
      title: string, 
      description: string;
  }; 
  topicData: any;
}

export default function EditDataComponent({ topicId, topicData, topicInfo } : TopicParams ) { 
  
    const [ topicInfoState, setTopicInfoState ] = useState<any>( topicInfo ); 
    const [ data , setData ] = useState<DataForBuild[]>( topicData );
    const [ inAdminMode , changeAdminView ] = useState(true);

    function DataDisplaySwitch ( ) {
        const buttonTitle = inAdminMode ? 'Switch to student mode' : 'View in Admin mode';
        return (
          <Button variant={'outline'} className="mx-3" onClick={ () => changeAdminView( !inAdminMode ) }> 
            { buttonTitle } 
          </Button>
        )
    }

    const updateDataBlock = async ( { type = 'update', blockData, blockIndex } : props__AdminTool_UpdateDataBlock ) => {

        // index of block and content
        console.log( type, data, blockData, blockIndex );  
        
        let arrayCopy = [...data];

        if ( type === 'update' && blockData ) {
          arrayCopy[blockIndex ] = blockData;
        }
        else if ( type === 'new' && blockData ) {
          arrayCopy.push( blockData );
        }
        else if ( type === 'delete' ) {
          console.log('deleting block at', blockIndex );
          arrayCopy.splice( blockIndex , 1 );
        };
        await action_saveTopicBlock( topicId, arrayCopy );
        setData( arrayCopy );
    }

    const updateSortableChange = async ( dataAltered : DataForBuild[]) => {
        await action_saveTopicBlock( topicId, dataAltered );        
        setData( dataAltered );
    }
  
    return (
      <div className="flex flex-col">
        
          <div className="flex justify-end">
              <Popover>
                <PopoverTrigger> 
                    <div className={`${ buttonVariants({ variant: 'outline'}) }`}> 
                      Organise 
                    </div>
                </PopoverTrigger>
                <PopoverContent className="h-[400px] w-[400px] overflow-hidden rounded-lg p-3" align={'end'} sideOffset={ 10 }>
                    <div className="overflow-y-scroll h-full px-3 scroll">
                        <SortableList data={ data } onSortableChange={ updateSortableChange }/>
                    </div>
                </PopoverContent>
              </Popover>
          </div>

          <div className="flex-1 p-4 flex-row flex justify-between items-center">
            
              <div key={topicId}>
                  <Title variant="heading" title={topicInfoState.title} noMargin={false} />
                  <p>{topicInfoState.description}</p>
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
              <PlatformContentBlocks data={ data } isInAdminMode={ inAdminMode } adminTools={
              { updateDataBlock } as AdminToolsProps } 
              />
              {/* add new blocks to data. */}
              <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center">
                  <AddNewDataBlock addDataToBlock={ updateDataBlock } />
              </div>
          </div>
      </div>
    );
}