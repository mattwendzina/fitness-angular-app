import { TrainingService } from "./training.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit, OnDestroy {
  trainingSessionActive = false;
  currentExercise: Exercise;
  exerciseSub: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.exerciseToggled.subscribe(
      (exerciseSelected) => {
        if (exerciseSelected) {
          this.trainingSessionActive = true;
          this.currentExercise = exerciseSelected;
        } else {
          this.trainingSessionActive = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }
}
