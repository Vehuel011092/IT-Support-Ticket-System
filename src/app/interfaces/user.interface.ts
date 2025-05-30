export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Solo para creación
  roles: {
    name: string;
    permissions: {
      crud_full: boolean;
      users_list: boolean;
      delete_users: boolean;
      manage_roles: boolean;
    };
  }[];
  status: 'active' | 'deactivated';
  createAt: Date;
  updatedAt: Date;
}