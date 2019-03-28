import * as React from 'react';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';
import Seeker from './Seeker';

const styles = StyleSheet.create({
  container: { alignItems: 'center', height: 54, backgroundColor: '#00000080' },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
});

const calculateSeekerPosition = (current, total) => {
  const percent = current / total;
  return (Dimensions.get('window').width - 40) * percent;
};

const Footer = ({
  currentIndex, totalPages, seekPanResponder, seekerPosition,
}) => (
  <View style={styles.container} {...seekPanResponder.panHandlers}>
    <Seeker seekerPosition={seekerPosition || calculateSeekerPosition(currentIndex, totalPages)} />
    <Text style={styles.text}>
      {currentIndex + 1}
      {' of '}
      {totalPages}
    </Text>
  </View>
);
export default Footer;
