import {
    useFrame,
    useThree
} from "@react-three/fiber";

import {
    Vector3
} from "three";


function CameraMove({
    target
}) {


    const {
        camera
    } = useThree();


    useFrame(() => {


        const cameraPosition =
            new Vector3(
                target[0],
                1.25,
                target[2] + 3.5

            );


        camera.position.lerp(
            cameraPosition,
            0.05
        );


        camera.lookAt(
            target[0],
            0,
            target[2]
        );

    });

    return null;


}


export default CameraMove;