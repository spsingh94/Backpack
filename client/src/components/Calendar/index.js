import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";

import "./style.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [urlDate, setUrlDate] = useState();
  const [otherDate, setOtherDate] = useState();

  useEffect(() => {
    if (otherDate != null) {
      const dateString = JSON.stringify(otherDate);
      let cleaner = dateString.replace(/{|}|[[\]]|,|"|"|/gi, "");
      setUrlDate(cleaner);
    }
  }, [otherDate]);

  console.log(otherDate);

  console.log(urlDate);

  console.log(selectedDate);

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };
  const days = () => {
    const dateFormat = "ddd";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  //   const onDateClick = (day) => {
  //   };

  function onDateClick(day) {
    // let selectedChange = day;
    //   setOtherDate(stringer);
    setSelectedDate(day);
    dateFixer();
  }

  function dateFixer() {
    let stringer = JSON.stringify(selectedDate);
    let slicer = stringer.slice(1, 11);
    let seperator = slicer.split(["-"]);
    setOtherDate([seperator[0], seperator[2], seperator[1]]);
  }

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  );
};
export default Calendar;
