import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./calendar";

export function DatePicker({ id, value, onChange }: {
    id?: string
    value?: Date
    onChange?: (date?: Date) => void
}) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="secondary"
                    data-empty={!value}
                    className="w-70 justify-start bg-input/50 text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode="single" selected={value} onSelect={onChange} />
            </PopoverContent>
        </Popover>
    )
}