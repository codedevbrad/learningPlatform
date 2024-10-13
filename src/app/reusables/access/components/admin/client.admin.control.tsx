'use client'
import { Button } from "@/components/ui/button"
import LoadingButton from '@/components/custom/buttons/button.plain'


// dislay options as sidebar or just in a row.

export default function AdminControlClient() {
    return (
      <div className="space-y-3">
        <p>You need to accept this student in first before you can message or start sessions.</p>
        <LoadingButton isLoading={ true } onClick={() => console.log('hey')}>Accept user</LoadingButton>
      </div>
    );
}