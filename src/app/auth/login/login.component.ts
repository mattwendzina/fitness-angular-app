import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    isLoading$: Observable<boolean>;
    loginForm: FormGroup;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl('', {
                validators: [Validators.required],
            }),
        });
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    }

    onSubmit() {
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
        });
    }
}
