'use client'
import Title from "@/app/reusables/content/title"
import React, { useState } from 'react'


export default function EditorPage ( ) {
    return (
        <main className=" bg-red-500">
            <Title title="Editor" variant="heading" />
            <div className="my-6">
                <iframe
                    style={{
                        width: "100%",
                        height: 900,
                        outline: "1px solid #252525",
                        border: 0,
                        borderRadius: 8,
                        marginBottom: 16,
                        zIndex: 100
                    }}
                    src="https://codesandbox.io/p/sandbox/react-new?file=/src/index.js"
                    ></iframe>
            </div>
        </main>
    )
}