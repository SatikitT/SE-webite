import React, { useState, useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { API_BASE_URL } from '../api';
import axios from "axios";  // Import axios to communicate with the backend

const CoopRoom = ({ username }) => {
    const canvasRef = useRef(null);
    const [searchParams, setSearchParams] = useState({
        date: "",
        startTime: "",
        endTime: "",
        seats: ""
    });
    const [availableSpaces, setAvailableSpaces] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null); // Track selected room for reservation
    const [roomMeshes, setRoomMeshes] = useState({}); // Store room mesh references

    // Fetch available rooms based on search parameters
    const fetchAvailableSpaces = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/reservations/available-rooms/?day=${searchParams.date}&start_time=${searchParams.startTime}&end_time=${searchParams.endTime}`);
            setAvailableSpaces(response.data);
        } catch (error) {
            console.error("Error fetching available rooms:", error);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true); // Create BabylonJS engine

        const createScene = () => {
            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0.83, 0.83, 0.83, 1); // Light grey background

            // Set up a camera (top-down view)
            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                -Math.PI / 2 - 3.14,
                Math.PI / 2.5 - 0.2 - 10,
                130,
                new BABYLON.Vector3(-30, -10, -15),
                scene
            );
            camera.attachControl(canvas, true);

            // Add light
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1;

            // Load the room model and identify each room mesh
            BABYLON.SceneLoader.ImportMesh("", "/assets/", "room.glb", scene, function (meshes) {
                const roomMeshMap = {
                    1: meshes[1],
                    2: meshes[2],
                    3: meshes[3],
                    4: meshes[4],
                    5: meshes[5]

                };
                setRoomMeshes(roomMeshMap);
                updateMeshColors(roomMeshMap);
            });

            return scene;
        };

        const updateMeshColors = (roomMeshMap) => {
            if (availableSpaces.length > 0)
                Object.values(roomMeshMap).forEach(mesh => {
                    mesh.material.albedoColor = BABYLON.Color3.Red();
                });

            availableSpaces.forEach(space => {
                const mesh = roomMeshMap[space.room_number];
                if (mesh) {
                    mesh.material.albedoColor = BABYLON.Color3.Green();
                }
            });
        };

        const scene = createScene();

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        // Cleanup Babylon.js engine and event listeners when component unmounts
        return () => {
            engine.dispose();
            window.removeEventListener("resize", () => engine.resize());
        };
    }, [availableSpaces]); // Re-render Babylon scene when available spaces change

    // Handle user input changes
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    // Handle room reservation
    const handleReserveRoom = async (room_number) => {
        console.log(room_number);
        try {
            const reservationData = {
                room_number: room_number,
                reserver: username, // Replace with actual username from logged-in user
                time_start: searchParams.startTime,
                time_end: searchParams.endTime,
                day: searchParams.date
            };
            await axios.post(`${API_BASE_URL}/reservations/`, reservationData);
            alert(`Room ${room_number} has been reserved successfully!`);
        } catch (error) {
            console.error("Error reserving room:", error);
            alert("Failed to reserve the room.");
        }
    };

    return (
        <>
            <div style={{ height: "7.5vh" }}></div>
            <div style={{ display: "flex", justifyContent: "center", height: "7.5vh", width: "80%", display: "flex", flexWrap: "wrap", gap: "20px"}}>
                <label style={{ display: "flex", alignItems: "center" }}>
                    Day:
                    <input type="date" name="date" value={searchParams.date} onChange={handleSearchChange} style={{ marginLeft: "10px" }} />
                </label>
                <label style={{ display: "flex", alignItems: "center", width: "200px" }}>
                    Start&nbsp;time:
                    <input type="time" name="startTime" value={searchParams.startTime} onChange={handleSearchChange} style={{ marginLeft: "10px" }} />
                </label>
                <label style={{ display: "flex", alignItems: "center" }}>
                    End&nbsp;time:
                    <input type="time" name="endTime" value={searchParams.endTime} onChange={handleSearchChange} style={{ marginLeft: "10px" }} />
                </label>
                <label style={{ display: "flex", alignItems: "center" }}>
                    Seats:
                    <input type="number" name="seats" value={searchParams.seats} onChange={handleSearchChange} style={{ marginLeft: "10px" }} />
                </label>
                <button onClick={fetchAvailableSpaces} style={{ marginTop: "auto", marginBottom: "auto", height: "20px" }}>Check Availability</button>
            </div>
            <div style={{ display: "flex", height: "85vh" }}>
                <div style={{ width: "20%", paddingLeft: "20px", backgroundColor: "#f5f5f5", overflowY: "auto" }}>
                    <h3>Available Spaces</h3>
                    {availableSpaces.map((space, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <h4>{space.room_number}</h4>
                            <p>Seats: {space.seats}</p>
                            <button onClick={() => handleReserveRoom(space.room_number)}>Reserve</button>
                        </div>
                    ))}
                </div>

                <div style={{ width: "80%", justifyContent: "center", display: "flex" }}>
                    <canvas ref={canvasRef} id="renderCanvas" style={{ width: "100%" }}></canvas>
                </div>
            </div>
        </>
    );
};

export default CoopRoom;
