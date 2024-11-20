import React, { useState } from "react";
import "./timetable.css";

const Timetable = ({ reservedSlots = [], onReserve, date = null }) => {
    const timeSlots = Array.from({ length: 17 }, (_, i) => i + 6); // Generate time slots from 6:00 to 22:00
    const [selectedTimes, setSelectedTimes] = useState([]);

    const toggleTimeSlot = (time) => {
        if (reservedSlots.includes(time)) return;
        setSelectedTimes((prevSelected) =>
            prevSelected.includes(time)
                ? prevSelected.filter((t) => t !== time)
                : [...prevSelected, time]
        );
    };

    const handleReserve = () => {
        if (selectedTimes.length > 0) {
            onReserve(selectedTimes);
            setSelectedTimes([]);
        } else {
            alert("Please select a time slot.");
        }
    };

    if (!date) {
        return <div className="no-date-message">Please select a date to view the timetable.</div>;
    }

    return (
        <div className="timetable-wrapper">
            <h2 className="timetable-header">{`Timetable for ${date}`}</h2>
            <div className="timetable">
                <div className="timetable-header-row">
                    <div className="time-slot-header">Time</div>
                    <div className="status-slot-header">Status</div>
                </div>
                <div className="timetable-body">
                    {timeSlots.map((time) => (
                        <div
                            key={time}
                            className={`timetable-row ${
                                reservedSlots.includes(time)
                                    ? "reserved"
                                    : selectedTimes.includes(time)
                                    ? "selected"
                                    : "available"
                            }`}
                            onClick={() => toggleTimeSlot(time)}
                        >
                            <div className="time-slot">{`${time}:00`}</div>
                            <div className="status-slot">
                                {reservedSlots.includes(time)
                                    ? "Reserved"
                                    : selectedTimes.includes(time)
                                    ? "Selected"
                                    : "Available"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="reserve-button" onClick={handleReserve}>
                Reserve Selected
            </button>
        </div>
    );
};

export default Timetable;
