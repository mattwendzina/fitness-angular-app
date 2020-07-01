import { Subscription } from "rxjs";
import { Exercise } from "./../exercise.model";
import { TrainingService } from "./../training.service";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ["date", "name", "calories", "duration", "state"];
  dataSource = new MatTableDataSource<Exercise>();
  exerciseHistoryChangedSub: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseHistoryChangedSub = this.trainingService.exerciseHistoryChanged.subscribe(
      (exercises) => {
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchExerciseHistory();
  }

  ngOnDestroy(): void {
    if (this.exerciseHistoryChangedSub) {
      this.exerciseHistoryChangedSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
