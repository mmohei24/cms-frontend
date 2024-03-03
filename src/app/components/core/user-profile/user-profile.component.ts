import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CardModalComponent } from '../../../shared/pop-up-card/card-modal/card-modal.component';
import { CommonModule } from '@angular/common';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, FormsModule, CardModalComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  searchText: string = '';
  activeTab: string = 'edit';
  isavailable: boolean = true;

  deleteAccountModal!: Boolean;

  constructor(private _ToggleDeleteModalService: ToggleDeleteModalService) {
    this.deleteAccountModal = false;
  }

  ngOnInit() {
    this._ToggleDeleteModalService.getToggleValue().subscribe({
      next: (toggler) => {
        this.deleteAccountModal = toggler;
      }
    })
  }

  display(tab: string) {
    this.activeTab = tab;
  }
  close() {
    this.isavailable = false;
  }

  openModal() {
    this._ToggleDeleteModalService.toggle()
  }

  deleteAccount() {
    console.log("Account Deleted");
  }
  closeModal() {
    this._ToggleDeleteModalService.toggle();
  }
}
