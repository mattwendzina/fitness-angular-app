import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { LoginFailureComponent } from "./login/login-failure.component";
import { AngularFireAuthModule } from "angularfire2/auth";

@NgModule({
  declarations: [SignupComponent, LoginComponent, LoginFailureComponent],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule,
  ],
  exports: [],
  entryComponents: [LoginFailureComponent],
})
export class AuthModule {}
