import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { deleteEntities, getAllEntities, upsertEntities, withEntities } from '@ngneat/elf-entities';
import { selectAllEntities } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { map } from 'rxjs';

const registry = createStore({ name: 'registry' }, withEntities<{ id: string }>());

const stores = {};

export const persist = [
  persistState(registry, {
    key: 'registry',
    storage: localStorageStrategy,
  }),
];

@Injectable({ providedIn: 'root' })
export class StoreManagementRepository {
  registry$ = registry.pipe(
    selectAllEntities(),
    map((entities) => entities.map((entity) => entity.id))
  );

  constructor() {
    const names = this.getStoresNames();

    if (names?.length > 0) {
      names.forEach((name) => {
        this.createStore(name);
      });
    }
  }

  createStore(name: string) {
    stores[name] = createStore({ name }, withEntities<any>());
    persist.push(
      persistState(stores[name], {
        key: name,
        storage: localStorageStrategy,
      })
    );

    registry.update(upsertEntities({ id: name }));
  }

  deleteFromStore(store: string, entities: any) {
    stores[store].update(deleteEntities(entities));
  }

  getStoresNames() {
    return registry.getValue().ids;
  }

  selectAll(store: string) {
    return stores[store].pipe(selectAllEntities());
  }

  upsertToStore(store: string, data: any) {
    stores[store].update(upsertEntities(data));
  }
}
