import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  listViewSelected: boolean = true;
  searchTerm: any;

  constructor(private router: Router) {}

  showAddUser() {
    this.router.navigate(['add-user']);
  }

  onsearch() {}
}
