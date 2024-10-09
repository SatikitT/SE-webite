import React, { useState, useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import UsePreventZoom from './UsePreventZoom'
import "@babylonjs/loaders/glTF";

const Map = () => {
    const canvasRef = useRef(null);
    const [hoverInfo, setHoverInfo] = useState({ name: "", x: 0, y: 0 });

    UsePreventZoom(false, false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true); // Create BabylonJS engine
        let previousBuilding = null;

        document.body.style.overflow = "hidden";

        const createScene = () => {
            const scene = new BABYLON.Scene(engine);

            // Set background color to light grey
            scene.clearColor = new BABYLON.Color4(0.83, 0.83, 0.83, 1); // Equivalent to #D3D3D3

            // Set up a camera (top-down view)
            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                -Math.PI / 2,
                Math.PI / 2.5 - 0.2,
                1200,
                new BABYLON.Vector3(-10, -10, 10),
                scene
            );
            camera.attachControl(canvas, true);

            // Add light
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1;

            BABYLON.SceneLoader.ImportMesh("", "/assets/", "kmitl.glb", scene, function (meshes) {
                const model = meshes[0];
                model.position = new BABYLON.Vector3(20, 0, 25);
            });

            // Update panel with mesh name on hover
            scene.onPointerObservable.add((pointerInfo) => {
                switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERMOVE:
                        const hit = scene.pick(scene.pointerX, scene.pointerY);
                        if (hit.pickedMesh && hit.pickedMesh.name !== previousBuilding) {
                            // Update hover info with mesh name and pointer position
                            setHoverInfo({
                                name: hit.pickedMesh.name,
                                x: pointerInfo.event.clientX,
                                y: pointerInfo.event.clientY
                            });
                            previousBuilding = hit.pickedMesh.name;
                        } else if (!hit.pickedMesh) {
                            // Clear hover info if not hovering over a mesh
                            setHoverInfo({ name: "", x: 0, y: 0 });
                            previousBuilding = null;
                        }
                        break;
                    default:
                        break;
                }
            });

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

    }, []);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <canvas ref={canvasRef} id="renderCanvas" style={{ width: "100%", height: "92.5vh", marginTop: "7.5vh" }}></canvas>

                {hoverInfo.name && (
                    <div
                        style={{
                            position: "absolute",
                            top: hoverInfo.y + "px",
                            left: hoverInfo.x + "px",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            pointerEvents: "none", // Ensure the panel does not block pointer events
                            transform: "translate(10px, 10px)", // Adjust for pointer offset
                            zIndex: 10 // Bring the panel above other elements
                        }}
                    >
                        {hoverInfo.name}
                    </div>
                )}
            </div>
        </>
    );
};

export default Map;
