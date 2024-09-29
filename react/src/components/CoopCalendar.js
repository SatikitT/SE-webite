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
            // Format date as 'Mon 22 Sep'
            return day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
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

            {/* Calendar table */}
            <table className="calendar-table" style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                    {/* First row with time slots */}
                    <tr>
                        <td style={{ width: "100px", height: "50px", backgroundColor: "#f0f0f0" }}></td> {/* Empty top-left cell */}
                        {hours.map((hour, index) => (
                            <td key={index} style={{ height: "50px", backgroundColor: "#f0f0f0", border: "1px solid #ddd" }}>
                                {hour}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Rows with days and reservation slots */}
                    {getCurrentWeekDates().map((day, dayIndex) => (
                        <tr key={dayIndex}>
                            {/* Day header (left column) */}
                            <td style={{ width: "100px", height: "30px", backgroundColor: "#f0f0f0", textAlign: "center", border: "1px solid #ddd" }}>
                                {day}
                            </td>
                            {/* Reservation cells */}
                            {hours.map((hour, hourIndex) => (
                                <td
                                    key={`${dayIndex}-${hourIndex}`}
                                    style={{ height: "30px", border: "1px solid #ddd", cursor: "pointer" }}
                                    onClick={() => {
                                        // Add reservation handling logic here
                                        alert(`Reserved at ${day} ${hour}`);
                                    }}
                                >
                                    {/* You can add reservation events or interactivity here */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoopCalendar;
