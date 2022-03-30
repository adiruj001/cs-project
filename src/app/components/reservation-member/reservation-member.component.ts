import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-reservation-member',
  templateUrl: './reservation-member.component.html',
  styleUrls: ['./reservation-member.component.css']
})
export class ReservationMemberComponent implements OnInit {

  AllReservations: any = [];
  Reservations = new Array;
  textColer: String[] = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getReservations().subscribe(res => {
      this.AllReservations = res;
      for(let r of this.AllReservations) {
        if(r.member_id == localStorage.getItem("userCurrentlyLogin")) {
          if(r.status == "ยืนยันการชำระเงินแล้ว"){
            this.textColer.push("text-success");
          }
          if(r.status == "การชำระเงินถูกยกเลิก"){
            this.textColer.push("text-danger");
          }
          if(r.status == "รอยืนยันการชำระเงิน") {
            this.textColer.push("text-dark");
          }
          this.Reservations.push(r);
        }
      }
    })
  }

  cancel(id: any, i:any) {
    console.log(id);
    if (window.confirm("คุณต้องการยกเลิกการจองนี้ใช่ไหม?")) {
      this.crudService.deleteReservation(id).subscribe((res) => {
        this.Reservations.splice(i, 1);
      });
    }
  }

}
