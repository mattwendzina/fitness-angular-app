import { UIService } from './../shared/ui.service';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    exerciseToggled = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    exerciseHistoryChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private currentSelectedExercise: Exercise;
    private firebaseSubcriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.firebaseSubcriptions.push(
            this.db
                .collection('availableExercises')
                .snapshotChanges()
                .pipe(
                    map((docArray) => {
                        return docArray.map((doc) => {
                            return {
                                id: doc.payload.doc.id,
                                ...(doc.payload.doc.data() as {}),
                            };
                        });
                    })
                )
                .subscribe(
                    (exercises: Exercise[]) => {
                        this.availableExercises = exercises;
                        this.exercisesChanged.next([
                            ...this.availableExercises,
                        ]);
                        this.store.dispatch(new UI.StopLoading());
                    },
                    (error) => {
                        this.store.dispatch(new UI.StopLoading());
                        this.uiService.showSnackBar(error, null, {
                            duration: 3000,
                        });
                    }
                )
        );
    }

    getCurrentExercise() {
        return { ...this.currentSelectedExercise };
    }

    // getExerciseHistory() {
    //   console.log(this.exerciseHistory);
    //   debugger;
    //   return this.exerciseHistory.slice();
    // }

    startExercise(selectedExercise: Exercise) {
        // This below syntax allows you to select single documents and then manipulate them, e.g. by doing an update on them. In this case, adding a 'lastSelected' property and setting it to the current date
        this.db
            .doc('availableExercises/' + selectedExercise.id)
            .update({ lastSelected: new Date() });

        // currentSelectedExercise needs to be set in the service. Reason being, currentTraining component is activated as a result of the below 'next' operator. Therefore, can't set up a subscription on the currentTranining component because it needs access straight away. So currentSelectedExercise is set in this service, and currentTranining can run the getCurrentExercise() method in it's ngOninit to ensure it actually gets the exercise.
        this.currentSelectedExercise = selectedExercise;
        this.exerciseToggled.next({ ...this.currentSelectedExercise });
    }

    exerciseComplete() {
        this.addDataToDatabase({
            ...this.currentSelectedExercise,
            date: new Date(),
            state: 'Completed',
        });
    }

    quitUnfinishedExercise(progress: number) {
        const duration = this.currentSelectedExercise.duration - progress;
        this.addDataToDatabase({
            ...this.currentSelectedExercise,
            duration: duration,
            calories: Math.round(
                this.currentSelectedExercise.calories *
                    (duration / this.currentSelectedExercise.duration)
            ),
            date: new Date(),
            state: 'Cancelled',
        });
        this.exerciseToggled.next();
        this.currentSelectedExercise = null;
    }

    finishCurrentExercise() {
        this.currentSelectedExercise = null;
        this.exerciseToggled.next();
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('exerciseHistory').add(exercise);
        this.fetchExerciseHistory();
    }

    fetchExerciseHistory(): void {
        this.firebaseSubcriptions.push(
            this.db
                .collection('exerciseHistory')
                .valueChanges()
                .subscribe(
                    (exercises: Exercise[]) => {
                        this.exerciseHistoryChanged.next([...exercises]);
                    },
                    (error) => {
                        console.log('ERROR: ', error);
                    }
                )
        );
    }

    cancelSubscriptions() {
        this.firebaseSubcriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
