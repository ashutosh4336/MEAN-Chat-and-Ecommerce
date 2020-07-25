import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  constructor(private userService : UserService, private router : Router ) { }

  ngOnInit(): void {
  }

  // Reading Inputvalues from AddUserForm
  readValuesFromForm(form: HTMLFormElement){

    let name = (<HTMLInputElement>form.elements.namedItem('name')).value
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value

    let user : User  = {
      name,
      email,
      password,
      phone
    };
    return user

  }

  // Creating new user
  createUser(event : Event){
    event.preventDefault();
    let form = <HTMLFormElement>event.target;
    let user: User = this.readValuesFromForm(form);

    this.userService.addUser(user).subscribe(()=>{
        form.reset();
        alert("User created successfully!!");
      }
    )
  }
}
