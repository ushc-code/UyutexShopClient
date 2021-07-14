import { Component, OnInit } from '@angular/core';
import {NbRegisterComponent} from '@nebular/auth';
import {FormBuilder, NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {routes} from '../pages-routing.module';
import {HttpClient} from '@angular/common/http';
import {wrapRootComponentInLayout} from '@nebular/theme/schematics/ng-add/wrap-in-layout';
import {getRouterModuleDeclaration} from '@schematics/angular/utility/ast-utils';
import {UserService} from '../login/state/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm = this.formBuilder.group({
    email: '',
    password: '',
    username: '',
    phone: ''
  });
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
  }

  onSubmit(): void{
    this.userService.registerUser(this.registerForm.getRawValue());
    console.log(this.registerForm.getRawValue());
    this.redirect();
  }
  redirect(): void{
    this.router.navigate(['./pages/login']);
  }

}
