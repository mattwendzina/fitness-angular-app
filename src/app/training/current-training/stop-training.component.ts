import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-stop-training",
  template: `
    <h1 mat-dialog-title>Would you like to continue?</h1>
    <mat-dialog-content>
      <p>You got {{ passedData.timeLeft }} seconds left</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Continue</button>
      <button mat-button [mat-dialog-close]="true">Quit</button>
    </mat-dialog-actions>
  `,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
