export interface User {
  id: number;
  username: string;
  password: string;
  role: number;
  details: Details;
}

export interface Details {
  email: string;
  name: string;
}
