import React, { useState, useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import UsePreventZoom from './UsePreventZoom'
import "@babylonjs/loaders/glTF";

const Map = () => {
    const canvasRef = useRef(null);
    const [hoverInfo, setHoverInfo] = useState([]);
    const [sceneMeshes, setSceneMeshes] = useState([]);
    var ms = [];

    UsePreventZoom();

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true); // Create BabylonJS engine

        document.body.style.overflow = "hidden";

        const createScene = () => {
            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0.83, 0.83, 0.83, 1);

            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                -Math.PI / 2,
                Math.PI / 2.5 - 0.2,
                1200,
                new BABYLON.Vector3(-10, -10, 10),
                scene
            );
            camera.attachControl(canvas, true);

            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1;

            BABYLON.SceneLoader.ImportMesh("", "/assets/", "kmitl.glb", scene, function (meshes) {
                const model = meshes[0];
                model.position = new BABYLON.Vector3(20, 0, 25);
                ms = meshes;
                console.log(ms);
            });

            return scene;
        };

        const getBoundsForMeshImpl = function (mesh, delegate) {
            var temporaryVector3 = new BABYLON.Vector3();
            var minX = 1e10,
                minY = 1e10,
                maxX = -1e10,
                maxY = -1e10;

            var vertices = mesh.getBoundingInfo().boundingBox.vectorsWorld;

            for (var eachVertex of vertices) {
                delegate.setVector3(eachVertex, temporaryVector3);
                if (minX > temporaryVector3.x) minX = temporaryVector3.x;
                if (maxX < temporaryVector3.x) maxX = temporaryVector3.x;
                if (minY > temporaryVector3.y) minY = temporaryVector3.y;
                if (maxY < temporaryVector3.y) maxY = temporaryVector3.y;
            }

            return {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        };

        const getBoundsForMesh = function (mesh, scene, engine) {
            const viewport = scene.activeCamera.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight());
            const sceneTransformMatrix = scene.getTransformMatrix();
            const delegate = {
                setVector3: function (vertex, temporaryVector3) {
                    BABYLON.Vector3.ProjectToRef(vertex, BABYLON.Matrix.IdentityReadOnly, sceneTransformMatrix, viewport, temporaryVector3);
                }
            };

            return getBoundsForMeshImpl(mesh, delegate);
        };

        const scene = createScene();

        engine.runRenderLoop(() => {
            scene.render();

            const meshHoverInfo = ms
                .filter(mesh => /^Clickable_(.*)_primitive(.*)$/.exec(mesh.name)) // Only clickable meshes
                .map(mesh => {
                    const bounds = getBoundsForMesh(mesh, scene, engine);
                    return { name: /^Clickable_(.*)_primitive(.*)$/.exec(mesh.name)[1], x: bounds.x, y: bounds.y };
                });

            const uniqueHoverInfo = meshHoverInfo.reduce((acc, meshInfo) => {
                if (!acc.some(info => info.name === meshInfo.name)) {
                    acc.push(meshInfo);
                }
                return acc;
            }, []);

            setHoverInfo(prevInfo => {
                const isSame = prevInfo.length === uniqueHoverInfo.length &&
                    prevInfo.every((info, index) => info.name === uniqueHoverInfo[index].name && info.x === uniqueHoverInfo[index].x && info.y === uniqueHoverInfo[index].y);

                if (!isSame) {
                    return uniqueHoverInfo;
                }

                return prevInfo;
            });
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        return () => {
            document.body.style.overflow = "";
            engine.dispose();
            window.removeEventListener("resize", () => engine.resize());
        };

    }, [sceneMeshes]);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <canvas ref={canvasRef} id="renderCanvas" style={{ width: "100%", height: "92.5vh", marginTop: "7.5vh" }}></canvas>

                {/* Display the names of all clickable meshes at their positions */}
                {hoverInfo.map((meshInfo, i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            top: `${meshInfo.y}px`,
                            left: `${meshInfo.x}px`,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            pointerEvents: "none", // Ensure the panel does not block pointer events
                            zIndex: 10
                        }}
                    >
                        {meshInfo.name}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Map;
