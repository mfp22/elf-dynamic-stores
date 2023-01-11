import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreManagementRepository } from 'src/app/state/stores-management.repository';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
})
export class CreateEntityComponent {
  form = new FormGroup({
    store: new FormControl('', [Validators.required]),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  storeList$ = this.storeManagementRepository.registry.ids$;

  createEntity$ = this.storeManagementRepository.createEntity$;

  constructor(private storeManagementRepository: StoreManagementRepository) {}
}
