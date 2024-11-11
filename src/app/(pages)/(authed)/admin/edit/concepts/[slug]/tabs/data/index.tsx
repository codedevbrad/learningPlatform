'use client'
import Link from "next/link"
import React, { useState, useRef, useEffect } from "react"
import { action_saveTopicBlock } from "./actions"
import { Button, buttonVariants } from "@/components/ui/button"

import PlatformContentBlocks, { DataForBuild } from "@/app/reusables/components/render"
import { AdminToolsProps, props__AdminTool_UpdateDataBlock } from "@/app/(pages)/(authed)/admin/_types/type.adminTools"

import AddNewDataBlock from "../../../../../../../../reusables/components/creator/addNewBlock"
import Title from "@/app/reusables/content/title"
import SortableList from "@/app/reusables/usables/sortable"

import AI_BlockGenerator from "../../../../../../../../reusables/components/creator/ai.dataCreator"

import TopicLanguagesControl from "./topic.languages.popup.edit"


interface TopicParams {
  topicId: string; 
  topicInfo: {
      title: string, 
      description: string;
      languages: any[]
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

    
    const updateDataBlock = async ({ type = 'update', blockData, blockIndex }: props__AdminTool_UpdateDataBlock) => {
      try {
          let arrayCopy = [...data];
  
          if (type === 'new' && blockData) {
              // Insert blockData after blockIndex
              arrayCopy.splice(blockIndex + 1, 0, blockData);
          }
          else if (type === 'update' && blockData) {
              arrayCopy[blockIndex] = blockData;
          }
          else if (type === 'delete') {
              console.log('deleting block at: ', blockIndex);
              arrayCopy.splice(blockIndex, 1);
          }
          
          await action_saveTopicBlock(topicId, arrayCopy);
          setData(arrayCopy);
      }
      catch (error) {
          console.error('error saving new block data array to concept topic.');
          throw error;
      }
  }  



  const refreshTableWithNewBlocks = async ( dataAltered : DataForBuild[] ) => {
        try {
          await action_saveTopicBlock( topicId, dataAltered );        
          setData( dataAltered );
        }
        catch ( error ) {
          console.error('error saving new block data array to concept topic.');
          throw error;
        }
  }
  


  return (
    <div className="flex flex-col">
        <div className="flex justify-end">
              <SortableList data={ data } onSortableChange={ refreshTableWithNewBlocks } sortTitle="concept blocks" />
        </div>
        <div className="flex-1 pb-4 flex-row flex justify-between items-center">
          
            <div key={topicId}>
                <Title variant="heading" title={topicInfoState.title} noMargin={false} />
                <p>{topicInfoState.description}</p>
                <div className="my-4">
                  <TopicLanguagesControl languages={ topicInfoState.languages } topicId={ topicId }  />
                </div>
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
                <AddNewDataBlock addDataToBlock={ updateDataBlock } pushAfter={ data.length - 1 } />
                <AI_BlockGenerator 
                  updateTableWithGeneration={ refreshTableWithNewBlocks } 
                  title={ topicInfo.title } 
                  description={ topicInfo.description } 
                />
            </div>
        </div>
    </div>
  );
}