/* Autogenerated file. Do not edit manually. */

import { Account } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import { Direction } from "../../utils";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
    function actions() {
        const contract_name = "actions";

        const spawn = async ({ account }: { account: Account }) => {
            try {
                return await provider.execute(
                    account,
                    contract_name,
                    "spawn",
                    []
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };

        const place_machine = async ({
            account,
            machine_type,
            resource_type,
            x,
            y,
            direction,
            connectedMachines,
        }: {
            account: Account,
            machine_type: number,
            resource_type: number,
            x: number,
            y: number,
            direction: number,
            connectedMachines: number[],
        }) => {
            try {
                return await provider.execute(account, contract_name, "place_machine", [
                    machine_type,
                    resource_type,
                    x,
                    y,
                    direction,
                    connectedMachines,
                ]);
            } catch (error) {
                console.error("Error executing place_machine:", error);
                throw error;
            }
        };

        const compute_inventory = async ({
            account,
            id
        }: {
            account: Account,
            id: number
        }) => {
            console.log("compute_inventory", id)
            try {
                return await provider.execute(account, contract_name, "compute_inventory", [id]);
            } catch (error) {
                console.error("Error executing place_machine:", error);
                throw error;
            }
        };
        return { spawn, place_machine, compute_inventory };
    }
    return {
        actions: actions(),
    };
}