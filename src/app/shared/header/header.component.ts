import { CommonModule, LocationStrategy, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { UserProfileComponent } from '../../components/core/user-profile/user-profile.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModalComponent } from '../pop-up-card/card-modal/card-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, UpperCasePipe, UserProfileComponent, RouterOutlet, RouterModule, RouterLink, FormsModule, CardModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  notification_status!: Boolean
  toggleUserMenu!: Boolean

  fullPath!: string[];

  constructor(private _BreadCurmb: BreadcrumbService) {
    this.notification_status = false;
    this.toggleUserMenu = false;

  }

  ngOnInit(): void {
    this._BreadCurmb.changeCurrentPath();
    this._BreadCurmb.getCurrentPath().subscribe({
      next: (res: string[]) => {
        this.fullPath = res.splice(1);
        console.log(this.fullPath);
      }
    })
  }

  search(event: any) {
    if (event.target.value > 3)
      console.log(event.target.value);
  }

  userMenuToggled() {
    this.toggleUserMenu = !this.toggleUserMenu;
  }

}
