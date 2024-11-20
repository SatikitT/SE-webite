import React, { useState, useEffect } from "react";
import "./calendar.css";

const Calendar = ({ searchParams, onDateChange }) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        if (selectedDay) {
            const selectedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                selectedDay + 1
            );

            const newDate = selectedDate.toISOString().split("T")[0];
            if (newDate !== searchParams.date) {
                onDateChange(newDate);
            }
        }
    }, [selectedDay, currentDate, searchParams.date, onDateChange]);

    const handleSelectDay = (day) => {
        setSelectedDay(day);
    };

    const returnToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDay(today.getDate());
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
        setSelectedDay(null); // Clear selection when changing months
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button
                    className="month-button prev"
                    onClick={() => changeMonth(-1)}
                    aria-label="Previous Month"
                >
                    {"<"}
                </button>
                <h3 className="date-header">
                    {`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                </h3>
                <button
                    className="month-button next"
                    onClick={() => changeMonth(1)}
                    aria-label="Next Month"
                >
                    {">"}
                </button>
            </div>

            <div className="calendar-weekdays">
                {weekdays.map((day, index) => (
                    <div key={index} className="weekday">
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-days">
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${
                            day === selectedDay ? "selected" : day ? "active" : "empty"
                        } ${day === new Date().getDate() && !selectedDay ? "current" : ""}`}
                        onClick={day ? () => handleSelectDay(day) : null}
                        title={day ? `${months[currentDate.getMonth()]} ${day}` : ""}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <button className="today-button" onClick={returnToToday}>
                Today
            </button>
        </div>
    );
};

export default Calendar;
