import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CrudService } from './../../service/crud.service';
import { Van } from 'src/app/models/van.model';

@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css']
})
export class ReservationAdminComponent implements OnInit {

  AllReservations: any = [];
  Reservations = new Array;
  vanTime = new Array;
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private van: Van
  ) {
    this.searchForm = this.formBuilder.group({
      vanline: [''],
      date: [''],
      time: [''],
      status: [''],
      passenger: ['']
    });

    this.crudService.getReservations().subscribe(res => {
      console.log(res);
      this.AllReservations = res;
    });
    this.vanTime = this.van.van_time;
  }

  ngOnInit(): void {
    this.crudService.getReservations().subscribe(res => {
      console.log(res);
      this.AllReservations = res;
    });
    this.vanTime = this.van.van_time;
  }

  onSearch(): any {
    this.Reservations = this.AllReservations;
    this.AllReservations = [];

    // vanline
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          console.log(date_pattern);          
          if(val.date == date_pattern){
            this.AllReservations.push(val);
          }
        }
    }

    // time
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.time == (document.getElementById("time-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // status
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.date == date_pattern){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline time
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.time == (document.getElementById("time-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline status
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date time
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date status
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // time status
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.time == (document.getElementById("time-select") as HTMLInputElement).value && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // time passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.time == (document.getElementById("time-select") as HTMLInputElement).value && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.status == (document.getElementById("status-select") as HTMLInputElement).value && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date time
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
          && val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date status
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
          && val.date == date_pattern && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
          && val.date == date_pattern && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline time status
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline time passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.status == (document.getElementById("status-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date time status
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date time passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value == '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.status == (document.getElementById("status-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // time status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.time == (document.getElementById("time-select") as HTMLInputElement).value && val.status == (document.getElementById("status-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date time status
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value == '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
          && val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.status == (document.getElementById("status-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date time passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value == ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
          && val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline time status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value == ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.status == (document.getElementById("status-select") as HTMLInputElement).value && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // date time status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value == '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

    // vanline date time status passenger
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
        && (document.getElementById("time-select") as HTMLInputElement).value != '' && (document.getElementById("status-select") as HTMLInputElement).value != ''
        && (document.getElementById("passenger-select") as HTMLInputElement).value != '') {
        for(var val of this.Reservations){
          let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
          let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
          if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
          && val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value
          && val.status == (document.getElementById("status-select") as HTMLInputElement).value && val.passenger == (document.getElementById("passenger-select") as HTMLInputElement).value){
            this.AllReservations.push(val);
          }
        }
    }

  }

  onResetSearch(): any {
    (document.getElementById("vanline-select") as HTMLInputElement).value = '';
    (document.getElementById("date-select") as HTMLInputElement).value = '';
    (document.getElementById("time-select") as HTMLInputElement).value = '';
    (document.getElementById("status-select") as HTMLInputElement).value = '';
    (document.getElementById("passenger-select") as HTMLInputElement).value = '';
    this.crudService.getReservations().subscribe(res => {
      console.log(res);
      this.AllReservations = res;
    });
  }

}
