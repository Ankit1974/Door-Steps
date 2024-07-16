import React, { useEffect, useState,} from 'react';
import { View, Text, TextInput, StyleSheet,Image, FlatList } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ImageAdapter from '../../Common/HelperFile/ImageAdapter';
import Home from '../../Common/HelperFile/Home';
import HomeTopSection from '../../Common/HelperFile/HomeTopSection';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const HomeScreens = () => {
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.noConnectionContainer}>
        <Icon name="disconnect" size={70} color="red" />
        <Text style={styles.noConnectionText}>No Connection</Text>
        <Text style={styles.noConnectionSubText}>Please check your internet connectivity and try again.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'search':
        return (
          <View style={styles.inputContainer}>
            <Icon name="search" size={18} color="#666" />
            <TextInput style={styles.input} placeholder="Search" />
            <View style={styles.iconContainer}>
              <Icon name="mic" size={20} color="#666" style={styles.icon} />
              <Icon name="camera" size={20} color="#666" style={styles.icon} />
            </View>
          </View>
        );
      case 'slider':
        return (
          <View style={styles.imageSlider}>
            <ImageAdapter />
          </View>
        );
      case 'home':
        return <Home navigation={navigation} />;
      case 'topSelection':
        return (
          <View style={styles.topSelectionContainer}>
            <Text style={styles.topSelectionText}>Top Selection</Text>
            <HomeTopSection navigation={navigation} />
          </View>
        );
      case 'ad':
        return (
          <View>
            <Image source={{ uri: 'add2' }} style={styles.adImage} />
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { type: 'search' },
    { type: 'slider' },
    { type: 'home' },
    { type: 'topSelection' },
    { type: 'ad' },
  ];

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString()}
        contentContainerStyle={styles.container}
      />
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    borderRadius: 2,
    height: 40,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    color: 'black',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  imageSlider: {
    marginVertical: 10,
    width: '100%',
    height: 200,
  },
  topSelectionContainer: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 0,
  },
  topSelectionText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  adImage: {
    width: '100%',
    height: 200,
    marginBottom: 40,
  },
  notificationCount: {
    position: 'absolute',
    top: -5,
    right: 22,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 10,
  },
  noConnectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  noConnectionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  noConnectionSubText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

export default HomeScreens;
