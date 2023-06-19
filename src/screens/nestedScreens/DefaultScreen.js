import { StyleSheet, Text, View, Image } from 'react-native';
import imgAvatar from '../../../Img/Avatar.jpg';
import { useSelector } from 'react-redux';
// import imgForest from '../../Img/Forest.jpg';
// import Wrapper from '../../components/Wrapper';
import Posts from '../../../components/Posts';

export default DefaultScreen = ({ route, navigation }) => {
  const { login, email } = useSelector((state) => {
    return state.auth;
  });

  const navigateToCommentsScreen = (post) => {
    navigation.navigate('Comments', { post });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgWrap}>
        <Image
          source={imgAvatar}
          resizeMode="cover"
          style={styles.imgAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <Posts navigateToCommentsScreen={navigateToCommentsScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imgWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginLeft: 16,

    // justifyContent: 'center',
  },
  imgAvatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
});
