import { MatDialog } from '@angular/material/dialog';
import { UIService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginFailureComponent } from './login/login-failure.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuth = false;
    userAuthorized = new Subject<boolean>();
    isLoading = new EventEmitter();

    constructor(
        private router: Router,
        private angularFireAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private dialog: MatDialog,
        private store: Store<fromRoot.State>
    ) {}

    initAuthListener() {
        this.angularFireAuth.authState.subscribe((user) => {
            if (user) {
                this.isAuth = true;
                this.userAuthorized.next(true);
                this.router.navigate(['']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuth = false;
                this.userAuthorized.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.angularFireAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(
                (result) => {
                    this.store.dispatch(new UI.StopLoading());
                    console.log(result);
                },
                (error) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackBar(error.message, null, {
                        duration: 3000,
                    });
                }
            );
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.angularFireAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(
                (result: firebase.auth.UserCredential) => {
                    this.store.dispatch(new UI.StopLoading());
                    console.log(result);
                },
                (error) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.dialog.open(LoginFailureComponent, {
                        data: error,
                    });
                }
            );
    }

    logout() {
        this.angularFireAuth.auth.signOut();
    }

    isUserAuthenticated() {
        return this.isAuth;
    }
}
