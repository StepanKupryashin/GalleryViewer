import {makeAutoObservable, runInAction} from 'mobx';
import {IStoreWithService} from '../../../types';
import IUnsplashService from './HomeScreen.interface';
import Photo from '../../../types/unsplash';
import service from './HomeScreen.service';
import execute from '../../../utils/execute';
import {API_URL} from '@env';
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
        console.log(API_URL);

        const response = await this.service.getImages(this.page);
        console.log(response);
        runInAction(() => {
          this.data = response;
          this.page = ++this.page;
        });
      },
      error => console.log(error),
    );
  };
}

export default new HomeScreenStore();
