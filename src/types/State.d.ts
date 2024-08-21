import { User } from "./User";
import { Address } from "./Address";

export interface State {
  user: User | null;
  addresses: Address[];
}
