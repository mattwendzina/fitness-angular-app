import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthModule } from './auth/auth.module';
import { environment } from './../environments/environment';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AuthModule,
        AngularFirestoreModule,
        StoreModule.forRoot(reducers),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
