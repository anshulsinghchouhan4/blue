import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  isUpdate: boolean = false;
  currIndex!: number;
  isFormSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      role: ['Admin', Validators.required],
      dept: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      address: [null, Validators.required],
      status: [false],
    });

    this.route.queryParams.subscribe((params) => {
      this.currIndex = params['id'];
      if (this.currIndex) {
        this.editInfo(this.currIndex);
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
      }
    });
  }

  ngOnInit() {}

  hideAddUser() {
    this.router.navigate(['']);
  }

  createUser() {
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      let userData = this.userForm.getRawValue();
      userData['name'] = `${userData?.firstname} ${userData?.lastname}`;
      if (this.isUpdate) {
        this.userService.userData[this.currIndex] = userData;
      } else {
        this.userService.userData.push(userData);
      }
      this.userForm.reset();
      this.hideAddUser();
    }
  }

  editInfo(index: number) {
    let data: any = this.userService.userData[index];
    this.userForm.patchValue({
      firstname: data?.firstname,
      lastname: data?.lastname,
      role: data?.role,
      dept: data?.dept,
      email: data?.email,
      phone: data?.phone,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      address: data?.address,
      status: data?.status,
    });
  }
}
