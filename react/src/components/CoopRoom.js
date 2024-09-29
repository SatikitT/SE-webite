import React, { useState, useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import CoopCalendar from "./CoopCalendar";
import "./Tabs.css"; // Use the CSS provided below

const CoopRoom = () => {
    const canvasRef = useRef(null); // Reference to the canvas
    const [activeTab, setActiveTab] = useState("calendar"); // State to track the active tab

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true); // Create BabylonJS engine
        let lastPickedMesh = null;

        const createScene = () => {
            const scene = new BABYLON.Scene(engine);

            // Optional: Set transparent background if needed
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

            // Set up a camera (top-down view)
            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                -Math.PI / 2 - 3.14,
                Math.PI / 2.5 - 0.2 - 10,
                130,
                new BABYLON.Vector3(-10, -10, 10),
                scene
            );
            camera.attachControl(canvas, true);

            // Add light
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.7;

            // Load room model
            BABYLON.SceneLoader.ImportMesh("", "/assets/", "room.glb", scene, function (meshes) {
                const model = meshes[0];
                model.position = new BABYLON.Vector3(20, 0, 25);
            });

            // Handle mesh clicks
            scene.onPointerDown = () => {
                const hit = scene.pick(scene.pointerX, scene.pointerY);

                if (hit.pickedMesh) {
                    if (lastPickedMesh && lastPickedMesh !== hit.pickedMesh) {
                        lastPickedMesh.material.albedoColor = BABYLON.Color3.White();
                    }

                    hit.pickedMesh.material.albedoColor = BABYLON.Color3.Red();
                    lastPickedMesh = hit.pickedMesh;
                } else {
                    if (lastPickedMesh) {
                        lastPickedMesh.material.albedoColor = BABYLON.Color3.White();
                        lastPickedMesh = null;
                    }
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

        // Cleanup Babylon.js engine and event listeners when component unmounts
        return () => {
            engine.dispose();
            window.removeEventListener("resize", () => engine.resize());
        };
    }, []);

    // Mock data for the reservation table
    const reservations = [
        { day: "Monday", time: "10:00 AM", room: "101", user: "John Doe" },
        { day: "Tuesday", time: "2:00 PM", room: "102", user: "Jane Smith" },
        { day: "Wednesday", time: "1:00 PM", room: "103", user: "Mark Johnson" },
    ];

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Co-op Room Reservation</h2>
            <div style={{ justifyContent: "center", display: "flex", marginBottom: "20px" }}>
                <canvas ref={canvasRef} id="renderCanvas" style={{ width: "50%", height: "400px" }}></canvas>
            </div>

            {/* Tabs and Tab Content */}
            <div className="tabs-container" style={{ width: "80%", margin: "0 auto" }}>
                <div className="tabs">
                    <input
                        className="input"
                        type="radio"
                        id="tab-1"
                        checked={activeTab === "calendar"}
                        onChange={() => setActiveTab("calendar")}
                    />
                    <label className={`label ${activeTab === "calendar" ? "active" : ""}`} htmlFor="tab-1">
                        Calendar View
                    </label>

                    <input
                        className="input"
                        type="radio"
                        id="tab-2"
                        checked={activeTab === "table"}
                        onChange={() => setActiveTab("table")}
                    />
                    <label className={`label ${activeTab === "table" ? "active" : ""}`} htmlFor="tab-2">
                        Reservation Table
                    </label>
                </div>

                {/* Tab Content */}
                <div className="panel">
                    {activeTab === "calendar" ? (
                        <CoopCalendar />
                    ) : (
                        <div>
                            <h3>Reserved Information</h3>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Day</th>
                                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Time</th>
                                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Room Number</th>
                                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation, index) => (
                                        <tr key={index}>
                                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>{reservation.day}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>{reservation.time}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>{reservation.room}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>{reservation.user}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <br></br>
        </>
    );
};

export default CoopRoom;
