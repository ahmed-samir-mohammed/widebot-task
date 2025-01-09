export interface User {
  id: string | undefined;
  username: string | undefined;
  password: string | undefined;
  role: number | undefined;
  details: Details;
}

export interface Details {
  email: string;
  name: string;
}
