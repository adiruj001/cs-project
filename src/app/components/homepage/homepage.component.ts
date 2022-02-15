import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  reservationForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.reservationForm = this.formBuilder.group({
      member_id: ['15507'],
      passenger: ['Adiruj Mukda'],
      date: [''],
      time: [''],
      vanline: [''],
      pickup: [''],
      destination: [''],
      status: ['จอง'],
      amount: [1]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudService.addReservation(this.reservationForm.value)
    .subscribe(() => {
      console.log("Data added succesfully!");
    }, (err) => {
      console.log(err);
    })
  }

}
