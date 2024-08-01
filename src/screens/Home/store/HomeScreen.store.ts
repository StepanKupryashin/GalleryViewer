import {makeAutoObservable, runInAction} from 'mobx';
import {IStoreWithService} from '../../../types';
import IUnsplashService from './HomeScreen.interface';
import Photo from '../../../types/unsplash';
import service from './HomeScreen.service';
import execute from '../../../utils/execute';
// import {API_URL} from '@env';
class HomeScreenStore implements IStoreWithService<IUnsplashService> {
  data: Photo[] = [];
  page: number = 1;

  loading: number = 0;

  constructor() {
    makeAutoObservable(this);
  }
  get service(): IUnsplashService {
    return service;
  }
  startLoading = () => {
    this.loading += 1;
  };

  finishLoading = () => {
    if (this.loading) {
      this.loading -= 1;
    }
  };

  getImages = async () => {
    execute(
      async () => {
        const response = await this.service.getImages(this.page);
        runInAction(() => {
          this.data = [...this.data, ...response.data];
          this.page = ++this.page;
        });
      },
      error => console.log(error),
    );
  };
  resetPage = () => {
    runInAction(() => (this.page = 1));
  };

  setPage = (page: number) => {
    runInAction(() => (this.page = page));
  };

  refreshImages = async () => {
    this.resetPage();
    execute(
      async () => {
        const response = await this.service.getImages(this.page);
        runInAction(() => {
          this.data = response.data;
          this.page = ++this.page;
        });
      },
      error => console.log(error),
    );
  };
}

export default new HomeScreenStore();
