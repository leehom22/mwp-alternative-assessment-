import { Float, Text } from "@react-three/drei";

function SkillSphere({
    member,
    active
}) {

    const materials = {
        "Ling Lee Hom": {
            type: "crystal",
            color: "#3cb8cd",
            emissive: "#003344"
        },

        "Darshni": {
            type: "metal",
            color: "#8b07ff",
            emissive: "#3d1a74"
        },

        "Nicholas Yek Ei Zhe": {
            type: "metal",
            color: "#2563eb",
            emissive: "#001133"
        },

        "Lee Xuan Ying": {
            type: "crystal",
            color: "#ff3e82",
            emissive: "#761d59"
        }
    };

    const sphere = materials[member.name];

    return (
        <group position={member.position}>

            <Float
                speed={2}
                rotationIntensity={1}
                floatIntensity={0.6}
            >

                {/* SPHERE */}
                <mesh scale={active ? 1.4 : 1}>

                    <sphereGeometry
                        args={[
                            0.45,
                            64,
                            64
                        ]}
                    />

                    {
                        sphere.type === "metal" &&
                        <meshStandardMaterial
                            color={sphere.color}
                            metalness={1}
                            roughness={0.15}
                            emissive={sphere.emissive}
                            emissiveIntensity={0.5}
                        />
                    }

                    {
                        sphere.type === "crystal" &&
                        <meshPhysicalMaterial
                            color={sphere.color}
                            metalness={0.2}
                            roughness={0.05}
                            clearcoat={1}
                            clearcoatRoughness={0.05}
                            emissive={sphere.emissive}
                            emissiveIntensity={active ? 2 : 0.5}
                        />
                    }

                </mesh>

                {/* SKILLS */}
                {
                    member.skills.map(
                        (skill, index) => (
                            <Text
                                key={index}
                                position={skill.position}
                                rotation={[
                                    -Math.PI / 10,
                                    0,
                                    0
                                ]}
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
                position={[
                    0,
                    -2,
                    0
                ]}
                rotation={[
                    -Math.PI / 10,
                    0,
                    0
                ]}
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