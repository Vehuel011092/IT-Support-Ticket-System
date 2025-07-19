import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
     private tickets: Ticket[] = [
    {
      id: 1,
      ticketNumber: 'TKT-001',
      title: 'Error en login',
      content: 'No puedo iniciar sesión en el sistema',
      createdBy: 'usuario1@empresa.com',
      assingTo: 'soporte@empresa.com',
      creationDate: new Date(),
      state: 'Abierto'
    },
    {
      id: 2,
      ticketNumber: 'TKT-002',
      title: 'Solicitud de acceso',
      content: 'Necesito permisos para el módulo X',
      createdBy: 'usuario2@empresa.com',
      creationDate: new Date(),
      state: 'Abierto'
    }
  ];

  getTickets(): Ticket[] {
    return this.tickets;
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

}