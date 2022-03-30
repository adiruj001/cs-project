import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {

  imageResPath = "http://localhost:9999/pictures/reservation.png";

  constructor() { }

  ngOnInit(): void {
  }

}
