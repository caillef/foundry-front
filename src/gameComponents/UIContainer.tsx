import { useDojo } from "../dojo/useDojo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useElementStore } from "@/store";

export const UIContainer = () => {
    const {
        account: { account },
        setup: {
            client: { actions },
        },
    } = useDojo();

    const {direction, set_direction, machine_type, set_machine_type, set_nb_in_connection, set_last_machine_id } = useElementStore((state) => state)

    return (
        <div className="flex space-x-3 justify-between p-2 flex-wrap">
            <Button
                variant={"default"}
                onClick={() => actions.spawn({ account })}
            >
                Spawn
            </Button>
            <Button onClick={() => { machine_type === 3 ? set_machine_type(0) : set_machine_type(machine_type + 1)}}>Machine Type {machine_type}</Button>
            <Button onClick={() => { direction === 4 ? set_direction(1) : set_direction(direction + 1)}}>Direction {direction}</Button>
            <Button>Nb In Connection <Input onChange={(e) => set_nb_in_connection(parseInt(e.target.value))}></Input></Button>
            <Button>Last Machine Id <Input onChange={(e) => set_last_machine_id(parseInt(e.target.value))}></Input></Button>
        </div>
    );
};
