import { Component, AfterViewInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ Add this

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  name = '';
  email = '';
  password = '';

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
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
    console.log('Registering:', this.name, this.email, this.password);
  }
}
