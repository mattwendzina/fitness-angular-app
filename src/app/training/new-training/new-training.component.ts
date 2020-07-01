import { UIService } from './../../shared/ui.service';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    trainingExercises: Exercise[];
    private trainingSub: Subscription;
    isLoading: boolean;
    isLoading$: Observable<boolean>;

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromRoot.State>
    ) {}

    ngOnInit(): void {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.trainingSub = this.trainingService.exercisesChanged.subscribe(
            (exercises) => {
                this.trainingExercises = exercises;
            }
        );
        this.fetchExercises();
    }

    ngOnDestroy() {
        if (this.trainingSub) {
            this.trainingSub.unsubscribe();
        }
    }

    onStartTraining(form: NgForm) {
        if (!form.value.exercise) {
            window.alert('Please choose a workout!');
            return;
        }
        const currentExercise = this.trainingExercises.find((exercise) => {
            return exercise.name === form.value.exercise;
        });

        this.trainingService.startExercise(currentExercise);
    }

    fetchExercises() {
        this.trainingService.fetchAvailableExercises();
    }
}
