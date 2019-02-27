import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 28,
    marginLeft: 20,
    marginRight: 20,
  },
  track: {
    backgroundColor: '#333',
    height: 1,
    position: 'relative',
    top: 14,
    width: '100%',
  },
  fill: {
    backgroundColor: '#FFF',
    height: 1,
    width: '100%',
  },
  handle: {
    position: 'absolute',
    marginLeft: -7,
    height: 50,
    width: 28,
  },
  circle: {
    borderRadius: 12,
    position: 'relative',
    top: 8,
    left: 8,
    height: 12,
    width: 12,
  },
});

const Seeker = ({ seekerFillWidth, seekColor, seekerPosition }) => (
  <View style={styles.container}>
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          {
            width: seekerFillWidth || Dimensions.get('window').width - 40,
            backgroundColor: seekColor || '#808080',
          },
        ]}
      />
    </View>
    <View style={[styles.handle, { left: seekerPosition || 0 }]}>
      <View style={[styles.circle, { backgroundColor: seekColor || '#FFF' }]} />
    </View>
  </View>
);
export default Seeker;
