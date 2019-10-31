import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;
  constructor(
      private alertCtrl: AlertController,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  ngOnInit() {}

  resetPasswordTry(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
          'Form is not valid yet, current value:', resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.resetPassword(email).then(
          async () => {
            const alert = await this.alertCtrl.create({
              message: 'Check your email for a password reset link',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                    this.router.navigateByUrl('home');
                  },
                },
              ],
            });
            await alert.present();
          },
          async error => {
            const errorAlert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await errorAlert.present();
          }
      );
    }
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
