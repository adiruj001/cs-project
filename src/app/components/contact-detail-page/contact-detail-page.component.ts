import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.css']
})
export class ContactDetailPageComponent implements OnInit {

  getId: any;
  contactForm: FormGroup

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.getContact(this.getId).subscribe(res => {
      this.contactForm.setValue({
        contact_member_name: res['contact_member_name'],
        contact_member_email: res['contact_member_email'],
        contact_member_tel: res['contact_member_tel'],
        contact_massage: res['contact_massage']
      });
    });

    this.contactForm = this.formBuilder.group({
      contact_member_name: [''],
      contact_member_email: [''],
      contact_member_tel: [''],
      contact_massage: ['']
    });
   }

  ngOnInit(): void {
  }

}
