export interface Role {
  id: number;
  name: string;
  permissions?: any; // Cambiado de string a any para reflejar que es un objeto JSON
}