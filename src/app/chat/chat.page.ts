import {Component, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'firebase/app';
import {AlertController, IonContent} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AES256 } from '@ionic-native/aes-256/ngx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messagesList =  [];
  name;
  newmessage;
  roomName;
  ref;
  private secureKey: string;
  private secureIV: string;

  @ViewChild(IonContent, {static: false}) content: IonContent;
    // tslint:disable-next-line:max-line-length
  constructor(private alert: AlertController, private route: ActivatedRoute, private router: Router, private aes256: AES256) {
  }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
              this.name = this.router.getCurrentNavigation().extras.state.username;
              this.roomName = this.router.getCurrentNavigation().extras.state.roomName;
              this.ref = firebase.database().ref('chatrooms/' + this.roomName);
              this.ref.on('value', data => {
                  const messagesListTemp = snapshotToArray(data);
                  for (const element of messagesListTemp) {
                      this.aes256.decrypt(element.secureKey, element.secureIV, element.message)
                          .then(res => this.messagesList.push({
                              name: element.name,
                              message: res,
                              key: element.key
                          }))
                          .catch((error: any) => console.error(error));
                  }
                  setTimeout(() => {
                      this.content.scrollToBottom(200);
                  });
              });
          }
      });
  }

  send() {
      this.generateSecureKeyAndIV();
      this.aes256.encrypt(this.secureKey, this.secureIV, this.newmessage)
          .then(res => this.ref.push({
              name: this.name,
              message: res,
              secureKey: this.secureKey,
              secureIV: this.secureIV
          }))
          .catch((error: any) => console.error(error));
      this.newmessage = '';
      setTimeout(() => {
        this.content.scrollToBottom(200);
      });
  }

    async generateSecureKeyAndIV() {
        this.secureKey = await this.aes256.generateSecureKey('?D(G+KbPeShVmYq3t6w9z$B&E)H@McQf'); // Returns a 32 bytes string
        this.secureIV = await this.aes256.generateSecureIV('?D(G+KbPeShVmYq3t6w9z$B&E)H@McQf'); // Returns a 16 bytes string
    }


    logoutUser() {
        firebase.auth().signOut();
        this.router.navigateByUrl('login');
    }
}
export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
