'use client'
import Link from "next/link"
import { useState } from "react"
import { action_saveTopicBlock } from "./actions"
import { Button, buttonVariants } from "@/components/ui/button"

import PlatformContentBlocks, { DataForBuild } from "@/app/reusables/components/render"
import { AdminToolsProps, props__AdminTool_UpdateDataBlock } from "@/app/(pages)/(authed)/admin/_types/type.adminTools"

import AddNewDataBlock from "./addNewBlock"
import Title from "@/app/reusables/content/title"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Card } from "@/components/ui/card"

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

// Fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `Item ${k}`,
  }));

const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 mb-3 bg-white flex items-center justify-between"
    >
      <div>{content}</div>
      <div {...attributes} {...listeners} className={`cursor-grab p-2 ml-2 white rounded ${buttonVariants({ variant: 'outline' })}`}>
        &#x2630; {/* Unicode for a simple handle icon */}
      </div>
    </Card>
  );
};

const SortableList = () => {
  const [items, setItems] = useState(getItems(10));

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="p-4 w-64 bg-white rounded shadow-lg">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};


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
  
    return (
      <div className="flex flex-col">


          
          <Popover>
            <PopoverTrigger>Organse </PopoverTrigger>
            <PopoverContent>
              <SortableList />
        
                  {/* { data.map( ( block, index ) => 
                      <Card key={ index } className="my-4 p-3"> 
                          <div className="flex flex-row">
                                <div className="flex-grow items-center flex"> 
                                 { block.type } block 
                                </div>
                                <div className={`${ buttonVariants({ variant: 'outline'})} cursor-pointer`}> 
                                  ... 
                                </div>
                          </div>
                      </Card>
                  )} */}
            </PopoverContent>
          </Popover>

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
              <PlatformContentBlocks data={ data } isInAdminMode={ inAdminMode } adminTools={{
                  updateDataBlock
              } as AdminToolsProps } />
              {/* add new blocks to data. */}
              <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center">
                  <AddNewDataBlock addDataToBlock={ updateDataBlock } />
              </div>
          </div>
      </div>
    );
}