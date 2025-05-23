import { Component, AfterViewInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  email = '';
  password = '';

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const emojiSet = ['💀', '🔥', '🩸', '😈', '💣', '🛑', '⚰️', '🚫', '👹', '👻', '☠️', '🖤', '💥'];
      const container = this.elRef.nativeElement.querySelector('.emoji-rain');

      for (let i = 0; i < 100; i++) {
        const emoji = this.renderer.createElement('span');
        const char = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        const size = Math.random() * 1.5 + 0.8;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.6 + 0.2;

        emoji.textContent = char;
        this.renderer.setStyle(emoji, 'position', 'absolute');
        this.renderer.setStyle(emoji, 'left', `${left}%`);
        this.renderer.setStyle(emoji, 'fontSize', `${size}rem`);
        this.renderer.setStyle(emoji, 'opacity', opacity.toString());
        this.renderer.setStyle(emoji, 'animation', `fall ${duration}s linear ${delay}s infinite`);
        this.renderer.setStyle(emoji, 'top', `-5%`);
        this.renderer.setStyle(emoji, 'transform', 'translateY(0)');
        this.renderer.setStyle(emoji, 'willChange', 'transform');

        this.renderer.appendChild(container, emoji);
      }
    }
  }

  onLogin() {
    console.log('Logging in with', this.email, this.password);
  }
}
