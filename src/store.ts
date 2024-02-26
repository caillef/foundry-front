import { create } from "zustand";

export type Store = {
    players: any; // { [id]: { player, vec }, [id2]: { player, vec } }
    update_player: (player: any) => void;
    direction: number;
    set_direction: (direction: number) => void;
    machine_type: number;
    set_machine_type: (machine_type: number) => void;
    last_machine_id: number, 
    set_last_machine_id: (last_machine_id: number) => void;
    nb_in_connection: number, 
    set_nb_in_connection: (nb_in_connection: number) => void;
};

export const useElementStore = create<Store>((set) => ({
    players: {},
    update_player: (player: any) =>
        set((state) => {
            return {
                players: {
                    ...state.players,
                    [player.player]: player,
                },
            };
        }),
    direction: 1,
    set_direction: (direction: number) => set((state) => ({ ...state, direction })),
    machine_type: 1,
    set_machine_type: (machine_type: number) => set((state) => ({ ...state, machine_type })),
    last_machine_id: 0,
    set_last_machine_id: (last_machine_id: number) => set((state) => ({ ...state, last_machine_id })),
    nb_in_connection: 0,
    set_nb_in_connection: (nb_in_connection: number) => set((state) => ({ ...state, nb_in_connection })),
    }));
