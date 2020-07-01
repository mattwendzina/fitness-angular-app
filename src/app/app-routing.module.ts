import { AuthGuard } from "./auth/auth.guard";

import { WelcomeComponent } from "./welcome/welcome.component";
import { NgModule, OnInit } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  {
    path: "training",
    loadChildren: () =>
      import("./training/training.module").then(
        (module) => module.TrainingModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule implements OnInit {
  ngOnInit() {}
}
