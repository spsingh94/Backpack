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
import Generator from "../Generator";
import "./style.css";

export const DateContext = React.createContext();

const FromCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [toSelectedDate, setToSelectedDate] = useState(null);
  const [urlDate, setUrlDate] = useState();
  const [finalTo, setFinalTo] = useState(null);
  const [finalFrom, setFinalFrom] = useState(null);

  useEffect(() => {
    if (finalFrom != null && finalTo != null) {
      setUrlDate(finalFrom + "/" + finalTo);
    }
  }, [finalFrom, finalTo]);

  console.log(urlDate);

  console.log(finalTo);
  console.log(finalFrom);

  console.log(fromSelectedDate);
  console.log(toSelectedDate);

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

  const toHeader = () => {
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

  const toDays = () => {
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
                : isSameDay(day, fromSelectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onFromDateClick(cloneDay)}
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

  const toCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let today = startDate;
    let formattedDate = "";
    while (today <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(today, dateFormat);
        const cloneDay = today;
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(today, monthStart)
                ? "disabled"
                : isSameDay(today, toSelectedDate)
                ? "selected"
                : ""
            }`}
            key={today}
            onClick={() => onToDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        today = addDays(today, 1);
      }
      rows.push(
        <div className="row" key={today}>
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

  function onFromDateClick(day) {
    setFromSelectedDate(day);
    let fromStringer = JSON.stringify(day);
    let fromSlicer = fromStringer.slice(3, 11);
    let fromSeperator = fromSlicer.split(["-"]);
    const fromDataString = JSON.stringify(fromSeperator);
    let fromCleaner = fromDataString.replace(/{|}|[[\]]|,|"|"|/gi, "");
    setFinalFrom(fromCleaner);
  }

  function onToDateClick(today) {
    setToSelectedDate(today);
    let stringer = JSON.stringify(today);
    let slicer = stringer.slice(3, 11);
    let seperator = slicer.split(["-"]);
    const dataString = JSON.stringify(seperator);
    let cleaner = dataString.replace(/{|}|[[\]]|,|"|"|/gi, "");
    setFinalTo(cleaner);
  }

  // function dateFixer() {
  //   if (fromSelectedDate != null) {
  //     let fromStringer = JSON.stringify(fromSelectedDate);
  //     let fromSlicer = fromStringer.slice(3, 11);
  //     let fromSeperator = fromSlicer.split(["-"]);
  //     const fromDataString = JSON.stringify(fromSeperator);
  //     let fromCleaner = fromDataString.replace(/{|}|[[\]]|,|"|"|/gi, "");
  //     setFinalFrom(fromCleaner);
  //   }
  //   if (toSelectedDate != null) {
  //     let stringer = JSON.stringify(toSelectedDate);
  //     let slicer = stringer.slice(3, 11);
  //     let seperator = slicer.split(["-"]);
  //     const dataString = JSON.stringify(seperator);
  //     let cleaner = dataString.replace(/{|}|[[\]]|,|"|"|/gi, "");
  //     setFinalTo(cleaner);
  //   }
  // }

  return (
    <>
      <div className="calendar">
        <DateContext.Provider value={urlDate}>
          <Generator />
        </DateContext.Provider>
        <div>{header()}</div>
        <div>{days()}</div>
        <div>{cells()}</div>
      </div>
      <div className="calendar">
        <div>{toHeader()}</div>
        <div>{toDays()}</div>
        <div>{toCells()}</div>
      </div>
    </>
  );
};
export default FromCalendar;
