import manifest from "../foundry-contracts/target/dev/manifest.json";
import { createDojoConfig } from "@dojoengine/core";

export const dojoConfig = createDojoConfig({
    manifest,
});
