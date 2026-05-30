import type { SystemState } from "../types";
import seed from "../../sales_brain_state.json";

export const DEFAULT_STATE = seed as SystemState;

export function cloneDefaultState(): SystemState {
  return JSON.parse(JSON.stringify(DEFAULT_STATE)) as SystemState;
}
