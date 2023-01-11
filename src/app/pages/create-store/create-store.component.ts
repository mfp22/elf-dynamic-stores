import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreManagementRepository } from '../../state/stores-management.repository';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z!-]*')],
    }),
  });

  createStore$ = this.storeManagementRepository.createStore$;

  constructor(private storeManagementRepository: StoreManagementRepository) {}

  ngOnInit() {}
}
