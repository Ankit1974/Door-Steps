import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ViewPager from 'react-native-pager-view';

const {} = Dimensions.get('window');

const ImageAdapter = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const viewPagerRef = useRef(null);
  const imageList = [
    { uri: 'mobileadver2' },
    { uri: 'laptopadver' },
    { uri: 'smartadver' },
    { uri: 'add3' },
    { uri: 'add4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      viewPagerRef.current.setPage(currentPage === imageList.length - 1 ? 0 : currentPage + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const onImagePress = (index) => {
    Alert.alert(`Image ${index + 1} clicked`);
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager
        ref={viewPagerRef}
        style={{ flex: 1 }}
        onPageSelected={onPageSelected}
      >
        {imageList.map((image, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => onImagePress(index)}>
              <Image
                source={image}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ViewPager>
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center', flexDirection: 'row' }}>
        {imageList.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 2,
              backgroundColor: currentPage === index ? '#333' : '#ccc',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageAdapter;
