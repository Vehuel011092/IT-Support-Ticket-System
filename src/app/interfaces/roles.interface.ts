export interface Role {
  roleId: number;
  roleName: string;
  permissions?: any; // Cambiado de string a any para reflejar que es un objeto JSON
}