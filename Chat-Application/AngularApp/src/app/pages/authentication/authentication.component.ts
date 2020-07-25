import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../services/form/form.service';
import { ChatService } from '../../services/chat/chat.service';

import { Auth } from '../../interfaces/auth';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  loginError = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formService: FormService,
    private chatService: ChatService
  ) {
    this.loginForm = this.formService.createLoginForm();
  }
  ngOnInit() {
    this.chatService.userSessionCheck().subscribe(async (loggedIn: boolean) => {
      if (loggedIn) {
        await this.router.navigate(['/pages/home']);
      }
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.chatService.login(this.loginForm.value).subscribe(
        (response: Auth) => {
          localStorage.setItem('userid', response.userId);
          if (response.role === 'user') {
            this.router.navigate(['/pages/home']);
          }
          if (response.role === 'admin') {
            this.router.navigate(['pages/authentication/admin']);
          }
        },
        (error) => {
          this.loginError = true;
        }
      );
    }
  }
}
