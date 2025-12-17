import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from '@core/pages/home-page/home.page';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomePage, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
