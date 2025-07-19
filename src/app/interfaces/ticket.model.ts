export interface Ticket {
  id: number;
  ticketNumber: string;
  title: string;
  content: string;
  createdBy: string;
  assingTo?: string; // Opcional para asignación
  creationDate: Date;
  state: 'Abierto' | 'En Progreso' | 'Cerrado';
}