import React, { useState } from "react";

interface CalendarProps {
  onDateSelect: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("date"); // "date", "month", or "year"

  // Helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevious = () => {
    if (view === "year") {
      setCurrentDate(
        new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), 1)
      );
    } else if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
      );
    } else {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    }
  };

  const handleNext = () => {
    if (view === "year") {
      setCurrentDate(
        new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), 1)
      );
    } else if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
      );
    } else {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const formattedDate = `${selectedDate.getDate()} ${
      monthNames[selectedDate.getMonth()]
    } ${selectedDate.getFullYear()}`;
    onDateSelect(formattedDate);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setView("date");
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setView("month");
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
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

  const renderYears = () => {
    const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
    return (
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 10 }).map((_, index) => {
          const year = startYear + index;
          return (
            <button
              key={year}
              type="button"
              className="p-2 rounded-md text-xs font-medium hover:bg-blue-500 hover:text-white"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  };

  const renderMonths = () => {
    return (
      <div className="grid grid-cols-4 gap-2">
        {monthNames.map((month, index) => (
          <button
            key={month}
            type="button"
            className="p-2 rounded-md text-xs font-medium hover:bg-blue-500 hover:text-white"
            onClick={() => handleMonthSelect(index)}
          >
            {month.slice(0, 3)}
          </button>
        ))}
      </div>
    );
  };

  const renderDates = () => {
    return (
      <>
        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="font-bold text-gray-700 dark:text-gray-300"
            >
              {day}
            </div>
          ))}

          {/* Empty spaces for days before the start of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={index} />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
            const day = dayIndex + 1;
            return (
              <button
                type="button"
                key={day}
                className="h-10 w-10 rounded-md text-xs font-medium hover:bg-blue-500 hover:text-white"
                onClick={() => handleDateSelect(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="w-[90%] md:w-4/5 p-4 rounded-md shadow-custom dark:shadow-custom-dark bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className="px-2 py-1 text-xs font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handlePrevious}
        >
          &lt;
        </button>
        <span
          className="font-medium cursor-pointer"
          onClick={() => setView(view === "date" ? "month" : "year")}
        >
          {view === "date" &&
            `${
              monthNames[currentDate.getMonth()]
            } ${currentDate.getFullYear()}`}
          {view === "month" && currentDate.getFullYear()}
          {view === "year" && "Select Year"}
        </span>
        <button
          type="button"
          className="px-2 py-1 text-xs font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>

      {/* Calendar Body */}
      {view === "date" && renderDates()}
      {view === "month" && renderMonths()}
      {view === "year" && renderYears()}
    </div>
  );
};

export default Calendar;
