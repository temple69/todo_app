import useTodoContext from "@/hooks/useTodoContext";
import { getCurrentDate } from "@/utils/helperFunctions";
import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | string;

const CalendarComponent = () => {
  const [value, onChange] = useState<Value>(new Date());
  const { filterByDateHandler
   } = useTodoContext();
  const handleOnChange = (value: Value) => {
    filterByDateHandler(value as string);
    onChange(value);
  }

  return (
    <div>
      <Calendar
        onChange={handleOnChange}
        value={value}
        tileClassName={`bg-red-500`}
        className={"overRideCalendar"}
    
      
      />
    </div>
  );
};

export default CalendarComponent;
