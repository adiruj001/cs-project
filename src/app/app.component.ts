import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from './service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cs-project';

  UserNowLogin:any = [];
  CheckLogin = localStorage.getItem("isLogin");
  CheckLoginType = localStorage.getItem("loginType");

  constructor(
    private crudService: CrudService,
    private ngZone: NgZone,
    public router: Router
  ) {}
  
  ngOnInit(): void {
    if(this.CheckLogin == "yes") {
      if(this.CheckLoginType == "user") {
        this.crudService.getMember(localStorage.getItem("userCurrentlyLogin")).subscribe(res => {
          this.UserNowLogin = res;
        })
      }
      else {
        this.crudService.getAdmin(localStorage.getItem("userCurrentlyLogin")).subscribe(res => {
          this.UserNowLogin = res;
        })
      }
    }
  }

  getUserLogin(id: any, type:string){
    if(type == "user") {
      this.crudService.getMember(id).subscribe(res => {
        this.UserNowLogin = res;
        localStorage.setItem("userCurrentlyLogin", this.UserNowLogin._id);
        localStorage.setItem("loginType", this.UserNowLogin.type);
        localStorage.setItem("passenger", this.UserNowLogin.member_firstname + " " + this.UserNowLogin.member_lastname);
        localStorage.setItem("member_tel", this.UserNowLogin.member_tel);
      });
    }
    else {
      this.crudService.getAdmin(id).subscribe(res => {
        this.UserNowLogin = res;
        localStorage.setItem("userCurrentlyLogin", this.UserNowLogin._id);
        localStorage.setItem("loginType", this.UserNowLogin.type);
      });
    }
    localStorage.setItem("isLogin", "yes");
  }

  logout() {
    if(window.confirm("คุณต้องการออกจากระบบใช่ไหม?")) {
      this.UserNowLogin = [];
      localStorage.removeItem("userCurrentlyLogin");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("loginType");
      localStorage.removeItem("member_id");
      localStorage.removeItem("passenger");
      localStorage.removeItem("member_tel");
      localStorage.removeItem("date");
      localStorage.removeItem("time");
      localStorage.removeItem("vanline");
      localStorage.removeItem("pickup");
      localStorage.removeItem("destination");
      localStorage.removeItem("status");
      localStorage.removeItem("amount");
      localStorage.removeItem("price");
      console.log("Logout successfully!");
      this.ngZone.run(() => this.router.navigateByUrl('/login-page'));
    }
  }

}
