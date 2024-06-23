import { Key, useState } from "react";
import { Card } from "@/components/ui/card"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable'
import { buttonVariants } from "@/components/ui/button"
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
  

const SortableItem = (
    { id, content }: 
    { id: string; content: { item_type: string; item_title: string; } 
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const { item_type , item_title } = content;
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="py-4 px-2 mb-3 bg-white flex justify-between flex-col"
      >
       <div className="flex-row items-center">
          <div className="px-3 flex-grow">
            <div className="bg-black text-sm text-white flex-grow inline-block rounded-md px-3 py-1.5 mb-1">
              { item_type }
            </div>
            <div>
              { item_title }
            </div>
          </div>
          <div {...attributes} {...listeners} className={`cursor-grab p-2 ml-2 white rounded ${buttonVariants({ variant: 'outline' })}`}>
            &#x2630; {/* Unicode for a simple handle icon */}
          </div>
       </div>
      </Card>
    );
};

  
export default function SortableList ({ data , onSortableChange } : { data: any; onSortableChange: any; }) {
    // { id: 'item-1' , title: 'item1'  },
    const [items, setItems] = useState(data);
  
    const sensors = useSensors(useSensor(PointerSensor));
  
    const handleDragEnd = (event: { active: any; over: any; }) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = items.findIndex((item: { id: any; }) => item.id === active.id);
        const newIndex = items.findIndex((item: { id: any; }) => item.id === over.id);
       
        let sorted = arrayMove(items, oldIndex, newIndex);
        setItems( (prev: any) => sorted );
        onSortableChange( sorted );
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
            <div className="bg-white w-full">    
              { items.map((item: { id: Key | null | undefined; type: any; title: any; }) => (
                <SortableItem key={item.id} id={item.id} content={{
                    item_type: item.type, item_title: item.title
                 }} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
};  