import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-manageroles',
  standalone: true,
  imports: [],
  templateUrl: './manageroles.component.html',
  styleUrl: './manageroles.component.css'
})
export class ManageRolesComponent implements OnInit {

  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();

  }
  isShown: boolean = false;

  show() {
    if (this.isShown == true) {
      this.isShown = false;

    }
    else {
      this.isShown = true;
    }
  }
}
