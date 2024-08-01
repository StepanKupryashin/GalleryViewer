import Photo from '../../../types/unsplash';

interface IUnsplashService {
  getImages: (page: number) => Promise<Photo[]>;
}

export default IUnsplashService;
