import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyADkn66ZHUqFnwNQEb4h9PT1FFehWD-wmY',
  authDomain: 'private-chat-app-490c3.firebaseapp.com',
  databaseURL: 'https://private-chat-app-490c3.firebaseio.com',
  projectId: 'private-chat-app-490c3',
  storageBucket: 'private-chat-app-490c3.appspot.com',
  messagingSenderId: '122861142594',
  appId: '1:122861142594:web:1178f5e813e4e5d42363db',
  measurementId: 'G-DP0ZG6HE06'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
      firebase.initializeApp(firebaseConfig);
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
