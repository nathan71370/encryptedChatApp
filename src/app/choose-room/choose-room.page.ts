import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.page.html',
  styleUrls: ['./choose-room.page.scss'],
})
export class ChooseRoomPage implements OnInit {
  username;
  roomName;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  setUsernamePassword() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
        roomName: this.roomName
      }
    };
    this.router.navigate(['chat'], navigationExtras);
  }

  logoutUser() {
    firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }

}
