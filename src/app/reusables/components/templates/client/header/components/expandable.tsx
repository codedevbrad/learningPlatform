"use client"
import React, { useEffect , useState , useRef } from "react"
import Title from "@/app/reusables/content/title"
import { PushSheet, PushSheetTrigger, PushSheetHeader, PushSheetTitle, PushSheetDescription } from "@/components/custom/sheetPush"

import { FaRegFile } from "react-icons/fa"
import { FaBookOpenReader } from "react-icons/fa6"
import Editor from "@/app/reusables/usables/editorJs/index"
import ResourceComponent, { ResourceType } from "@/app/reusables/components/resources"
import FeatureDisabled from "@/db_queries/user/ui/protection.disabled"

// Interface for the notes prop in Notes component
interface NotesProps {
  notes: {
    state: any; // You can replace `any` with a more specific type if you know the structure of the state
    updateNotesToDb: (data: any) => void; // You can adjust `any` to match your data type
  };
}

// Interface for the resources prop in Resources component
interface ResourcesProps {
  resources: Array<ResourceType>;
  displayResource: (url: string) => void;
}

// Interface for the PageWorkExtraExpandable component
interface PageWorkExtraExpandableProps {
  resources: Array<ResourceType>;
  notes: any;
  triggerResourceVideoDisplay: (url: string) => void;
}


// Notes Component
function Notes({ notes }: NotesProps) {
  const { state, updateNotesToDb } = notes;
  const [data, setData] = useState(state);

  const saveDataToState = (noteObj: any) => {
    console.log("saving notes to state", noteObj);
    setData(noteObj);
  };

  const saveEditorDataOnClose = (state: boolean) => {
    if (!state) {
      updateNotesToDb(data);
    }
  };

  const saveEditorDataOnBtnClick = () => {
    console.log(data, "clicked to save editor...");
    updateNotesToDb(data);
  };

  return (
    <PushSheet side="right" className="">
      <PushSheetTrigger className="" isOpen={undefined} onToggle={undefined}>
        <div className="border p-5 m-4 rounded-md bg-white">
          <FaBookOpenReader />
        </div>
      </PushSheetTrigger>
      <PushSheetHeader className={undefined}>
        <PushSheetTitle className={undefined}>
          <Title variant="subheading1" title="Notes you've made for this course" noMargin={false} />
        </PushSheetTitle>
        <PushSheetDescription className={undefined}>
          Here is the description of the navigation menu.
        </PushSheetDescription>
      </PushSheetHeader>

      <div className="flex flex-col">
        <div className="p-4 grow flex flex-col text-black overflow-auto">
          <Editor notesMode={true} inReadMode={false} data={data} onSaveToState={saveDataToState} saveByButton={saveEditorDataOnBtnClick} />
        </div>
      </div>
    </PushSheet>
  );
}

// Resources Component
function Resources({ resources, displayResource }: ResourcesProps) {
  console.log("resources: ", resources);

  return (
    <PushSheet side="right" className={"z-50"}>
      <PushSheetTrigger className="" isOpen={undefined} onToggle={undefined}>
        <div className="border p-5 m-4 rounded-md bg-white">
          <FaRegFile />
        </div>
      </PushSheetTrigger>
      <PushSheetHeader className={undefined}>
        <PushSheetTitle className={undefined}>
          <Title variant="subheading1" title="Resources for this course" noMargin={false} />
        </PushSheetTitle>
      </PushSheetHeader>
      <PushSheetDescription className={undefined}>
        {resources.map((resource, index) => (
          <div key={`resource_${index}`} onClick={() => displayResource(resource.url)}>
            <ResourceComponent viewType={"embedded"} resource={resource} />
          </div>
        ))}
      </PushSheetDescription>
    </PushSheet>
  );
}

// PageWorkExtraExpandable Component
export default function PageWorkExtraExpandable({ resources, notes, triggerResourceVideoDisplay }: PageWorkExtraExpandableProps) {
  return (
    <div className="flex justify-center items-center">
      <FeatureDisabled explanation={"write notes on this topic for your learning journey."} displayTipType="tooltip">
        <Notes notes={notes} />
      </FeatureDisabled>
      <Resources resources={resources} displayResource={triggerResourceVideoDisplay} />
    </div>
  );
}