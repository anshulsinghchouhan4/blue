import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnChanges {
  userList: any = [];
  @Input() searchString: any;
  filterData: any;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userList = this.userService.userData;
    this.filterData = this.userList;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Anshul', changes);
    if (changes['searchString']?.currentValue !== undefined) {
      this.onSearch(this.searchString);
    }
  }

  editInfo(index: number) {
    this.router.navigate(['add-user'], { queryParams: { id: index } });
  }

  onSearch(data: any) {
    this.filterData = this.userList?.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchString.toLowerCase()),
    );
  }
}
