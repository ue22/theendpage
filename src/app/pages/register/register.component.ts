import { Component, AfterViewInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ Add this
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  form = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};


  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const emojiSet = ['💀', '🔥', '🩸', '😈', '💣', '🛑', '⚰️', '🚫'];
      const container = this.elRef.nativeElement.querySelector('.emoji-rain');

      for (let i = 0; i < 100; i++) {
        const emoji = this.renderer.createElement('span');
        const char = emojiSet[Math.floor(Math.random() * emojiSet.length)];

        const size = Math.random() * 1.5 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        emoji.textContent = char;
        this.renderer.setStyle(emoji, 'position', 'absolute');
        this.renderer.setStyle(emoji, 'left', `${left}%`);
        this.renderer.setStyle(emoji, 'top', '-10%');
        this.renderer.setStyle(emoji, 'fontSize', `${size}rem`);
        this.renderer.setStyle(emoji, 'opacity', '0.3');
        this.renderer.setStyle(emoji, 'animation', `fall ${duration}s linear infinite`);
        this.renderer.setStyle(emoji, 'animationDelay', `${delay}s`);

        this.renderer.appendChild(container, emoji);
      }
    }
  }

onRegister() {
  if (this.form.password !== this.form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const { name, email, password } = this.form;
  this.authService.register({ name, email, password }).subscribe({
    next: res => {
      console.log('Registered:', res);
      alert('Register successful! 🎉');
    },
    error: err => {
      console.error(err);
      alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
    }
  });
}


}
