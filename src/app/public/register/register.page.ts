import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  // For ease in reference
  public error = {
    name: '',
    email: '',
    password: ''
  };

  public registering = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private db: DatabaseService
    ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], authService.emailAvailable.bind(this.authService)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {updateOn: 'blur'});
  }

  ngOnInit() {
  }

  register() {
    const email = this.registerForm.get('email').value;
    // If user gets past the initial checks
    if (!this.registerForm.valid) return;
    this.authService.register(this.registerForm.get('name').value, email, this.registerForm.get('password').value)
    .then(() => {
      this.registering = false;
      this.registerForm.reset();
      // Make place in database
      this.db.createNewUser(email);
    }).catch(err => {
      // TODO: Make Error Feedback
      this.registering = false;
      console.log(err);
    });
  }

  // Getters
  get name():AbstractControl {
    return this.registerForm.get('name');
  }
  get email():AbstractControl {
    return this.registerForm.get('email');
  }
  get password():AbstractControl {
    return this.registerForm.get('password');
  }


}