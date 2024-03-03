import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToggleService } from '../../services/toggleBtn/toggle.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  openDropdown!: Boolean;
  active!: Boolean;
  darkMode!: Boolean;
  sidebarToggler!: Boolean;

  constructor(private route: ActivatedRoute, private _Toggle: ToggleService) {
    this.openDropdown = true;
    this.darkMode = false;
    this.sidebarToggler = false;
  }

  ngOnInit(): void { }

  togglesidebar() {
    this._Toggle.toggle();
    this.sidebarToggler = !this.sidebarToggler;
  }


  Dropdowntoggle() {
    this.active = !this.active;

  }

  toggleAppearance() {
    this.darkMode = !this.darkMode;
  }

}
