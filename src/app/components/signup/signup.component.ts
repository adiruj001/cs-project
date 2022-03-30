import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  memberForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
    private crudService: CrudService
  ) {
    this.memberForm = this.formBuilder.group({
      member_username: new FormControl(null, Validators.required),
      member_password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, Validators.required),
      member_firstname: new FormControl(null, Validators.required),
      member_lastname: new FormControl(null, Validators.required),
      member_tel: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      type: ['user']
    },
    {
      validators: this.checkPassword('member_password', 'confirm_password')
    });
   }

  ngOnInit(): void {
  }

  checkPassword(password: string, confirmPassword: string){
    return(formGroup: FormGroup) => {
      const passwd = formGroup.controls[password];
      const confirm_passwd = formGroup.controls[confirmPassword];
      if(confirm_passwd.errors && !confirm_passwd.errors['checkPassword']){
        return
      }
      if(passwd.value !== confirm_passwd.value){
        confirm_passwd.setErrors({checkPassword:true});
      }
      else {
        confirm_passwd.setErrors(null);
      }
    }
  }

  onSubmit(): any {
    if(this.memberForm.value.member_firstname == "Admin") {
      alert("ชื่อนี้ไม่สามารถใช้ได้");
    }
    else if(this.memberForm.value.member_username == "Admin") {
      alert("ชื่อผู้ใช้นี้ไม่สามารถใช้ได้");
    }
    else {
      this.http.get<any>("http://localhost:9999/api/members")
      .subscribe((res) => {
        const checkUsername = res.find((data: any) => {
          return data.member_username === this.memberForm.value.member_username
        });
        if(checkUsername) {
          alert("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว");
        }
        else {
          this.crudService.addMember(this.memberForm.value)
          .subscribe(() => {
            console.log("Signup succesfully!");
            alert("สร้างบัญชีเสร็จเรียบร้อย!");
            this.ngZone.run(() => this.router.navigateByUrl('/login-page'));
          },(err) => {
            console.log(err);
          })
        }
      });
    }
  }

}