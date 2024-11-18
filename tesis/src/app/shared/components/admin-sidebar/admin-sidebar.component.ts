import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/User';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  user: User | null = null;
  isMenuVisible = false;
  constructor(private userService : UserService, private authService : AuthService){}

  ngOnInit() : void{
    this.getUserProfile();
  }

  getUserProfile() : void {
    this.userService.getUserProfile().subscribe(user => {
      this.user = user;
      console.log(this.user);
    })
  }

  logout() : void {
    console.log('Logging out');
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
