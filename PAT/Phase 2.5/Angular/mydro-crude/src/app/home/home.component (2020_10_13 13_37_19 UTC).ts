import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _rights: number | string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    // console.log("why")
    // setTimeout(() => {
    //   console.log(this.auth.isLoggedIn && !this.auth.hasDetails)
    // }, 3000)
    this._rights = this.auth.rights;
  }
  get rights() {
    return this._rights;
  }

}
