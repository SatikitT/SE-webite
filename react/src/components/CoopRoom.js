import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import CoopCalendar from "./CoopCalendar";

const CoopRoom = () => {
    const canvasRef = useRef(null); // Reference to the canvas

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
                new BABYLON.Vector3(0, 0, 0),
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

    return (
        <>
            <h2 style={{textAlign: "center" }}>Co-op room reservation</h2>
            <div style={{ justifyContent: "center", display: "flex" }}>
                <canvas ref={canvasRef} id="renderCanvas" style={{ width: "40%", height: "500px" }}></canvas>
            </div>
            <CoopCalendar />
        </>
    );
};

export default CoopRoom;
