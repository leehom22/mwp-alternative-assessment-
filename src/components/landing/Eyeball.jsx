import React, { useEffect } from "react";
import { Suspense, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";


const EYEBALL_MODEL_PATH = "./robot_eyes_low_poly_4k_texture.glb";

const MAX_YAW = 0.5;
const MAX_PITCH = 0.35;

const TRACKING_SPEED = 6;

class ModelErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Eyeball model failed to load:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}

/*  Placeholder shown while the GLB is loading or if it fails to load */
function EyeballPlaceholder({ tone = "#888888" }) {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={tone} wireframe />
        </mesh>
    );
}

/*  The actual eyeball model, with mouse-following rotation           */
function EyeballModel({ onLoaded }) {
    const groupRef = useRef();
    const { scene } = useGLTF(EYEBALL_MODEL_PATH);

    // Enable shadow casting on the loaded meshes, once, on mount.
    const didInit = useRef(false);
    if (!didInit.current) {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        didInit.current = true;
        onLoaded?.();
    }

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const { pointer } = state;
        const targetYaw = pointer.x * MAX_YAW;
        const targetPitch = -pointer.y * MAX_PITCH;

        // Frame-rate independent easing toward the target rotation
        const t = 1 - Math.pow(0.001, delta * TRACKING_SPEED);
        groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * t;
        groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * t;
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={2.5} />
        </group>
    );
}

/*  Scene lighting — key + fill + rim, plus soft ambient fill light   */
function EyeballLighting() {
    return (
        <>
            {/* Soft overall fill so no side of the eye goes fully black */}
            <ambientLight intensity={0.35} />

            {/* Key light — casts the primary shadow, gives form/definition */}
            <directionalLight
                position={[3, 4, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={20}
                shadow-camera-left={-2}
                shadow-camera-right={2}
                shadow-camera-top={2}
                shadow-camera-bottom={-2}
            />

            <pointLight position={[-3, 2, -4]} intensity={0.6} color="#8ab4ff" />

            <pointLight position={[0, 1, 3]} intensity={0.4} color="#ffffff" />
        </>
    );
}


export default function Eyeball({ className, style }) {
    const [isReady, setIsReady] = useState(false);

    const handleLoaded = useCallback(() => setIsReady(true), []);

    return (
        <div className={className} style={{ width: "100%", height: "100%", ...style }}>
            <Canvas
                shadows
                camera={{ position: [0, 0, 3], fov: 30 }}
                dpr={[1, 2]} // cap device pixel ratio for perf on high-DPI screens
                gl={{ antialias: true }}
            >
                <EyeballLighting />

                <ModelErrorBoundary fallback={<EyeballPlaceholder tone="#cc4444" />}>
                    <Suspense fallback={<EyeballPlaceholder tone="#888888" />}>
                        <EyeballModel onLoaded={handleLoaded} />
                    </Suspense>
                </ModelErrorBoundary>

                <Environment preset="studio" />
            </Canvas>

            {!isReady && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        color: "#888",
                        fontSize: "0.85rem",
                    }}
                >
                    Loading eyeball…
                </div>
            )}
        </div>
    );
}

useGLTF.preload(EYEBALL_MODEL_PATH);