import { Company } from "./company";
import { Identifiable } from "./identifiable";
import { User } from "./user";

export interface Product extends Identifiable {
  readonly description: string;
  readonly picture: string;
  readonly type: Identifiable;
  readonly categories: ReadonlyArray<Identifiable>;
  readonly implementationEffortText: string | null;
  readonly investmentEffort: string;
  readonly trl: Identifiable;
  readonly video: string;
  readonly user: User;
  readonly company: Company;
  readonly businessModels: ReadonlyArray<Identifiable>;
}
