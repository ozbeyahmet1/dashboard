import { Address } from "./address";

export interface Company {
  readonly name: string;
  readonly logo: string;
  readonly address: Address;
}
