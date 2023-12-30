import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  isSameMonth,
  isSameDay,
  setMonth,
  setYear,
  getYear,
  isEqual,
  addYears,
  subYears,
} from "date-fns";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

interface DatePickerProps {
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const fadeOutToLeft = {
    transition: "opacity 0.3s ease-in-out, transform 0.5s ease-in-out",
    opacity: 0,
    transform: "translateX(-100%)",
  };

  const fadeOutToRight = {
    transition: "opacity 0.3s ease-in-out, transform 0.5s ease-in-out",
    opacity: 0,
    transform: "translateX(50%)",
  };

  const fadeIn = {
    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
    opacity: 1,
    transform: "translateX(0)",
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
  const [yearRangeStart, setYearRangeStart] = useState(getYear(new Date()) - 5);
  const [transitionStyle, setTransitionStyle] = useState(fadeIn);

  const confirmDate = () => {
    onChange(selectedDate ?? new Date());
    setShowCalendar(false);
  };

  const onCancel = () => {
    const today = new Date();
    setShowCalendar(false);
    switchToDayView();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const renderMonthPicker = () => {
    return (
      <>
        {renderHeader()}
        <ul className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base  focus:outline-none sm:text-sm">
          <div>
            {months.map((month, index) => (
              <li
                key={month}
                className="relative flex cursor-default select-none justify-between py-2 pl-3 pr-9 text-gray-900"
                onClick={() => {
                  setCurrentMonth(setMonth(currentMonth, index));
                  switchToDayView();
                }}
              >
                <span className="block truncate font-normal">{month}</span>
                {month === format(currentMonth, "MMMM") && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                    <Check className="h-6 w-6" />
                  </div>
                )}
              </li>
            ))}
          </div>
        </ul>
      </>
    );
  };
  const generateYears = () => {
    return Array.from({ length: 6 }, (_, index) => yearRangeStart + index);
  };

  const renderYearPicker = () => {
    const years = generateYears();

    return (
      <>
        {renderHeader()}
        <div className="flex justify-between p-2">
          <div
            onClick={() => setYearRangeStart(yearRangeStart - 5)}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </div>
          <div>
            {yearRangeStart} - {yearRangeStart + 5}
          </div>
          <div
            onClick={() => setYearRangeStart(yearRangeStart + 5)}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
        <ul className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base  focus:outline-none sm:text-sm">
          <div>
            {years.map((year) => (
              <li
                key={year}
                className="relative flex cursor-default select-none justify-between py-2 pl-3 pr-9 text-gray-900 hover:cursor-pointer "
                onClick={() => {
                  setCurrentMonth(setYear(currentMonth, year));
                  switchToDayView();
                }}
              >
                <span className="block truncate font-normal">{year}</span>
                {year === getYear(currentMonth) && (
                  <div className="flex text-primary ">
                    <Check className="h-6 w-6" />
                  </div>
                )}
              </li>
            ))}
          </div>
        </ul>
      </>
    );
  };

  const switchToMonthView = () => {
    setViewMode("months");
  };

  const switchToYearView = () => {
    setViewMode("years");
  };

  const switchToDayView = () => {
    setViewMode("days");
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center  justify-between px-2">
        <div className="flex w-full items-center justify-between">
          {viewMode !== "months" ? (
            <div onClick={prevMonth} className="cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-4 w-4"></div>
          )}
          {viewMode !== "months" ? (
            <span
              className="flex flex-row items-center gap-2 hover:cursor-pointer"
              onClick={switchToMonthView}
            >
              {format(currentMonth, "MMMM")}
              <ChevronDown className="h-4 w-4" />
            </span>
          ) : (
            <span
              className="flex flex-row items-center gap-2 hover:cursor-pointer"
              onClick={switchToDayView}
            >
              {format(currentMonth, "MMMM")}
              <ChevronUp className="h-4 w-4" />
            </span>
          )}
          {viewMode !== "months" ? (
            <div onClick={nextMonth} className="cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-4 w-4"></div>
          )}
        </div>
        <div className="flex w-full items-center  justify-between">
          {viewMode !== "years" ? (
            <div onClick={prevYear} className="cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-4 w-4"></div>
          )}
          {viewMode !== "years" ? (
            <span
              className="flex flex-row items-center gap-2 hover:cursor-pointer"
              onClick={switchToYearView}
            >
              {format(currentMonth, "yyyy")}
              <ChevronDown className="h-4 w-4" />
            </span>
          ) : (
            <span
              className="flex flex-row items-center gap-2 hover:cursor-pointer"
              onClick={switchToDayView}
            >
              {format(currentMonth, "yyyy")}
              <ChevronUp className="h-4 w-4" />
            </span>
          )}
          {viewMode !== "years" ? (
            <div onClick={nextYear} className="cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-4 w-4"></div>
          )}
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEE";
    const days = [];

    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className=" m-2 inline-flex w-6 items-center justify-center text-xs font-bold"
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }

    return <div className="flex justify-between  ">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
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
            key={day.toString()}
            className={`m-2 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${
              isSameMonth(day, monthStart)
                ? isEqual(day.toDateString(), new Date().toDateString())
                  ? "border border-primary text-black"
                  : "text-black"
                : "text-gray-400"
            } ${
              isSameDay(day, selectedDate ?? new Date())
                ? "bg-primary text-white"
                : ""
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            {formattedDate}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="flex justify-between ">
          {days}
        </div>,
      );
      days = [];
    }

    return <div className="flex flex-col">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const prevMonth = () => {
    setTransitionStyle(fadeOutToRight);
    setCurrentMonth(subMonths(currentMonth, 1));
    setTimeout(() => setTransitionStyle(fadeIn), 300); // Reset after animation
  };

  const nextMonth = () => {
    setTransitionStyle(fadeOutToLeft);
    setCurrentMonth(addMonths(currentMonth, 1));
    setTimeout(() => setTransitionStyle(fadeIn), 300); // Reset after animation
  };
  const nextYear = () => {
    setCurrentMonth(addYears(currentMonth, 1));
  };
  const prevYear = () => {
    setCurrentMonth(subYears(currentMonth, 1));
  };

  return (
    <div className="relative   ">
      <div className="relative group" onClick={() => setShowCalendar(!showCalendar)}>
        <input
          type="text"
          className={"bg-background w-full rounded-md border border-primary/20 p-2 shadow-sm  group-hover:bg-secondary/20 group-hover:cursor-pointer "}
          readOnly
          value={format(selectedDate ?? new Date(), "P")}
          placeholder="Select Date"
        />
        <div className="group-hover:bg-secondary/85 absolute inset-y-1.5 right-1 h-8 w-8 rounded-full  bg-secondary group-hover:cursor-pointer">
          <Calendar className="absolute inset-1 m-auto h-6  w-6 text-white group-hover:text-slate-200" />
        </div>
      </div>

      {showCalendar && (
        <div className="bg-background left-0 top-full z-50 mt-1 w-full max-w-sm rounded-lg border pt-2  ">
          {viewMode === "days" && (
            <>
              {renderHeader()}
              <div style={transitionStyle}>
                <div className="pt-2">{renderDays()}</div>
                {renderCells()}
              </div>
            </>
          )}
          {viewMode === "months" && (
            <div className="min-h-fit">{renderMonthPicker()}</div>
          )}
          {viewMode === "years" && (
            <div className="min-h-fit">{renderYearPicker()}</div>
          )}
          <div className="flex items-center justify-end space-x-4 p-2">
            <div className="flex gap-2">
              <button
                className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
              <button
                className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline"
                onClick={confirmDate}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
