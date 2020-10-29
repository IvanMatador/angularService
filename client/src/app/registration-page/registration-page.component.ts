import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();
    this.aSub = this.auth.register(this.form.value)
    .subscribe(
      ()=>{
        this.router.navigate(
          ['/login'],{queryParams: {registered: true}}
           )
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }

}
