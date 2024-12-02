'use client'
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectBoxProps = {
  items: { value: string; label: string }[] // Array of items to display
  placeholder?: string // Placeholder text for the select box
  selected: any;
}

export default function SelectBox({ items, placeholder = "Select an option" , selected }: SelectBoxProps) {
  const [search, setSearch] = React.useState("")
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null)

  // Filter items based on search input
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    selected ? selected( value ) : null;
  }

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="my-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border rounded p-2"
          />
        </div>
        <SelectGroup>
          <SelectLabel>Options</SelectLabel>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <SelectItem key={item.value} value={item.value} className="cursor-pointer">
                {item.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
