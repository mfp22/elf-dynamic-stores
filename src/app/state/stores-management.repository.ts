import { inject, Injectable } from '@angular/core';
import { adapt } from '@state-adapt/angular';
import { createEntityAdapter, createEntityState, EntityState } from '@state-adapt/core/adapters';
import { Adapt, toSource } from '@state-adapt/rxjs';
import { filter, map, Subject } from 'rxjs';
import { mapEachWithEffect } from '../map-each-with-effect.function';

type RegistryStore = { id: string };
const registryAdapter = createEntityAdapter<RegistryStore>()({});

type Entity = { id: number; title: string };
const storeAdapter = createEntityAdapter<Entity>()({});

@Injectable({ providedIn: 'root' })
export class StoreManagementRepository {
  adapt = inject(Adapt);

  createStore$ = new Subject<[string, boolean]>();
  createStoreValid$ = this.createStore$.pipe(
    filter(([, valid]) => valid),
    map(([value]) => ({ id: value })),
    toSource('createStore$')
  );

  defaultInitialState = createEntityState<RegistryStore>();
  initialRegistryState = (JSON.parse(localStorage.getItem('registry')) ||
    this.defaultInitialState) as EntityState<RegistryStore>;

  registry = adapt(['registry', this.initialRegistryState, registryAdapter], {
    addOne: this.createStoreValid$,
  });
  sub = this.registry.state$.subscribe((state) => localStorage.setItem('registry', JSON.stringify(state)));

  createEntity$ = new Subject<[{ store?: string; title?: string }, boolean]>();
  createEntityValid$ = this.createEntity$.pipe(
    filter(([, valid]) => valid),
    map(([value]) => ({
      ...value,
      entity: {
        title: value.title,
        id: Date.now(),
      },
    }))
  );

  stores$ = mapEachWithEffect(this.registry.ids$, (id) => {
    const createEntityForThisStore$ = this.createEntityValid$.pipe(
      filter(({ store }) => store === id),
      map(({ entity }) => entity),
      toSource('createEntity$')
    );

    const defaultInitialState = createEntityState<Entity>();
    const initialState = (JSON.parse(localStorage.getItem(id)) || defaultInitialState) as EntityState<Entity>;
    const store = this.adapt.init([id, initialState, storeAdapter], {
      upsertOne: createEntityForThisStore$,
    });

    const sub = store.state$.subscribe((state) => localStorage.setItem(id, JSON.stringify(state)));
    const destroy = () => {
      localStorage.removeItem(id);
      sub.unsubscribe();
    };
    return [{ id, store }, destroy];
  });

  storesSub = this.stores$.subscribe();
}
