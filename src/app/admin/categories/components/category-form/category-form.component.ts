// dumb component - just to interact with the UI

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MyValidators } from '../../../../utils/validators';
import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories.service';
// CategoriesService must be part of an smart component,
// but is here because of the async validation,
// this is an exception to the rule

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<string>;
  isNew: boolean = true;

  @Input()
  set category(data: Category) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        MyValidators.validateCategory(this.categoriesService),
      ],
      image: ['', Validators.required],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      if (!this.isNew) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile(event) {
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImage$ = ref.getDownloadURL();
          urlImage$.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }
}
