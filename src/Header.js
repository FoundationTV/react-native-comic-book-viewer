import * as React from 'react';
import {
  Dimensions, Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

const closeIcon = require('./close-icon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 46,
    backgroundColor: '#00000080',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: { flexDirection: 'column', flex: 1, alignItems: 'center' },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  button: {
    height: 20,
    width: 20,
    marginRight: 4,
    marginTop: 4,
  },
});

const Header = ({
  title, pubYear, issueNumber, onClose, currentIndex, volumeNumber, isDisabled,
}) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Text style={styles.text}>
        {title}
        {volumeNumber && ` vol ${volumeNumber}`}
        {pubYear && ` (${pubYear})`}
      </Text>
      <Text style={styles.text}>{`Issue ${issueNumber}`}</Text>
    </View>
    <TouchableOpacity disabled={isDisabled} onPress={() => onClose(currentIndex)}>
      <Image style={styles.button} source={closeIcon} />
    </TouchableOpacity>
  </View>
);
export default Header;
