import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { userManagementCard } from '../../../../../stories/card.stories';
import { TableComponent } from '../../../../shared/table/table.component';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CardComponent,TableComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  row1=[12345];
  row2 = 2;
  headdata = this.row1;
  bodydata = [12345];
  
  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }

}
