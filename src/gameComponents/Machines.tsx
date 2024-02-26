import { useDojo } from "@/dojo/useDojo";
import { Has } from "@dojoengine/recs";
import { Machine as MachineComponent } from "./Machine";
import { useEntityQuery } from '@dojoengine/react';

export const Machines = (props: any) => {
    const {
        setup: {
            clientComponents: { Machine },
        },
    } = useDojo();

    const machinesIds = useEntityQuery([Has(Machine)])
    console.log(machinesIds.length)
    
    return (
        <>
            {
                // Get all machines
                machinesIds.map((machineId: any) => {
                    return <MachineComponent key={machineId} entityId={machineId} />;
                })
            }
        </>
    );
};
