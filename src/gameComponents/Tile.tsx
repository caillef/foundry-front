import * as THREE from "three";
import { useMemo } from "react";
import { MAP_SCALE } from "@/config";
import { useDojo } from "@/dojo/useDojo";
import { useElementStore } from "@/store";

export const Tile = ({ position }: any) => {
    const {
        account: { account },
        setup: {
            systemCalls: { place_machine },
        },
    } = useDojo();

    const { direction, machine_type, last_machine_id, nb_in_connection } = useElementStore((state) => state);

    const squareGeometry = useMemo(
        () => new THREE.BoxGeometry(MAP_SCALE, MAP_SCALE, MAP_SCALE),
        [MAP_SCALE]
    );

    function placeMachine() {
        if (machine_type === 0) { return }
        const connectedMachines: number[] = []
        if (machine_type === 3) {
            for (let i = last_machine_id; i > last_machine_id - nb_in_connection; i--) {
                connectedMachines.push(i)
            }
        }
        const [x,y] = [1000 + Math.floor(position.x / MAP_SCALE), 1000 + Math.floor(position.y / MAP_SCALE)]
        place_machine(account, machine_type, 1, x, y, direction, connectedMachines);
    }

    return (
        <>
            <mesh
                receiveShadow
                position={[position.x, -MAP_SCALE, position.y]}
                geometry={squareGeometry}
                onClick={placeMachine}
                material={
                    new THREE.MeshPhongMaterial({
                        color: "lightgrey",
                    })
                }
            ></mesh>
            <lineSegments
                geometry={new THREE.EdgesGeometry(squareGeometry)}
                material={
                    new THREE.LineBasicMaterial({
                        color: "black",
                        linewidth: 1,
                    })
                }
                position={[position.x, -MAP_SCALE + 0.01, position.y]}
            />
        </>
    );
};
