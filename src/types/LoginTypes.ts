export type LoginType = {
  email: string;
  password: string;
  token?: string;
  name?: string;
  stateLocation?: string;
};

export type RegisterType = {
  email: string;
  password: string;
  token?: string;
  name: string;
  stateLocation: string;
};
