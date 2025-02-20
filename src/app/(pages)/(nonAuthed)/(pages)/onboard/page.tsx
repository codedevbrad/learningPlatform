"use client"

import React, { useState, FormEvent } from "react"
import * as z from "zod"
import useSWRMutation from "swr/mutation"
import { createInterestedCapture } from "@/db_queries/tutoring/queries/db.setup"

// shadcn components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const captureSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
})

async function captureFetcher(
  key: string,
  { arg }: { arg: { name: string; email: string } }
) {
  return await createInterestedCapture(arg)
}

export default function InterestedCapturePage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const { trigger, isMutating } = useSWRMutation("capture", captureFetcher)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")?.toString() || ""
    const email = formData.get("email")?.toString() || ""

    try {
      captureSchema.parse({ name, email })
    } catch (err: any) {
      const firstIssue = err?.issues?.[0]?.message || "Validation error."
      setErrorMessage(firstIssue)
      return
    }

    try {
      await trigger({ name, email })
      setSubmittedEmail(email)
      setSuccess(true)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
  }

  // 1) Show success view if form is successfully submitted
  if (success) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Thanks for your interest. We’ll send an email to{" "}
              <span className="font-semibold">{submittedEmail}</span> and get in
              touch soon!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 2) Otherwise, show the form
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Express Your Interest</CardTitle>
          <CardDescription className="pt-3 text-md">
            Interested in joining the bootcamp? Send in your request, and we'll
            arrange a free 1-1 session to talk 👍
          </CardDescription>
        </CardHeader>

        <CardContent>

          {errorMessage && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="font-normal mt-1 w-full rounded border border-gray-300 p-2"
                />
              </label>
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="font-normal mt-1 w-full rounded border border-gray-300 p-2"
                />
              </label>
            </div>

            <CardFooter className="p-0 mt-4">
              <Button type="submit" disabled={isMutating} className="w-full">
                {isMutating ? "Sending..." : "Express Interest"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
