import { Component, AfterViewInit, Renderer2, ElementRef} from '@angular/core';
import {  CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  form = { email: '', password: '' };

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private authService: AuthService,
  ) { }

  ngAfterViewInit() {
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  if (isBrowser) {
    console.log('✅ Detected browser — initializing emoji rain 🌧️');

    const emojiSet = ['💀', '🔥', '🩸', '😈', '💣', '🛑', '⚰️', '🚫', '👹', '👻', '☠️', '🖤', '💥'];
    const container = this.elRef.nativeElement.querySelector('.emoji-rain');

    if (!container) {
      console.warn('Emoji rain container not found! ❌');
      return;
    }

    for (let i = 0; i < 100; i++) {
      const emoji = this.renderer.createElement('span');
      const char = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      const size = Math.random() * 1.5 + 0.8;
      const left = Math.random() * 100;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.6 + 0.2;

      emoji.textContent = char;
      this.renderer.addClass(emoji, 'falling-emoji');
      this.renderer.setStyle(emoji, 'left', `${left}%`);
      this.renderer.setStyle(emoji, 'fontSize', `${size}rem`);
      this.renderer.setStyle(emoji, 'opacity', opacity.toString());
      this.renderer.setStyle(emoji, 'animation', `fall ${duration}s linear ${delay}s infinite`);
      this.renderer.setStyle(emoji, 'top', '-5%');
      this.renderer.setStyle(emoji, 'position', 'absolute');
      this.renderer.setStyle(emoji, 'zIndex', '0');
      this.renderer.setStyle(emoji, 'userSelect', 'none');
      this.renderer.setStyle(emoji, 'pointerEvents', 'none');

      this.renderer.appendChild(container, emoji);
    }

    console.log('🎉 Emoji rain initialized.');
  } else {
    console.log('❌ Not in browser — skipping emoji rain.');
  }
}


  onLogin() {
    this.authService.login(this.form).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        alert('Login successful! 🎉');
        console.log('Logged in!');
        // this.router.navigate(['/dashboard']);
      },
      error: err => console.error(err)
    });
  }
}
