import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-login-failure",
  template: `
    <h1 mat-dialog-title>Error Logging in</h1>
    <mat-dialog-content>
      <p>{{ errorData.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="accent" [mat-dialog-close]>
        Try again
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ["./login-failure.component.css"],
})
export class LoginFailureComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public errorData: any) {}
}
