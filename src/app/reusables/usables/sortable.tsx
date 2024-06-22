import { useState } from "react";
import { Card } from "@/components/ui/card"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';

import { buttonVariants } from "@/components/ui/button"

import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
  

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
  
export default function SortableList ({ data }) {
    const [items, setItems] = useState([
        { id: 'item-1' , title: 'item1'  },
        { id: 'item-2' , title: 'item2'  }
    ]);
  
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
    
    console.log(data );
  
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
              { items.map((item) => (
                <SortableItem key={item.id} id={item.id} content={item.title} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
};  