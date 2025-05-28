import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  newsletterEmail: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupBackToTop();
  }

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      // Aquí iría la lógica para suscribir al usuario
      console.log('Email suscrito:', this.newsletterEmail);
      this.newsletterEmail = '';
      alert('¡Gracias por suscribirte a nuestro newsletter!');
    }
  }

  private setupBackToTop() {
    // Crear dinámicamente el botón "Volver arriba"
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.id = 'backToTop';
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTop);

    // Mostrar/ocultar botón de volver arriba
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    // Comportamiento al hacer clic
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
