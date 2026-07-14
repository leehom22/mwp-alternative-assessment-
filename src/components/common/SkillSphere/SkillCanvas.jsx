import { Canvas } from "@react-three/fiber";

import SkillSphere from "./SkillSphere";
import CameraMove from "./CameraMove";


function SkillCanvas({
    members,
    current
}) {


    return (
        <Canvas
            camera={{
                position:[
                    0,
                    1.5,
                    5
                ],
                fov:50
            }}

            // prevent canvas blocking page scroll
            style={{
                pointerEvents:"none"
            }}

        >
            <ambientLight
                intensity={2}
            />
            <directionalLight

                position={[
                    5,
                    5,
                    5
                ]}

            />
            {
                members.map(
                    (member,index)=>(
                        <SkillSphere
                            key={index}
                            member={member}
                            active={
                                index === current
                            }
                        />
                    )
                )
            }
            <CameraMove
                target={
                    members[current].position
                }

            />
        </Canvas>
    )
}


export default SkillCanvas;