import { Component, OnInit } from '@angular/core';
import { NativeBiometric, BiometryType } from 'capacitor-native-biometric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'biometric-test';
  username: any;
  password: any;

  ngOnInit(): void {
    this.performBiometricVerification()
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  async performBiometricVerification() {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      reason: 'For easy log in',
      title: 'Autenticação biométrica',
      subtitle: 'Subtitle teste',
      description: 'Descrição teste',
    })
      .then(() => true)
      .catch(() => false);

    if (!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: 'www.example.com',
    });

    const username = credentials.username;
    const password = credentials.password;
  }

}
