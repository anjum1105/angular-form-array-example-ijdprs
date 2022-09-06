import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <form [formGroup]="form">
      <input type="checkbox" formControlName="published"> Published
      <div *ngIf="form.controls.published.value">

        <h2>Credentials</h2>
        <button (click)="addCreds()">Add</button>

        <div formArrayName="credentials" *ngFor="let creds of form.controls.credentials?.value; let i = index">
          <ng-container [formGroupName]="i">
            <input placeholder="Username" formControlName="username">
            <input placeholder="Password" formControlName="password">
          </ng-container>
        </div>

      </div>
    </form>
  `,
})
export class AppComponent  {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      username: '',
      password: '',
    }));
  }
}
