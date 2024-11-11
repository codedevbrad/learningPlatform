"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Calendar from "@/components/custom/calendar" 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import LoadingButton from "@/components/custom/buttons/button.plain"
import { delay } from "@/app/utils/delay"

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
        })
      ),
    })
  ).nonempty("At least one task is required"),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function AdminHomework() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tasks: [],
    },
  })

  const { fields: taskFields, append: appendTask, remove: removeTask } = useFieldArray({
    control: form.control,
    name: "tasks",
  })

  const [isTaskModified, setIsTaskModified] = useState<Record<string, boolean>>({})
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({})

  const addTask = () => {
    appendTask({
      id: `task_${Date.now()}`,
      label: "",
      dateSet: new Date(),
      dateToComplete: new Date(),
      subtasks: [],
    })
  }

  const addSubtask = (taskIndex: number) => {
    const subtaskArray = form.getValues(`tasks.${taskIndex}.subtasks`) || []
    const updatedSubtasks = [
      ...subtaskArray,
      { id: `subtask_${Date.now()}`, label: "", completed: false },
    ]
    form.setValue(`tasks.${taskIndex}.subtasks`, updatedSubtasks)
    handleTaskChange(taskIndex)
  }

  const removeSubtask = (taskIndex: number, subtaskIndex: number) => {
    const updatedSubtasks = form
      .getValues(`tasks.${taskIndex}.subtasks`)
      .filter((_, index) => index !== subtaskIndex)
    form.setValue(`tasks.${taskIndex}.subtasks`, updatedSubtasks)
    handleTaskChange(taskIndex)
  }

  const handleTaskChange = (taskIndex: number) => {
    setIsTaskModified((prevState) => ({
      ...prevState,
      [taskIndex]: true,
    }))
  }

  const saveTask = async (taskIndex: number) => {
    const isValid = await form.trigger(`tasks.${taskIndex}`)
    if (!isValid) {
      console.log("Validation failed for task:", taskIndex)
      return
    }

    setIsSaving((prev) => ({ ...prev, [taskIndex]: true }))

    const taskData = form.getValues(`tasks.${taskIndex}`)
    console.log("Saved task data:", taskData)

    // Simulate a save delay
    await delay(2000)

    setIsTaskModified((prevState) => ({
      ...prevState,
      [taskIndex]: false,
    }))
    setIsSaving((prev) => ({ ...prev, [taskIndex]: false }))
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <Button type="button" onClick={addTask}>
          Add Task
        </Button>
        <div className="flex-row flex-wrap space-x-4">
          {taskFields.map((task, index) => (
            <div key={task.id} className="space-y-4 border p-5">
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
                          field.onChange(e)
                          handleTaskChange(index)
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
                  <FormItem className="inline-flex w-full grow flex-col ">
                    <FormLabel>Date Set</FormLabel>
                    <Calendar
                      className="w-full"
                      selectedDate={field.value}
                      onDateChange={(date) => {
                        field.onChange(date)
                        handleTaskChange(index)
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
                        field.onChange(date)
                        handleTaskChange(index)
                      }}
                      minDate={form.getValues(`tasks.${index}.dateSet`)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Popover for all subtasks */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Manage Subtasks
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto mt-2" align="start">
                  <div className="grid gap-4 p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Subtasks</h4>
                      <Button type="button" onClick={() => addSubtask(index)}>
                        Add Subtask
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.watch(`tasks.${index}.subtasks`)?.map((subtask, subIndex) => (
                        <div key={subtask.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={form.getValues(`tasks.${index}.subtasks.${subIndex}.completed`)}
                            onCheckedChange={(checked) => {
                              form.setValue(`tasks.${index}.subtasks.${subIndex}.completed`, checked)
                              handleTaskChange(index)
                            }}
                          />
                          <FormField
                            control={form.control}
                            name={`tasks.${index}.subtasks.${subIndex}.label`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  className="w-[250px]"
                                  {...field}
                                  placeholder="Subtask name"
                                  onChange={(e) => {
                                    field.onChange(e)
                                    handleTaskChange(index)
                                  }}
                                />
                              </FormControl>
                            )}
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
                </PopoverContent>
              </Popover>

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
  )
}
