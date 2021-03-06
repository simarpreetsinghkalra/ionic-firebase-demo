import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  errorMessage = '';

  validationForm: FormGroup;
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.'}
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 6 characters long.'}
    ]
  };

  constructor(private authService: AuthService, private navCtrl: NavController, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.navigateForward(['/chat']);
    }, err => {
      this.errorMessage = err.message;
      console.log(err);
    });
  }

  goRegisterPage() {
    this.navCtrl.navigateForward(['/register']);
  }
}
