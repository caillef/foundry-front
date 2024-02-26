import { Account } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, updatePositionWithDirection } from "../utils";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { client }: { client: IWorld },
    contractComponents: ContractComponents,
    { Position }: ClientComponents
) {
    const spawn = async (account: Account) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        const positionId = uuid();
        Position.addOverride(positionId, {
            entity: entityId,
            value: { player: BigInt(account.address), vec: { x: 10, y: 10 } },
        });

        try {
            const { transaction_hash } = await client.actions.spawn({
                account,
            });

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
            Position.removeOverride(positionId);
        } finally {
            // If override is removed too soon, defineSystem is called twice
            setTimeout(() => {
                Position.removeOverride(positionId);
            }, 1000);
        }
    };

    const place_machine = async (account: Account,
        machine_type: number,
        resource_type: number,
        x: number,
        y: number,
        direction: number,
        connectedMachines: number[]) =>
    {
        try {
            const { transaction_hash } = await client.actions.place_machine({
                account,
                machine_type,
                resource_type,
                x,
                y,
                direction,
                connectedMachines,
            });

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
        } finally {

        }
    };


    const compute_inventory = async (account: Account, id: number) =>
    {
        try {
            const { transaction_hash } = await client.actions.compute_inventory({ account, id });

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
        } finally {

        }
    };

    return {
        spawn,
        place_machine,
        compute_inventory
    };
}
