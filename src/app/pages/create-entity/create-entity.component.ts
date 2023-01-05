import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StoreManagementRepository } from 'src/app/state/stores-management.repository';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
})
export class CreateEntityComponent implements OnInit {
  form = new FormGroup({
    store: new FormControl('', [Validators.required]),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  storeList$: Observable<string[]>;

  constructor(private storeManagementRepository: StoreManagementRepository) {}

  ngOnInit() {
    this.storeList$ = this.storeManagementRepository.registry$;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { value } = this.form;

    const entity = {
      title: value.title,
      id: Date.now(),
    };

    this.storeManagementRepository.upsertToStore(value.store, entity);

    this.form.reset();
  }
}
