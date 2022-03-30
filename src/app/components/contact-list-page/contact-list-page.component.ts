import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.css']
})
export class ContactListPageComponent implements OnInit {

  Allcontacts: any = [];

  constructor(private crudService: CrudService) {
    this.crudService.getContacts().subscribe(res => {
      console.log(res);
      this.Allcontacts = res;
    });
   }

  ngOnInit(): void {
    this.crudService.getContacts().subscribe(res => {
      console.log(res);
      this.Allcontacts = res;
    });
  }

}
