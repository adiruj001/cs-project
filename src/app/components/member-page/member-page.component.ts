import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {

  Allmembers: any = [];

  constructor(private crudService: CrudService) {
    this.crudService.getMembers().subscribe(res => {
      console.log(res);
      this.Allmembers = res;
    });
   }

  ngOnInit(): void {
    this.crudService.getMembers().subscribe(res => {
      console.log(res);
      this.Allmembers = res;
    });
  }

}
