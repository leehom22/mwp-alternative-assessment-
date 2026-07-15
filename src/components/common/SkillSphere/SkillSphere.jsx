import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Edges, Line } from "@react-three/drei";

// Add a `model` field per member: "unity" | "react" | "gcp" | "opengl"
const MEMBER_CONFIG = {
    "Ling Lee Hom": {
        model: "opengl",
        type: "crystal",
        color: "#3cb8cd",
        emissive: "#003344"
    },
    "Darshni": {
        model: "gcp",
        type: "metal",
        color: "#8b07ff",
        emissive: "#61488a"
    },
    "Nicholas Yek Ei Zhe": {
        model: "unity",
        type: "metal",
        color: "#2563eb",
        emissive: "#001133"
    },
    "Lee Xuan Ying": {
        model: "react",
        type: "crystal",
        color: "#ff3e82",
        emissive: "#761d59"
    }
};

// Shared material — same logic as the original sphere, reused across all models
function SkillMaterial({ config, active }) {
    if (config.type === "metal") {
        return (
            <meshStandardMaterial
                color={config.color}
                metalness={1}
                roughness={0.15}
                emissive={config.emissive}
                emissiveIntensity={0.5}
            />
        );
    }
    return (
        <meshPhysicalMaterial
            color={config.color}
            metalness={0.2}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.05}
            emissive={config.emissive}
            emissiveIntensity={active ? 2 : 0.5}
        />
    );
}

/* ---------- UNITY3D — crisp-edged cube, corner accent nodes ---------- */
function UnityModel({ config, active }) {
    const ref = useRef();
    const corners = [
        [-0.31, -0.31, -0.31], [0.31, -0.31, -0.31], [0.31, 0.31, -0.31], [-0.31, 0.31, -0.31],
        [-0.31, -0.31, 0.31], [0.31, -0.31, 0.31], [0.31, 0.31, 0.31], [-0.31, 0.31, 0.31]
    ];

    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.3;
    });

    return (
        <group ref={ref}>
            <mesh>
                <boxGeometry args={[0.62, 0.62, 0.62]} />
                <SkillMaterial config={config} active={active} />
                <Edges color="white" />
            </mesh>
            {/* accent nodes at each vertex, echoing the wireframe-cube reference */}
            {corners.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.035, 12, 12]} />
                    <meshStandardMaterial
                        color="#ffb84d"
                        emissive="#ff9900"
                        emissiveIntensity={1.2}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ---------- REACT.JS — atom rings with orbiting electrons ---------- */
function ReactModel({ config, active }) {
    const groupRef = useRef();
    const electronRefs = [useRef(), useRef(), useRef()];
    const ringRotations = [0, Math.PI / 3, (2 * Math.PI) / 3]; // 60° apart, like the logo

    useFrame((state, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.25;
        const t = state.clock.elapsedTime;
        electronRefs.forEach((ref, i) => {
            if (!ref.current) return;
            const angle = t * 1.4 + (i * Math.PI * 2) / 3;
            ref.current.position.set(Math.cos(angle) * 0.55, Math.sin(angle) * 0.55 * 0.42, 0);
        });
    });

    return (
        <group ref={groupRef}>
            {/* nucleus */}
            <mesh>
                <sphereGeometry args={[0.15, 32, 32]} />
                <SkillMaterial config={config} active={active} />
            </mesh>

            {/* three elliptical orbit rings, tilted like the React logo */}
            {ringRotations.map((rot, i) => (
                <group key={i} rotation={[Math.PI / 2.6, 0, rot]}>
                    <mesh scale={[1, 0.42, 1]}>
                        <torusGeometry args={[0.55, 0.02, 16, 100]} />
                        <meshStandardMaterial
                            color={config.color}
                            emissive={config.emissive}
                            emissiveIntensity={0.6}
                            metalness={0.3}
                            roughness={0.3}
                            transparent
                            opacity={0.85}
                        />
                    </mesh>
                    <mesh ref={electronRefs[i]}>
                        <sphereGeometry args={[0.045, 16, 16]} />
                        <meshStandardMaterial
                            color="#ffb84d"
                            emissive="#ff9900"
                            emissiveIntensity={1.2}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/* ---------- GOOGLE CLOUD PLATFORM — hub-and-spoke node network ---------- */
function GcpModel({ config, active }) {
    const groupRef = useRef();
    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
    });

    const nodes = [
        [0, 0.34, 0],
        [0.4, -0.1, 0.15],
        [-0.4, -0.1, -0.15],
        [0, -0.12, 0.42],
        [0, -0.12, -0.42]
    ];

    return (
        <group ref={groupRef}>
            {/* central hub */}
            <mesh>
                <octahedronGeometry args={[0.2, 0]} />
                <SkillMaterial config={config} active={active} />
                <Edges color="white" />
            </mesh>

            {/* peripheral nodes + connecting struts, echoing the pipeline diagram */}
            {nodes.map((pos, i) => (
                <group key={i}>
                    <Line
                        points={[[0, 0, 0], pos]}
                        color="white"
                        lineWidth={1}
                        transparent
                        opacity={0.35}
                    />
                    <mesh position={pos}>
                        <octahedronGeometry args={[0.1, 0]} />
                        <meshStandardMaterial
                            color={config.color}
                            emissive={config.emissive}
                            emissiveIntensity={0.8}
                            metalness={0.6}
                            roughness={0.2}
                        />
                        <Edges color="#ffb84d" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/* ---------- OPENGL — torus knot with a faint wireframe "ghost" shell ---------- */
function OpenGlModel({ config, active }) {
    const ref = useRef();
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.y += delta * 0.3;
        }
    });
    return (
        <group ref={ref}>
            <mesh>
                <torusKnotGeometry args={[0.3, 0.095, 200, 24]} />
                <SkillMaterial config={config} active={active} />
            </mesh>
            <mesh scale={1.05}>
                <torusKnotGeometry args={[0.3, 0.095, 60, 8]} />
                <meshBasicMaterial color="white" wireframe transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

const MODEL_COMPONENTS = {
    unity: UnityModel,
    react: ReactModel,
    gcp: GcpModel,
    opengl: OpenGlModel
};

function SkillSphere({ member, active }) {
    const config = MEMBER_CONFIG[member.name];
    const ModelComponent = MODEL_COMPONENTS[config.model];

    return (
        <group position={member.position}>

            <Float
                speed={2}
                rotationIntensity={1}
                floatIntensity={0.6}
            >

                {/* MODEL */}
                <group scale={active ? 1.4 : 1}>
                    <ModelComponent config={config} active={active} />
                </group>

                {/* SKILLS */}
                {
                    member.skills.map(
                        (skill, index) => (
                            <Text
                                key={index}
                                position={skill.position}
                                rotation={[-Math.PI / 10, 0, 0]}
                                fontSize={0.22}
                                lineHeight={1.2}
                                anchorX="center"
                                anchorY="middle"
                                textAlign="center"
                                color="white"
                                outlineWidth={0.01}
                                outlineColor="black"
                            >
                                {skill.text}
                            </Text>
                        )
                    )
                }

            </Float>

            {/* MEMBER NAME */}
            <Text
                position={[0, -2, 0]}
                rotation={[-Math.PI / 10, 0, 0]}
                fontSize={0.25}
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                color="white"
                outlineWidth={0.01}
                outlineColor="black"
            >
                {member.name}
            </Text>

        </group>
    );
}

export default SkillSphere;