import React, { useState } from "react";

const CoopCalendar = () => {
    // Array of time slots for each hour from 12:00 AM to 11:00 PM
    const hours = [...Array(24).keys()].map(i => {
        const hour = i % 12 || 12; // 12-hour format
        const amPm = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${amPm}`;
    });

    // Array of days, starting from Sunday
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // State for controlling the week navigation
    const [weekOffset, setWeekOffset] = useState(0);

    // Function to get the current week's dates based on the week offset
    const getCurrentWeekDates = () => {
        const current = new Date();
        const first = current.getDate() - current.getDay() + weekOffset * 7; // Get Sunday of the current week
        return [...Array(7).keys()].map(i => {
            const day = new Date(current.setDate(first + i));
            return day.toDateString();
        });
    };

    return (
        <div className="calendar-container" style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
            <h2>Reservation Calendar</h2>

            {/* Control buttons for week navigation */}
            <div className="control-buttons" style={{ marginBottom: "20px" }}>
                <button onClick={() => setWeekOffset(weekOffset - 1)}>Previous Week</button>
                <button onClick={() => setWeekOffset(weekOffset + 1)}>Next Week</button>
            </div>

            {/* Calendar grid */}
            <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "1px", border: "1px solid #ddd" }}>
                {/* First row - Days of the week */}
                <div className="empty-cell"></div>
                {getCurrentWeekDates().map((day, index) => (
                    <div key={index} className="day-header" style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
                        {days[index]} <br /> {day}
                    </div>
                ))}

                {/* Time slots and grid cells for reservations */}
                {hours.map((hour, hourIndex) => (
                    <React.Fragment key={hourIndex}>
                        {/* First column - Time Slots */}
                        <div className="time-slot-header" style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
                            {hour}
                        </div>

                        {/* Reservation cells for each day */}
                        {days.map((day, dayIndex) => (
                            <div key={`${dayIndex}-${hourIndex}`} className="time-slot" style={{ border: "1px solid #ddd", height: "40px" }}>
                                {/* You can add reservation events or interactivity here */}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CoopCalendar;
