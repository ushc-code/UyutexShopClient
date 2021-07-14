import {Component} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {ProductModel} from '../../models/product.model';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from './state/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
  }

  /*http://localhost:8061/login*/
  onSubmit(): void {
    this.userService.loginUser(this.loginForm.getRawValue());
    /*this.http.post('http://localhost:8061/auth', this.loginForm.getRawValue()).subscribe(res => {
      console.log(res);
    });
    console.log(this.loginForm.getRawValue());*/
    this.redirect();
  }
  redirect(): void{
    this.router.navigate(['./pages/homepage']);
  }
}
