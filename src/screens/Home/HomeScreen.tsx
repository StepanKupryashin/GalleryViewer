/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import store from '../Home/store/HomeScreen.store';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
const HomeScreen: React.FC = () => {
  useEffect(() => {
    console.log(store.page);
    store.getImages();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [dialogImage, setDialogImage] = useState<number | null>(null);
  const [imagesURls, setImagesURLs] = useState<IImageInfo[]>([]);
  const scopePhotosUrls = () => {
    let data: IImageInfo[] = [];
    store.data.map(item => {
      data.push({url: item.urls.full});
    });
    setImagesURLs(data);
  };

  return (
    <View>
      <Text style={{textAlign: 'center'}}>Галерея</Text>
      <FlatList
        numColumns={2}
        data={store.data}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setDialogImage(index);
                scopePhotosUrls();
              }}>
              <Image
                source={{uri: item.urls.full}}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{
          gap: 10,
          columnGap: 10,
          alignContent: 'center',
          alignItems: 'center',
          marginEnd: 10,
        }}
        onEndReached={() => store.getImages()}
        // debug={true}
        onRefresh={store.refreshImages}
        refreshing={isRefreshing}
      />
      <Modal visible={dialogImage !== null}>
        <Button title="Закрыть" onPress={() => setDialogImage(null)} />
        <ImageViewer imageUrls={imagesURls} index={dialogImage || 0} />
      </Modal>
    </View>
  );
};

export default observer(HomeScreen);
