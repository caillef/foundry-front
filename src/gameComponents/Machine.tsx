import * as THREE from "three";
import { Cylinder, Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { MAP_SCALE } from "@/config";
import { useComponentValue } from "@dojoengine/react";
import { useDojo } from "@/dojo/useDojo";

const useGetTime = () => {
    const [time, setTime] = useState(
      new Date().getTime()
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().getTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return time;
  };

export const Machine = ({ entityId }: any) => {
    const {
        account: { account },
        setup: {
            clientComponents: { Machine: MachineClientComponent, Inventory },
            systemCalls: { compute_inventory },
        },
    } = useDojo();

    // Retrieve player info
    const machine = useComponentValue(MachineClientComponent, entityId);
    const inventory = useComponentValue(Inventory, entityId);

    let { id, machine_type, x, y, direction } = machine;
    const cylinderRef: any = useRef();

    const color = machine_type === 1 ? 'blue' : (machine_type === 3 ? 'orange' : 'white')

    const time = useGetTime()

    let chainValue = machine.last_compute_at - machine.placed_at - machine.source_dist
    if (chainValue < 0) {
        chainValue = 0;
    }

    let localValue: any = Math.floor((time / 1000) - machine.placed_at - machine.source_dist)
    if (localValue < 0) {
        localValue = 'first in ' + localValue + 's';
    }

    return (
        <>
            <Cylinder
                castShadow
                key="machine"
                ref={cylinderRef}
                position={new THREE.Vector3((x - 1000) * MAP_SCALE, 0, (y - 1000) * MAP_SCALE)}
                rotation={machine_type === 2 ? [direction === 1 || direction === 3 ? Math.PI * 0.5 : 0, 0, direction === 2 || direction === 4 ? Math.PI * 0.5 : 0] : [0,0,0]}
                scale={machine_type === 2 ? [MAP_SCALE / 3, MAP_SCALE * 1.1, MAP_SCALE / 3] : [MAP_SCALE / 2, MAP_SCALE, MAP_SCALE / 2]}
                material={new THREE.MeshPhongMaterial({ color })}
                onClick={() => { console.log('compute_inventory', id); compute_inventory(account, id) }}
            />
            <Text rotation={[Math.PI * -0.5,0,direction * Math.PI * 0.5 + Math.PI]}
                color={"white"}
                outlineColor={"black"}
                outlineWidth={0.1}
                position={new THREE.Vector3((x - 1000) * MAP_SCALE, 3, (y - 1000) * MAP_SCALE)}
                scale={2}>{'>'}</Text>
            { inventory &&
                <>
                    <Text rotation={[0,0,0]}
                    color={"white"}
                    outlineColor={"black"}
                    outlineWidth={0.1}
                    position={new THREE.Vector3((x - 1000) * MAP_SCALE, 7, (y - 1000) * MAP_SCALE + 3)}
                    scale={2}>Local {localValue}</Text>
                    <Text rotation={[0,0,0]}
                    color={"white"}
                    outlineColor={"black"}
                    outlineWidth={0.1}
                    position={new THREE.Vector3((x - 1000) * MAP_SCALE, 3, (y - 1000) * MAP_SCALE + 3)}
                    scale={2}>Chain {chainValue}</Text>
                </>
            }
        </>
    );
};
