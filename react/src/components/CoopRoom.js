import React, { useState, useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "./Tabs.css";

const CoopRoom = () => {
    const canvasRef = useRef(null); // Reference to the canvas
    const [searchParams, setSearchParams] = useState({
        date: "",
        startTime: "",
        endTime: "",
        seats: ""
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true); // Create BabylonJS engine
        let lastPickedMesh = null;

        const createScene = () => {
            const scene = new BABYLON.Scene(engine);

            // Set background color to light grey
            scene.clearColor = new BABYLON.Color4(0.83, 0.83, 0.83, 1); // Equivalent to #D3D3D3

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
            light.intensity = 1;

            // Load room model
            BABYLON.SceneLoader.ImportMesh("", "/assets/", "kmitl.glb", scene, function (meshes) {
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

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const availableSpaces = [
        { name: "Hollywood (MAX 4)", seats: 4, times: ["7:00 am", "7:30 am", "8:00 am"] },
        { name: "Finn (MAX 2)", seats: 2, times: ["7:00 am", "7:30 am", "8:00 am"] },
        { name: "Kenobi (MAX 2)", seats: 2, times: ["7:00 am", "7:30 am", "8:00 am"] },
        { name: "Rey (MAX 2)", seats: 2, times: ["7:00 am", "7:30 am", "8:00 am"] },
        { name: "Kylo Ren (MAX 3)", seats: 3, times: ["7:00 am", "7:30 am", "8:00 am"] },
        { name: "Jar Jar (MAX 3)", seats: 3, times: ["7:00 am", "7:30 am", "8:00 am"] }
    ];

    return (
        <>
            <div style={{ height: "5vh" }}></div>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", height: "10vh" }}>
                <div style={{ width: "80%", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "flex-start" }}>
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
                </div>
            </div>
            <div style={{ display: "flex", height: "85vh" }}>

                <div style={{ width: "20%", padding: "20px", backgroundColor: "#f5f5f5", overflowY: "auto" }}>
                    <h3>Available Spaces</h3>
                    {availableSpaces.map((space, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <h4>{space.name}</h4>
                            <p>Seats: {space.seats}</p>
                            {space.times.map((time, i) => (
                                <button key={i} style={{ marginRight: "5px" }}>{time}</button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* BabylonJS Canvas */}
                <div style={{ width: "80%", justifyContent: "center", display: "flex" }}>
                    <canvas ref={canvasRef} id="renderCanvas" style={{ width: "100%", height: "85vh" }}></canvas>
                </div>
            </div>
        </>
    );
};

export default CoopRoom;
