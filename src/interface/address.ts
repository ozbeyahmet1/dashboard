export interface Address {
  readonly country: {
    readonly name: string;
  };
  readonly city: {
    readonly name: string;
  };
  readonly street: string;
  readonly house: string;
  readonly zipCode: string;
  readonly longitude: string;
  readonly latitude: string;
}
