import * as React from 'react';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';
import Seeker from './Seeker';

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#00000080' },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
  },
});

const calculateSeekerPosition = (current, total) => {
  const percent = current / total;
  return (Dimensions.get('window').width - 20) * percent;
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
