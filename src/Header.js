import * as React from 'react';
import {
  Dimensions, Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

const closeIcon = require('./close-icon.png');

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#00000080',
    flexDirection: 'row',
  },
  innerContainer: { flexDirection: 'column', flex: 1, alignItems: 'center' },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
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
  title, pubYear, issueNumber, onClose, currentIndex,
}) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Text style={styles.text}>
        {title}
        {pubYear && ` (${pubYear})`}
      </Text>
      <Text style={styles.text}>{`Issue Number: ${issueNumber}`}</Text>
    </View>
    <TouchableOpacity onPress={() => onClose(currentIndex)}>
      <Image style={styles.button} source={closeIcon} />
    </TouchableOpacity>
  </View>
);
export default Header;
