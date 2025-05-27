import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showLogoutModalSource = new Subject<boolean>();
  showLogoutModal$ = this.showLogoutModalSource.asObservable();

  private logoutConfirmedSource = new Subject<void>();
  logoutConfirmed$ = this.logoutConfirmedSource.asObservable();

  openLogoutConfirmation() {
    this.showLogoutModalSource.next(true);
  }

  closeLogoutConfirmation() {
    this.showLogoutModalSource.next(false);
  }

  confirmLogout() {
    this.logoutConfirmedSource.next();
    this.closeLogoutConfirmation();
  }
}