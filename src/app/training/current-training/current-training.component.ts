import { Exercise } from "./../exercise.model";
import { TrainingService } from "./../training.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StopTrainingComponent } from "./stop-training.component";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"],
})
export class CurrentTrainingComponent implements OnInit {
  currentExercise: Exercise;

  motivationalMessages = [
    { name: "Lets go!", id: 0 },
    { name: "Keep on going, you've got this!", id: 1 },
    { name: "Awesome, you made it!", id: 2 },
  ];

  time: number;
  exerciseLength: number;
  interval: number;
  spinnerProgress = 100;
  currentMotivationalMessageId = 0;
  timer: number;
  timerStarted = false;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.currentExercise = this.trainingService.getCurrentExercise();
    this.time = this.currentExercise.duration;
    this.interval = 100 / this.time;
    this.startTimer();
  }

  startTimer() {
    if (this.time === this.currentExercise.duration) {
      this.currentMotivationalMessageId = 0;
    }
    this.timerStarted = true;
    this.timer = window.setInterval(() => {
      if (this.time > 1) {
        if (this.time === Math.round(this.currentExercise.duration / 2)) {
          this.currentMotivationalMessageId = 1;
        }
        this.time -= 1;
        this.spinnerProgress -= this.interval;
      } else {
        this.currentMotivationalMessageId = 2;
        clearInterval(this.timer);
        this.spinnerProgress = 100;
        this.time = this.currentExercise.duration;
        this.timerStarted = false;
        this.trainingService.exerciseComplete();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        timeLeft: this.time,
      },
    });

    dialogRef.afterClosed().subscribe((quitTraining) => {
      if (quitTraining) {
        this.trainingService.quitUnfinishedExercise(this.time);
        this.time = 100;
        this.currentMotivationalMessageId = 0;
      } else {
        this.startTimer();
      }
    });
  }

  restartTimer() {
    if (!this.time) {
      this.time = 100;
    }
    this.startTimer();
  }

  finishCurrentTraining() {
    this.trainingService.finishCurrentExercise();
  }
}
