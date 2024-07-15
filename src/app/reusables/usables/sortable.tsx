import { Key, useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { buttonVariants } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Title from "../content/title";

const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const { item_type, item_title } = content;

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
            {item_type}
          </div>
          <div>{item_title}</div>
        </div>
        <div
          {...attributes}
          {...listeners}
          className={`cursor-grab p-2 ml-2 white rounded ${buttonVariants({
            variant: "outline",
          })}`}
        >
          &#x2630; {/* Unicode for a simple handle icon */}
        </div>
      </div>
    </Card>
  );
};


const Sortable = ({ data, onSortableChange }) => {
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      let sorted = arrayMove(items, oldIndex, newIndex);
      setItems(sorted);
      onSortableChange(sorted);
    }
  };

  return (
    <div className="overflow-y-scroll px-3 scroll h-[240px]">
      <div className="bg-white flex justify-center flex-col">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="bg-white w-full">
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  content={{
                    item_type: item.type,
                    item_title: item.title,
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

const DraggablePopoverContent = ({ closePopover, children, sortTitle }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    });
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 50,
        backgroundColor: "white",
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "400px",
      }}
    >
      <div className="flex flex-row items-center pb-4">
        <div className="w-full pl-3">
          <Title title={`Sort your ${sortTitle}`} variant="subheading1" noMargin={false} />
        </div>
        <div className="border border-gray-200 px-2 py-1 rounded-md hover:bg-gray-100 cursor-grab" onMouseDown={onMouseDown} >
          <span> &#x2630; </span>
        </div>
        <div className="border ml-3 border-gray-200 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer" onClick={ closePopover }>
          <span> close </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default function SortableList({ data, onSortableChange, sortTitle = 'blocks' }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <>
      <div className={`${buttonVariants({ variant: "outline" })} cursor-pointer relative`} 
             onClick={() => setDropdownOpen((prev) => !prev)}
      >
        Organise
      </div>
      {isDropdownOpen && (
        <DraggablePopoverContent sortTitle={sortTitle} closePopover={ () => setDropdownOpen( false ) }>
          <Sortable data={data} onSortableChange={onSortableChange} />
        </DraggablePopoverContent>
      )}
    </>
  );
}
