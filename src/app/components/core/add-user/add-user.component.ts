import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModalComponent } from '../../../shared/pop-up-card/card-modal/card-modal.component';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CardModalComponent, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  isavailable: boolean = true;
  addAccountModal!: Boolean;


  addUser: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
    roleId: new FormControl(null),
    profileImagePath: new FormControl(null),
  })

  constructor(private _ToggleAddModalService: ToggleDeleteModalService) { }


  ngOnInit(): void {
    this._ToggleAddModalService.getToggleValue().subscribe({
      next: (toggler) => {
        this.addAccountModal = toggler;
      }
    })
  }

  AddUser() {
    console.log(this.addUser)

  }




  close() {
    this.isavailable = false;
  }




}
