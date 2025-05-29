export interface User {
  id: number;
  name: string;
  email: string;
  roles: {
    name: string;
    permissions: {
      crud_full: boolean;
      users_list: boolean;
      delete_users: boolean;
      manage_roles: boolean;
    };
  }[];
  createAt: Date;
  updatedAt: Date;
}