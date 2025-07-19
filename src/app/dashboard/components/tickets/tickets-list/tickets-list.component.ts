import { Component } from '@angular/core';
import { Ticket } from '../../../../interfaces/ticket.model';
import { TicketService } from '../../../../services/tickets.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent {
  tickets: Ticket[] = [];
  nuevoTicket: Partial<Ticket> = {
    title: '',
    content: '',
    state: 'Abierto'
  };

  constructor(private ticketService: TicketService) {
    this.tickets = this.ticketService.getTickets();
  }

  crearTicket() {
    const ticketCompleto: Ticket = {
      ...this.nuevoTicket as Ticket,
      id: this.tickets.length + 1,
      ticketNumber: `TKT-${(this.tickets.length + 1).toString().padStart(3, '0')}`,
      createdBy: 'usuario_actual@empresa.com', // En producción usarías un servicio de autenticación
      creationDate: new Date()
    };
    
    this.ticketService.addTicket(ticketCompleto);
    this.resetForm();
  }

  private resetForm() {
    this.nuevoTicket = {
      title: '',
      content: '',
      state: 'Abierto'
    };
  }


}
