import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgForm } from '@angular/forms';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'll',
        monthYearLabel: 'MMM YYYY',
        // dateA11yLabel: "LL",
        // monthYearA11yLabel: "MM YYYY",
    },
};

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class SignupComponent implements OnInit {
    isLoading$: Observable<boolean>;
    hide = true;
    maxDate: Date;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) {}

    ngOnInit(): void {
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    }

    onSubmit(form: NgForm) {
        this.authService.registerUser({
            email: form.value.email,
            password: form.value.password,
        });
    }
}
