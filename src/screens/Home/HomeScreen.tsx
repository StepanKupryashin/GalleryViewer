/* eslint-disable react/react-in-jsx-scope */
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import store from '../Home/store/HomeScreen.store';
const HomeScreen: React.FC = ({navigation}: any) => {
  useEffect(() => {
    console.log(navigation);
    store.getImages();
  });
  return (
    <View>
      <Text>This is a Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default observer(HomeScreen);
