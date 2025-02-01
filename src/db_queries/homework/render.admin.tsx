'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Calendar from "@/components/custom/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

import LoadingButton from "@/components/custom/buttons/button.plain"
import { delay } from "@/app/utils/delay"

import RenderTopicsAsSelect from "../concepts/ui/topic.selection/topic.selection"

import {
  PushSheet, PushSheetTrigger, PushSheetHeader, PushSheetTitle,
  PushSheetDescription, PushSheetContent
} from "@/components/custom/sheetPush";

import EmptyState from "@/app/reusables/layouts/emptyState"

// Define Zod schema for form validation with date fields
const FormSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      label: z.string().min(1, "Task label is required"),
      dateSet: z.date(),
      dateToComplete: z.date(),
      subtasks: z.array(
        z.object({
          id: z.string(),
          label: z.string().min(1, "Subtask label is required"),
          completed: z.boolean().optional().default(false),
          framework: z.string().optional(),
        })
      ),
    })
  ).nonempty("At least one task is required"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AdminHomework() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tasks: [],
    },
  });

  const { fields: taskFields, append: appendTask, remove: removeTask } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const [isTaskModified, setIsTaskModified] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});

  const addTask = () => {
    appendTask({
      id: `task_${Date.now()}`,
      label: "",
      dateSet: new Date(),
      dateToComplete: new Date(),
      subtasks: [],
    });
  };

  const addSubtask = (taskIndex: number) => {
    const subtaskArray = form.getValues(`tasks.${taskIndex}.subtasks`) || [];
    const updatedSubtasks = [
      ...subtaskArray,
      { id: `subtask_${Date.now()}`, label: "", completed: false, framework: "" },
    ];
    form.setValue(`tasks.${taskIndex}.subtasks`, updatedSubtasks);
    handleTaskChange(taskIndex);
  };

  const removeSubtask = (taskIndex: number, subtaskIndex: number) => {
    const updatedSubtasks = form
      .getValues(`tasks.${taskIndex}.subtasks`)
      .filter((_, index) => index !== subtaskIndex);
    form.setValue(`tasks.${taskIndex}.subtasks`, updatedSubtasks);
    handleTaskChange(taskIndex);
  };

  const handleTaskChange = (taskIndex: number) => {
    setIsTaskModified((prevState) => ({
      ...prevState,
      [taskIndex]: true,
    }));
  };

  const saveTask = async (taskIndex: number) => {
    const isValid = await form.trigger(`tasks.${taskIndex}`);
    if (!isValid) {
      console.log("Validation failed for task:", taskIndex);
      return;
    }

    setIsSaving((prev) => ({ ...prev, [taskIndex]: true }));

    const taskData = form.getValues(`tasks.${taskIndex}`);
    console.log("Saved task data:", taskData);

    // Simulate a save delay
    await delay(2000);

    setIsTaskModified((prevState) => ({
      ...prevState,
      [taskIndex]: false,
    }));
    setIsSaving((prev) => ({ ...prev, [taskIndex]: false }));
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

          { taskFields.length == 0 &&
              <EmptyState>
                  <Button type="button" onClick={addTask}>
                    Add Task
                  </Button>
              </EmptyState>
          }

          <div className="flex-row flex-wrap">
            {taskFields.map((task, index) => (
              <div key={task.id} className="space-y-4 border p-5 m-2">
                <FormField
                  control={form.control}
                  name={`tasks.${index}.label`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="input py-2"
                          placeholder="Task name"
                          onChange={(e) => {
                            field.onChange(e);
                            handleTaskChange(index);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tasks.${index}.dateSet`}
                  render={({ field }) => (
                    <FormItem className="inline-flex w-full grow flex-col">
                      <FormLabel>Date Set</FormLabel>
                      <Calendar
                        className="w-full"
                        selectedDate={field.value}
                        onDateChange={(date) => {
                          field.onChange(date);
                          handleTaskChange(index);
                        }}
                        showFormattedDate={false}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tasks.${index}.dateToComplete`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date to Complete</FormLabel>
                      <Calendar
                        className="w-full"
                        selectedDate={field.value}
                        onDateChange={(date) => {
                          field.onChange(date);
                          handleTaskChange(index);
                        }}
                        minDate={form.getValues(`tasks.${index}.dateSet`)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PushSheet side="right">
                  <PushSheetTrigger className="w-full">
                    <Button variant="outline" className="w-full">
                      Manage {form.watch(`tasks.${index}.subtasks`)?.length || 0} Subtasks
                    </Button>
                  </PushSheetTrigger>
                  <PushSheetHeader>

                    <PushSheetTitle>Manage Subtasks</PushSheetTitle>

                    <PushSheetDescription>
                      Add, edit, or remove subtasks for the task.
                    </PushSheetDescription>

                    <Button type="button" onClick={() => addSubtask(index)} className="w-full my-2">
                      Add Subtask
                    </Button>
                  
                  </PushSheetHeader>


                    <div className="p-4 h-full overflow-y-auto mt-2">
                        <div className="space-y-4 mb-60">

                          <div className="space-y-5">
                            {form.watch(`tasks.${index}.subtasks`)?.map((subtask, subIndex) => (
                              <div
                                key={subtask.id}
                                className="flex flex-col items-center gap-2 border p-4 rounded-lg"
                              >
                      
                                <FormField
                                  control={form.control}
                                  name={`tasks.${index}.subtasks.${subIndex}.label`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Textarea
                                        className="w-full"
                                        {...field}
                                        placeholder="Subtask name"
                                        onChange={(e) => {
                                          field.onChange(e);
                                          handleTaskChange(index);
                                        }}
                                      />
                                    </FormControl>
                                  )}
                                />         

                                <Checkbox
                                  checked={form.getValues(`tasks.${index}.subtasks.${subIndex}.completed`)}
                                  onCheckedChange={(checked) => {
                                    form.setValue(`tasks.${index}.subtasks.${subIndex}.completed`, checked);
                                    handleTaskChange(index);
                                  }}
                                />
                                <RenderTopicsAsSelect
                                  chosenTopic={(topic) => {
                                    form.setValue(`tasks.${index}.subtasks.${subIndex}.framework`, topic);
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => removeSubtask(index, subIndex)}
                                >
                                  Delete
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                    </div>
                </PushSheet>

                <div className="flex-row justify-end items-center space-x-4">
                  <Button type="button" variant="secondary" onClick={() => removeTask(index)}>
                    Delete Task
                  </Button>
                  <LoadingButton
                    onClick={() => saveTask(index)}
                    isLoading={isSaving[index]}
                    className=""
                    disabled={!isTaskModified[index]}
                  >
                    Save Task
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>
        </form>
      </Form>
    </>
  );
}
