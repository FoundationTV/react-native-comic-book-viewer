import React, { Component } from 'react';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Seeker from './Seeker';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', height: 54, backgroundColor: '#00000080',
  },
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

class Footer extends Component {
  render() {
    const {
      currentIndex, totalPages, onValueChange, width,
    } = this.props;
    return (
      <View style={[styles.container, width]}>
        <Slider
          style={{
            width: width - 40,
            height: 28,
            marginLeft: 20,
            marginRight: 20,
          }}
          minimumValue={0}
          maximumValue={totalPages - 1}
          step={1}
          value={currentIndex}
          minimumTrackTintColor="#7ed321"
          maximumTrackTintColor="#7ed321"
          onValueChange={onValueChange}
          thumbTintColor="#FFF"
        />
        <Text style={styles.text}>
          {currentIndex + 1}
          {' of '}
          {totalPages}
        </Text>
      </View>
    );
  }
}

export default Footer;
