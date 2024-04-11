export type ResponseLink = {
  active: boolean;
  label: string;
  url?: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string
};

export type UserResponse = {
  data: User[];
  meta: {
    links: ResponseLink[];
  };
}