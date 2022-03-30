import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  imageContPath = "http://localhost:9999/pictures/contact.png";
  contactForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private appComponent: AppComponent
  ) {
    this.contactForm = this.formBuilder.group({
      contact_member_id: localStorage.getItem("userCurrentlyLogin"),
      contact_member_name: localStorage.getItem("passenger"),
      contact_member_email: [''],
      contact_member_tel: localStorage.getItem("member_tel"),
      contact_massage: ['']
    })
   }

  ngOnInit(): void {
  }

  onSubmit(): any {
    if(this.appComponent.UserNowLogin.member_username != null) {
      if(this.contactForm.value.contact_member_name == "" || this.contactForm.value.contact_member_email == "" || this.contactForm.value.contact_member_tel == "" || this.contactForm.value.contact_massage == "") {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.crudService.addContect(this.contactForm.value)
        .subscribe(() => {
          console.log("Add contact succesfully!");
          alert("ขอบคุณสำหรับการติดต่อ");
          this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
        },(err) => {
          console.log(err);
        });        
      }
      
    } else {
      alert("กรุณาเข้าสู่ระบบ ก่อนทำรายการ");
    }
  }

}
