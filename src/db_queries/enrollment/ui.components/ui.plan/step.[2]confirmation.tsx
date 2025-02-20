'use client'
import { useEffect } from "react"

export default function ConfirmationStep() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload()
    }, 3000 );
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-xl font-semibold mb-2">Thank you!</h2>
      <p>Your subscription has been upgraded successfully.</p>
    </div>
  )
}
