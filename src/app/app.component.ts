import { Component, NgZone } from '@angular/core';
import { CrudService } from './service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cs-project';

  UserNowLogin:any = [];

  getUserLogin(id: any){
    this.crudService.getMember(id).subscribe(res => {
      this.UserNowLogin = res;
    })
  }

  constructor(
    private crudService: CrudService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  logout() {
    if(window.confirm("คุณต้องการออกจากระบบใช่ไหม?")) {
      this.UserNowLogin = [];
      console.log("Logout successfully!");
      this.ngZone.run(() => this.router.navigateByUrl('/login-page'));
    }
  }

}
