import React, { useState } from "react";
import "./timetable.css";

const Timetable = ({ reservedSlots = [], onReserve }) => {
    const timeSlots = [];
    
    for (let i = 6; i <= 22; i++) {
        timeSlots.push(i);
    }

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

    return (
        <div className="timetable-container">
            <div className="row" style={{fontWeight: 'bold'}}>
                <div className="time-slot">Time</div>
                <div className="header-slot">Reservation</div>
            </div>
            <div className="scrollable-rows">
                {timeSlots.map((time) => (
                    <div className="row" key={time}>
                        <div className="time-slot">{time}:00</div>
                        <div className={`reservation-slot ${ reservedSlots.includes(time) ? "reserved" : "" } ${selectedTimes.includes(time) ? "selected" : ""}`}
                            onClick={() => toggleTimeSlot(time)}
                        >
                            {reservedSlots.includes(time) ? "Reserved" : selectedTimes.includes(time) ? "Selected" : "+ Add"}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleReserve} className="reserve-button">
                Reserve
            </button>
        </div>
    );
};

export default Timetable;
