import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
    private crudService: CrudService
  ) {
    this.memberForm = this.formBuilder.group({
      member_username: new FormControl(null, Validators.required),
      member_password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, Validators.required),
      member_firstname: new FormControl(null, Validators.required),
      member_lastname: new FormControl(null, Validators.required),
      member_tel: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      member_type: ['user']
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
    this.crudService.addMember(this.memberForm.value)
    .subscribe(() => {
      console.log("Data added succesfully!");
      alert("สร้างบัญชีเสร็จเรียบร้อย!");
      this.ngZone.run(() => this.router.navigateByUrl('/login-page'));
    },(err) => {
      console.log(err);
    })
  }

}