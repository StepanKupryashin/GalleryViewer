export type Nullable<T> = T | null | void;

export interface IStoreWithLoading {
  loading: number;
  startLoading(): void;
  finishLoading(): void;
}

export interface IStoreWithService<T> extends IStoreWithLoading {
  get service(): T;
}
