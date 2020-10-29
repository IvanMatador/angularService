import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){
        //Message obowt enter to the site
        MaterialService.toast('Now you can autorize with this data');
      } else if(params['accessDenied']) {
        //Message First login please
        MaterialService.toast('First login please');
      } else if(params['sessionFailed']) {
        MaterialService.toast('Session is ending');
      }
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe();
    }

  }

  onSubmit(){
    this.form.disable()
    /* const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }  this.form.value it is "user" under this comment*/
    this.aSub = this.auth.login(/* "user" === */this.form.value)
    .subscribe(() => this.router.navigate(['/overview']),
    error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    }
    );
  }

}
