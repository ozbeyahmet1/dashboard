export enum Sex {
  female,
  male,
}

export interface User {
  readonly id: number;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly sex: Sex;
  readonly profilePicture: string;
  readonly position: string;
}
