# Angular Forms Course: Creating and Optimizing Web Forms

## Template Forms vs Reactive Forms

Template Forms

- Template-driven forms
- Template-based model
- Angular creates models like FormGroups and FormControls
- NgForm and NgModel Angular Directives

Reactive Forms

- Much more powerful and better performance
- Observable based
- Improves the type of data validation
- Used for complex Forms

## FormControl and its states

Import `ReactiveFormsModule` into the module that implements the reactive form:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 👈

import { AdminRoutingModule } from './admin-routing.module';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';

@NgModule({
declarations: [ NavComponent, BasicFormComponent],
imports: [
CommonModule,
AdminRoutingModule,
ReactiveFormsModule, 👈
MaterialModule,
]
})
export class AdminModule { }
```

Into the component ts file:

```ts
// src/app/admin/components/basic-form/basic-form.ts

import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms"; 👈

@Component({
  selector: "app-basic-form",
  templateUrl: "./basic-form.component.html",
  styleUrls: ["./basic-form.component.scss"],
})
export class BasicFormComponent implements OnInit {
  nameField = new FormControl("im a form control"); 👈

  constructor() {}

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => console.log(value)); // get value on every input change with an observable 👈
  }

  getNameValue() {
    console.log(this.nameField.value); // need a call to get value 👈
  }
}
```

To get the value and print it into the html file:

```html
<!-- src/app/admin/components/basic-form/basic-form.html -->

<p>
  {{nameField.value}}
  <input type="text" [formControl]="nameField" /> 👈
  <code><pre>{{nameField | json}}</pre></code> 👈
</p>
```

To get the value and print it into the console:

```html
<!-- src/app/admin/components/basic-form/basic-form.html -->

<p>
  {{nameField.value}}
  <input type="text" [formControl]="nameField" /> 👈
  <button (click)="getNameValue()">Get value</button> 👈
</p>
```

## Inputs and the importance of type

There are several types of input for every need. Each kind of input allows the user to insert the correct type of information in an easiest way.

Different types of input:

📖 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

To use the FormControl:

```
import { FormControl } from '@angular/forms';
```

The FormControl method has 3 properties: `FormControl(default, [sync], async);`

- The default value: `default`
- The synchronous value (`[sync]`) in this array could be one or many elements.
- The asynchronous value: `async`

Every field can be validated with a `Validator`

```
import { Validators } from '@angular/forms';
```

Into the component ts file:

```ts
// src/app/admin/components/basic-form/basic-form.ts

import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-basic-form",
  templateUrl: "./basic-form.component.html",
  styleUrls: ["./basic-form.component.scss"],
})
export class BasicFormComponent implements OnInit {
  nameField = new FormControl("", [
    Validators.required,
    Validators.maxLength(10),
  ]);
  emailField = new FormControl("");
  phoneField = new FormControl("");
  colorField = new FormControl("#000000");
  numberField = new FormControl("");
  dateField = new FormControl("");
  monthField = new FormControl("");
  passwordField = new FormControl("");
  priceField = new FormControl("50");
  weekField = new FormControl("");
  timefield = new FormControl("");
  searchField = new FormControl("");
  descriptionField = new FormControl("");
  urlField = new FormControl("");

  categoryField = new FormControl("");
  tagField = new FormControl("");

  agreeField = new FormControl(false);
  genderField = new FormControl("");
  zoneField = new FormControl("");

  constructor() {}

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => console.log(value));
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }
}
```

To get the value into the html file:

```html
<!-- src/app/admin/components/basic-form/basic-form.html -->

<p>
  Name: {{ nameField.valid }}
  <input
    [class.is-valid]="isNameFieldValid"
    [class.is-invalid]="isNameFieldInvalid"
    type="text"
    [formControl]="nameField"
  />
  <button [disabled]="isNameFieldInvalid" (click)="getNameValue()">
    Get value
  </button>
  <!-- <code><pre>{{nameField | json}}</pre></code> -->
</p>

<div class="messages" [class.active]="isNameFieldInvalid">
  <p>
    <strong *ngIf="nameField.touched && nameField.hasError('required')"
      >This field is required</strong
    >
  </p>
  <p>
    <strong *ngIf="nameField.hasError('maxlength')"
      >Name max length: 10 characters</strong
    >
  </p>
</div>

<p>
  Email: {{ emailField.value }}
  <input type="email" [formControl]="emailField" />
</p>

<p>
  Phone: {{ phoneField.value }}
  <input type="tel" [formControl]="phoneField" />
</p>

<p>
  Color: {{ colorField.value }}
  <input type="color" [formControl]="colorField" />
</p>

<p>
  Number: {{ numberField.value }}
  <input type="number" [formControl]="numberField" />
</p>

<p>
  Date: {{ dateField.value }}
  <input type="date" [formControl]="dateField" />
</p>

<p>
  Month: {{ monthField.value }}
  <input type="month" [formControl]="monthField" />
</p>

<p>
  Password: {{ passwordField.value }}
  <input type="password" [formControl]="passwordField" />
</p>

<p>
  Range Price: {{ priceField.value }}
  <input type="range" [formControl]="priceField" min="0" max="100" />
</p>

<p>
  Wekend: {{ weekField.value }}
  <input type="week" [formControl]="weekField" />
</p>

<p>
  Date and time: {{ timefield.value }}
  <input type="datetime-local" [formControl]="timefield" />
</p>

<p>
  Search: {{ searchField.value }}
  <input type="search" [formControl]="searchField" />
</p>

<p>
  Description: {{ descriptionField.value }}
  <textarea type="text" [formControl]="descriptionField"> </textarea>
</p>

<p>
  Url: {{ urlField.value }}
  <input type="url" [formControl]="urlField" />
</p>

<p>
  Category: {{ categoryField.value }}
  <select [formControl]="categoryField">
    <option value="category-1">Category 1</option>
    <option value="category-2">Category 2</option>
    <option value="category-3">Category 3</option>
  </select>
</p>

<p>
  Tags: {{ tagField.value }}
  <select [formControl]="tagField" multiple>
    <option value="tag-1">Tag 1</option>
    <option value="tag-2">Tag 2</option>
    <option value="tag-3">Tag 3</option>
  </select>
</p>

<p>
  Agree: {{ agreeField.value }}
  <input type="checkbox" [formControl]="agreeField" />
</p>

<p>
  Gender: {{ genderField.value }}
  <label for="">
    <input
      name="gender"
      type="radio"
      value="male"
      [formControl]="genderField"
    />
    Male
  </label>
  <label for="">
    <input
      name="gender"
      type="radio"
      value="female"
      [formControl]="genderField"
    />
    Female
  </label>
  <label for="">
    <input
      name="gender"
      type="radio"
      value="other"
      [formControl]="genderField"
    />
    Other
  </label>
</p>

<p>
  Zone: {{ zoneField.value }}
  <label for="">
    <input name="zone" type="radio" value="zone-1" [formControl]="zoneField" />
    Zone 1
  </label>
  <label for="">
    <input name="zone" type="radio" value="zone-2" [formControl]="zoneField" />
    Zone 2
  </label>
  <label for="">
    <input name="zone" type="radio" value="zone-3" [formControl]="zoneField" />
    Zone 3
  </label>
</p>
```

## FormGroup

All form fields can be group together into a `FormGroup`. For using it:

```
import { FormGroup } from '@angular/forms';
```

Into the component ts file:

```ts
// src/app/admin/components/basic-form/basic-form.ts

import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-basic-form",
  templateUrl: "./basic-form.component.html",
  styleUrls: ["./basic-form.component.scss"],
})
export class BasicFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(""),
    phone: new FormControl(""),
    color: new FormControl("#000000"),
    date: new FormControl(""),
    age: new FormControl(12),
    category: new FormControl(""),
    tag: new FormControl(""),
    agree: new FormControl(false),
    gender: new FormControl(""),
    zone: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  save(event) {
    console.log(this.form.value);
  }

  get nameField() {
    return this.form.get("name");
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get emailField() {
    return this.form.get("email");
  }

  get phoneField() {
    return this.form.get("phone");
  }

  get colorField() {
    return this.form.get("color");
  }

  get dateField() {
    return this.form.get("date");
  }

  get ageField() {
    return this.form.get("age");
  }

  get categoryField() {
    return this.form.get("category");
  }

  get tagField() {
    return this.form.get("tag");
  }

  get agreeField() {
    return this.form.get("agree");
  }

  get genderField() {
    return this.form.get("gender");
  }

  get zoneField() {
    return this.form.get("zone");
  }
}
```

To get the value into the html file:

```html
<!-- src/app/admin/components/basic-form/basic-form.html -->

<form [formGroup]="form" (ngSubmit)="save($event)">
  <p>
    Name: {{ nameField.value }} {{ nameField.valid }}
    <input
      [class.is-valid]="isNameFieldValid"
      [class.is-invalid]="isNameFieldInvalid"
      type="text"
      formControlName="name"
    />
    <button [disabled]="nameField.invalid" (click)="getNameValue()">
      Get value
    </button>
  </p>
  <div class="messages" [class.active]="isNameFieldInvalid">
    <p>
      <strong *ngIf="nameField.touched && nameField.hasError('required')"
        >Este campo es requerido</strong
      >
    </p>
    <p>
      <strong *ngIf="nameField.touched && nameField.hasError('maxlength')"
        >debe tener maximo 10 c</strong
      >
    </p>
  </div>
  <p>
    Email: {{ emailField.value }}
    <input type="email" formControlName="email" />
  </p>
  <p>
    Phone: {{ phoneField.value }}
    <input type="tel" formControlName="phone" />
  </p>
  <p>
    Color: {{ colorField.value }}
    <input type="color" formControlName="color" />
  </p>
  <p>
    Date: {{ dateField.value }}
    <input type="date" formControlName="date" />
  </p>
  <p>
    Phone: {{ ageField.value }}
    <input type="number" formControlName="age" />
  </p>
  <p>
    Category: {{ categoryField.value }}
    <select formControlName="category">
      <option value="category-1">Category 1</option>
      <option value="category-2">Category 2</option>
      <option value="category-3">Category 3</option>
      <option value="category-4">Category 4</option>
    </select>
  </p>
  <p>
    Tags: {{ tagField.value }}
    <select formControlName="tag" multiple>
      <option value="tag-1">Tag 1</option>
      <option value="tag-2">Tag 2</option>
      <option value="tag-3">Tag 3</option>
      <option value="tag-4">Tag 4</option>
    </select>
  </p>
  <p>
    Agree: {{ agreeField.value }}
    <input type="checkbox" formControlName="agree" />
  </p>
  <p>
    Gender: {{ genderField.value }}
    <label>
      <input name="gender" value="male" type="radio" formControlName="gender" />
      Male
    </label>
    <label>
      <input
        name="gender"
        value="female"
        type="radio"
        formControlName="gender"
      />
      Female
    </label>
    <label>
      <input
        name="gender"
        value="other"
        type="radio"
        formControlName="gender"
      />
      Other
    </label>
  </p>
  <p>
    Zone: {{ zoneField.value }}
    <label>
      <input name="zone" value="zone-1" type="radio" formControlName="zone" />
      Zona 1
    </label>
    <label>
      <input name="zone" value="zone-2" type="radio" formControlName="zone" />
      Zona 2
    </label>
    <label>
      <input name="zone" value="zone-3" type="radio" formControlName="zone" />
      Zona 3
    </label>
  </p>
  <p>
    <button type="submit">Enviar</button>
  </p>
</form>
```

## FormGroup, Validators and Angular material

`FormBuilder` is anogther service to build forms in Angular

```
import { FormBuilder } from '@angular/forms';
```

Into the component ts file:

```ts
// src/app/admin/components/basic-form/basic-form.ts

import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "app-basic-form",
  templateUrl: "./basic-form.component.html",
  styleUrls: ["./basic-form.component.scss"],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    // view one field changes with an observable
    //
    // this.nameField.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
    //
    // view all form changes with an observable
    //
    // this.form.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  save(event) {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: [
          "",
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^[a-zA-Z ]+$/),
          ],
        ],
        last: [
          "",
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^[a-zA-Z ]+$/),
          ],
        ],
      }),
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      color: ["#000000"],
      date: [""],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [""],
      tag: [""],
      agree: [false, [Validators.requiredTrue]],
      gender: [""],
      zone: [""],
    });
  }

  get nameField() {
    return this.form.get("fullName.name");
  }

  get lastField() {
    return this.form.get("fullName.last");
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get emailField() {
    return this.form.get("email");
  }

  get phoneField() {
    return this.form.get("phone");
  }

  get colorField() {
    return this.form.get("color");
  }

  get dateField() {
    return this.form.get("date");
  }

  get ageField() {
    return this.form.get("age");
  }

  get categoryField() {
    return this.form.get("category");
  }

  get tagField() {
    return this.form.get("tag");
  }

  get agreeField() {
    return this.form.get("agree");
  }

  get genderField() {
    return this.form.get("gender");
  }

  get zoneField() {
    return this.form.get("zone");
  }

  getNameErrorMessage() {
    if (this.nameField.hasError("required")) {
      return "You must enter a value";
    }

    if (this.nameField.hasError("maxlength")) {
      return "Max length is 10 characters";
    }

    if (this.nameField.hasError("pattern")) {
      return "Do not use special characters";
    }
  }
}
```

To get the value into the html file:

```html
<!-- src/app/admin/components/basic-form/basic-form.html -->

<form [formGroup]="form" (ngSubmit)="save($event)">
  <div formGroupName="fullName">
    <mat-form-field appearance="fill">
      <mat-label>Name:</mat-label>
      <input matInput type="text" formControlName="name" />
      <mat-error *ngIf="nameField.invalid">{{getNameErrorMessage()}}</mat-error>
      <mat-icon matSuffix *ngIf="isNameFieldValid">done</mat-icon>
      <mat-icon matSuffix *ngIf="isNameFieldInvalid">close</mat-icon>
    </mat-form-field>
    <p>
      Last Name: {{ lastField.value }} {{ lastField.valid }}
      <input type="text" formControlName="last" />
    </p>
  </div>
  <p>
    Email: {{ emailField.value }}
    <input type="email" formControlName="email" />
  </p>
  <div
    class="messages"
    [class.active]="emailField.touched && phoneField.invalid"
  >
    <p>
      <strong *ngIf="emailField.hasError('required')">
        Este campo es requerido
      </strong>
    </p>
    <p>
      <strong *ngIf="emailField.hasError('email')">
        Esto no es un emial valido
      </strong>
    </p>
  </div>
  <p>
    Age: {{ ageField.value }}
    <input type="number" formControlName="age" />
  </p>
  <div class="messages" [class.active]="ageField.touched && ageField.invalid">
    <p>
      <strong *ngIf="ageField.hasError('required')"
        >Este campo es requerido</strong
      >
    </p>
    <p>
      <strong *ngIf="ageField.hasError('min')">Debe ser mayor de edad</strong>
    </p>
    <p>
      <strong *ngIf="ageField.hasError('max')"
        >Debe ser menor de 100 años</strong
      >
    </p>
  </div>
  <p>
    Phone: {{ phoneField.value }}
    <input type="tel" formControlName="phone" />
  </p>
  <div
    class="messages"
    [class.active]="phoneField.touched && phoneField.invalid"
  >
    <p>
      <strong *ngIf="phoneField.touched && phoneField.hasError('required')"
        >Este campo es requerido</strong
      >
    </p>
  </div>
  <p>
    Color: {{ colorField.value }}
    <input type="color" formControlName="color" />
  </p>
  <mat-form-field appearance="fill">
    <mat-label>Date</mat-label>
    <input matInput formControlName="date" [matDatepicker]="picker" />
    <mat-hint>MM/DD/YYYY</mat-hint>
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
  <p>
    Phone: {{ ageField.value }}
    <input type="number" formControlName="age" />
  </p>
  <p>
    Category: {{ categoryField.value }}
    <select formControlName="category">
      <option value="category-1">Category 1</option>
      <option value="category-2">Category 2</option>
      <option value="category-3">Category 3</option>
      <option value="category-4">Category 4</option>
    </select>
  </p>
  <p>
    Tags: {{ tagField.value }}
    <select formControlName="tag" multiple>
      <option value="tag-1">Tag 1</option>
      <option value="tag-2">Tag 2</option>
      <option value="tag-3">Tag 3</option>
      <option value="tag-4">Tag 4</option>
    </select>
  </p>
  <p>
    Agree: {{ agreeField.value }}
    <input type="checkbox" formControlName="agree" />
  </p>
  <p>
    Gender: {{ genderField.value }}
    <label>
      <input name="gender" value="male" type="radio" formControlName="gender" />
      Male
    </label>
    <label>
      <input
        name="gender"
        value="female"
        type="radio"
        formControlName="gender"
      />
      Female
    </label>
    <label>
      <input
        name="gender"
        value="other"
        type="radio"
        formControlName="gender"
      />
      Other
    </label>
  </p>
  <p>
    Zone: {{ zoneField.value }}
    <label>
      <input name="zone" value="zone-1" type="radio" formControlName="zone" />
      Zona 1
    </label>
    <label>
      <input name="zone" value="zone-2" type="radio" formControlName="zone" />
      Zona 2
    </label>
    <label>
      <input name="zone" value="zone-3" type="radio" formControlName="zone" />
      Zona 3
    </label>
  </p>
  <p>
    <button type="submit">Enviar</button>
  </p>
</form>
```

## Form creation recomendations

- Forms should be one column
- Top align labels
- Group labels with their inputs
- Avoid all caps
- Show all selection options if under 6
- Resist using placeholder text as labels
- Place checkboxes (and radios) underneath each other for scannability
- Make Call To Aactions descriptive
- Specify errors inline
- Use inline validation after the user fills out the field (unless it helps them while in the process)
- Don’t hide basic helper text
- Differentiate primary from secondary actions
- Use field length as an affordance
- Ditch the \* and denote optional fields
- Group related information

Description of every point can be seen here:

📖 https://medium.com/nextux/design-better-forms-96fadca0f49c

## Custom validators

Custom validators can be created as follows:

First, create a `validator.ts` file:

```ts
import { AbstractControl } from "@angular/forms"; 👈

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl) { 👈
    const value = control.value;
    if (!containsNumber(value)) {
      return { invalid_password: true };
    }
    return null;
  }
}

function containsNumber(value: string): boolean { 👈
  return value.split("").some(isNumber);
}

function isNumber(value: string) { 👈
  return !isNaN(parseInt(value, 10));
}
```

This custom validator must be imported into the component ts file:

```ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./../../../core/services/auth.service";
import { MyValidators } from "../../../utils/validators"; 👈

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password).then(() => {
        this.router.navigate(["/auth/login"]);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword, 👈
        ],
      ],
    });
  }
}
```

And must be implemented into the component html file:

```html
...

<mat-form-field>
  <mat-label>Password</mat-label>
  <input
    placeholder="password"
    formControlName="password"
    matInput
    type="password"
  />
  <div *ngIf="form.get('password').touched && form.get('password').invalid"> 👈
    <mat-error *ngIf="form.get('password').hasError('invalid_password')" 👈
      >Must contain at least one number</mat-error 👈
    >
  </div>
</mat-form-field>

...
```
