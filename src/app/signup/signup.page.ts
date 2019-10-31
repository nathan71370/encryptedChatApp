import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;
  constructor(
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  ngOnInit() {}

  async signupUserTry(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
          'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.signupUser(email, password).then(
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
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((newUserCredential: firebase.auth.UserCredential) => {
          firebase
              .firestore()
              .doc(`/userProfile/${newUserCredential.user.uid}`)
              .set({ email });
        })
        .catch(error => {
          console.error(error);
          throw new Error(error);
        });
  }

}
