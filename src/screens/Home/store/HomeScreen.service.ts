import {EApiPaths} from '../../../types/enums';
import http from '../../../utils/http';
import IUnsplashService from './HomeScreen.interface';

const service: IUnsplashService = {
  getImages: async page =>
    await http.get(EApiPaths.photos, {
      params: {
        page,
      },
    }),
};

export default service;
