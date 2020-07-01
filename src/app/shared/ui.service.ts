import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class UIService {
    constructor(private snackbar: MatSnackBar) {}

    showSnackBar(
        message: string,
        action: string,
        config: MatSnackBarConfig<any>
    ) {
        this.snackbar.open(message, action, config);
    }
}
