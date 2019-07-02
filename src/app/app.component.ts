import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 loggedIn= false;
 email:any = "";
  constructor(private autorizacionService: AutorizacionService){
    this.autorizacionService.isLogged()
    .subscribe((result)=>{
      if(result && result.uid) {
        this.loggedIn = true;
        this.email = "";
        setTimeout(() => {
          this.getData();
          console.log(this.email);
        }, 500);
      }
      else {
        this.loggedIn = false;
      }
    }, (error)=>{
      this.loggedIn = false;
    })
  }
  logout() {
    this.autorizacionService.logout();
  }
  getData() {
    var user = this.autorizacionService.getUser();
    this.email = user.email;
  }
}
