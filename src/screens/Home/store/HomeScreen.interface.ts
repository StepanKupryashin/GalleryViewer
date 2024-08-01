import {TAxiosResponse} from '../../../types';
import Photo from '../../../types/unsplash';

interface IUnsplashService {
  getImages: (page: number) => Promise<TAxiosResponse<Photo[]>>;
}

export default IUnsplashService;
