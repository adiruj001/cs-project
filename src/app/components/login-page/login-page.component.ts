import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  getId: any;

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private appComponent: AppComponent
  ) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
   }

  ngOnInit(): void {
  }

  login(){
    this.http.get<any>("http://localhost:9999/api/members")
    .subscribe((res) => {
      const member = res.find((data: any) => {
        return data.member_username === this.loginForm.value.username && data.member_password === this.loginForm.value.password
      });
      if(member) {
        console.log("Login succesfully!");
        alert("ยินดีต้อนรับ!");
        this.appComponent.getUserLogin(member._id);
        this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
      }
      else {
        alert("username หรือ password ไม่ถูกต้อง");
      }
    })
  }

}