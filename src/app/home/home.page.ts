import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username;
  roomName;
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor( public loadingCtrl: LoadingController,
               public alertCtrl: AlertController,
               private router: Router,
               private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
          email: ['',
              Validators.compose([Validators.required, Validators.email])],
          password: [
              '',
              Validators.compose([Validators.required, Validators.minLength(6)]),
          ],
      });
  }

    async loginUserTry(loginForm: FormGroup): Promise<void> {
        if (!loginForm.valid) {
            console.log('Form is not valid yet, current value:', loginForm.value);
        } else {
            this.loading = await this.loadingCtrl.create();
            await this.loading.present();

            const email = loginForm.value.email;
            const password = loginForm.value.password;

            this.loginUser(email, password).then(
                () => {
                    this.loading.dismiss().then(() => {
                        this.router.navigateByUrl('choose-room');
                    });
                },
                error => {
                    this.loading.dismiss().then(async () => {
                        const alert = await this.alertCtrl.create({
                            message: error.message,
                            buttons: [{ text: 'Ok', role: 'cancel' }],
                        });
                        await alert.present();
                    });
                }
            );
        }
    }



    loginUser(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }


}
