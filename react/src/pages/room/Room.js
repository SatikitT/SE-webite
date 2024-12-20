import React, { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../api";
import axios from "axios";

import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import Calendar from "../../components/calendar/Calendar";
import Timetable from "../../components/timetable/Timetable";
import "./room.css";

const CoopRoom = ({ username }) => {
    const canvasRef = useRef(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [reservedSlots, setReservedSlots] = useState([]);
    const [searchParams, setSearchParams] = useState({
        date: null,
    });

    // Function to fetch reservations based on room number and date
    const fetchReservations = async (roomNumber, date) => {
        try {
            const adjustedDate = new Date(date);
            adjustedDate.setDate(adjustedDate.getDate());
    
            // Format the adjusted date as needed (e.g., YYYY-MM-DD)
            const formattedDate = adjustedDate.toISOString().split("T")[0];
    
            const response = await axios.get(
                `${API_BASE_URL}/reservations/available-rooms/`,
                { params: { room_number: roomNumber, day: formattedDate } }
            );
            const reservedTimes = response.data.flatMap(reservation => reservation.time);
            setReservedSlots(reservedTimes);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };
    

    // Handle reservation logic
    const handleReserve = async (selectedSlots) => {
        if (!selectedRoom || !searchParams.date) {
            alert("Please select a room and a date.");
            return;
        }

        const overlap = selectedSlots.some(slot => reservedSlots.includes(slot));
        if (overlap) {
            alert("Some of the selected slots are already reserved.");
            return;
        }

        try {
            
            const reservationData = {
                room_number: selectedRoom,
                reserver: username,
                time: selectedSlots,
                day: searchParams.date,
            };

            await axios.post(`${API_BASE_URL}/reservations/`, reservationData);
            alert("Reservation successful!");
            fetchReservations(selectedRoom, searchParams.date);  // Refresh the reservations for the selected day
        } catch (error) {
            console.error("Error reserving slots:", error);
            alert("Failed to reserve the slots.");
        }
    };

    // Effect hook to fetch reservations when room or date changes
    useEffect(() => {
        if (selectedRoom && searchParams.date) {
            fetchReservations(selectedRoom, searchParams.date);  // Trigger fetching of reservations
        }
    }, [selectedRoom, searchParams.date]);  // Trigger this effect when either room or date changes

    // Handle date change from the calendar
    const handleDateChange = (date) => {
        if (date) {
            setSearchParams((prev) => ({ ...prev, date }));
        } else {
            setSearchParams((prev) => ({ ...prev, date: null }));
            setReservedSlots([]);  // Clear reserved slots if no date selected
        }
    };

    // Handle room selection from the 3D model
    const handleRoomSelect = (room) => {
        setSelectedRoom(room.name.substr(4));  // Assuming the room name has the format "Room 1"
    };

    // BABYLON.js scene setup
    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true);

        const createScene = () => {
            let lastPickedMesh = null;

            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0.83, 0.83, 0.83, 1);

            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                -Math.PI / 2 - 3.14,
                Math.PI / 2.5 - 0.2 - 10,
                130,
                new BABYLON.Vector3(-30, -10, -15),
                scene
            );
            camera.attachControl(canvas, true);

            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1;

            BABYLON.SceneLoader.ImportMesh("", "/assets/", "room.glb", scene);

            scene.onPointerDown = () => {
                const hit = scene.pick(scene.pointerX, scene.pointerY);

                if (hit.pickedMesh && hit.pickedMesh.name.includes("room")) {
                    if (lastPickedMesh && lastPickedMesh !== hit.pickedMesh) {
                        lastPickedMesh.material.albedoColor = BABYLON.Color3.White();
                    }

                    hit.pickedMesh.material.albedoColor = BABYLON.Color3.Red();
                    lastPickedMesh = hit.pickedMesh;
                    handleRoomSelect(hit.pickedMesh);
                } else {
                    if (lastPickedMesh) {
                        lastPickedMesh.material.albedoColor = BABYLON.Color3.White();
                    }
                    lastPickedMesh = null;
                    setSelectedRoom(null);
                }
            };

            return scene;
        };

        const scene = createScene();

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        return () => {
            engine.dispose();
            window.removeEventListener("resize", () => engine.resize());
        };
    }, []);  // Run only once on component mount

    return (
        <div style={{ display: "flex" }}>
            <canvas
                ref={canvasRef}
                id="renderCanvas"
                style={{
                    outline: "none",
                    width: "100%",
                    height: "92.5vh",
                    marginTop: "7.5vh",
                    position: "fixed",
                    right: selectedRoom ? "20%" : "0%",
                    transition: "0.5s",
                }}
            ></canvas>
            <div
                className="sidePanel"
                style={{ width: selectedRoom ? "40%" : "0", marginTop: "7.5vh" }}
            >
                <h1>{selectedRoom ? `Room ${selectedRoom}` : ""}</h1>
                <Calendar onDateChange={handleDateChange} searchParams={searchParams} />
                <Timetable 
                    reservedSlots={reservedSlots} 
                    onReserve={handleReserve} 
                    date={searchParams.date}
                />
            </div>
        </div>
    );
};

export default CoopRoom;
