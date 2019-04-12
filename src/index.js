import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Gallery from './gallery';
import Header from './Header';
import Footer from './Footer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageZoom: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    top: 0, position: 'absolute', zIndex: 9,
  },
  footer: {
    bottom: 0, position: 'absolute', zIndex: 9,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

type Props = {};
export default class ComicBookViewer extends Component<Props> {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.footerRef = React.createRef();
    const { pages, totalPages } = props;
    const loading = new Array(totalPages);
    loading.fill(false);
    this.currentIndex = 0;
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      orientation: this.isPortrait() ? 'portrait' : 'landscape',
      isDisabled: false,
      currentIndex: 0,
      fadeAnim: new Animated.Value(1),
    };
  }

  componentDidMount() {
    const { fadeAnim } = this.state;
    Animated.timing(
      fadeAnim,
      { toValue: 0, duration: 3000 },
    ).start();
    this.setState(state => ({
      isDisabled: !state.isDisabled,
    }));
    Dimensions.addEventListener('change', ({ window }) => {
      this.setState({
        orientation: this.isPortrait() ? 'portrait' : 'landscape',
        width: window.width,
        height: window.height,
      });
    });
  }

  handleSliderValueChange=(currentIndex) => {
    this.setState({ currentIndex });
    this.currentIndex = currentIndex;
    this.listRef.current.getViewPagerInstance().flingToPage(currentIndex, 1);
    this.props.onPageChange(currentIndex);
  }

 handleClick = (arg) => {
   const {
     fadeAnim, width, height, currentIndex,
   } = this.state;
   const { totalPages, inverted, horizontal } = this.props;
   if (
     (horizontal && (
       (!inverted && arg.x0 > (width * 2 / 3))
      || (inverted && arg.x0 < (width / 3))
     ))
    || (!horizontal && arg.y0 > (height * 2 / 3))
   ) {
     const newIndex = currentIndex < (totalPages - 1) ? currentIndex + 1 : currentIndex;
     this.currentIndex = newIndex;
     this.setState(({ currentIndex: newIndex }));
     this.listRef.current.getViewPagerInstance().flingToPage(newIndex, 1);
     this.footerRef.current.forceUpdate();
   } else if (
     (horizontal && (
       (!inverted && arg.x0 < (width / 3))
     || (inverted && arg.x0 > (width * 2 / 3))
     )) || (!horizontal && arg.y0 < (height / 3))
   ) {
     const newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
     this.currentIndex = newIndex;
     this.setState(({ currentIndex: newIndex }));
     this.listRef.current.getViewPagerInstance().flingToPage(newIndex, 1);
     this.footerRef.current.forceUpdate();
   } else {
     Animated.timing(
       fadeAnim,
       { toValue: 1 - fadeAnim._value, duration: 50 },
     ).start();
     this.setState(state => ({
       isDisabled: !state.isDisabled,
     }));
   }
 };

 snapToItem = (index) => {
   this.listRef.current.getViewPagerInstance().flingToPage(index);
   this.currentIndex = index;
   this.footerRef.current.forceUpdate();
 }

 isPortrait = () => {
   const dim = Dimensions.get('screen');
   return dim.height >= dim.width;
 };

 handleLayout = (event) => {
   const { width } = this.state;
   if (event.nativeEvent.layout.width !== width) {
     this.hasLayout = true;
     this.setState({
       width: event.nativeEvent.layout.width,
       height: event.nativeEvent.layout.height,
     });
   }
 };

 render() {
   const {
     pages, totalPages, title, pubYear, issueNumber, onClose, comicType, horizontal, inverted, onPageChange, volumeNumber,
   } = this.props;
   const {
     fadeAnim, orientation, isDisabled, width,
   } = this.state;
   return (
     <Animated.View
       style={styles.container}
       onLayout={this.handleLayout}
     >
       <StatusBar hidden />
       <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
         <Header
           currentIndex={this.currentIndex || 0}
           title={title}
           pubYear={pubYear}
           issueNumber={issueNumber}
           onClose={onClose}
           volumeNumber={volumeNumber}
           isDisabled={isDisabled}
           width={width}
         />
       </Animated.View>
       <Gallery
         ref={this.listRef}
         style={{ flex: 1, backgroundColor: 'black' }}
         images={pages}
         onSingleTapConfirmed={(currentIndex, evt, gestureState) => {
           this.currentIndex = currentIndex;
           this.handleClick(gestureState);
         }}
         onPageSelected={(currentIndex) => {
           this.setState({ currentIndex });
           this.currentIndex = currentIndex;
           onPageChange(currentIndex);
           // console.log(this.currentIndex);
           this.footerRef.current?.forceUpdate();
         }}
         horizontal={horizontal}
         inverted={inverted}
         // onPageScrollStateChanged={state => console.log(state)}
         // onPageScroll={event => console.log(event)}
       />
       <Animated.View style={[styles.footer, { opacity: fadeAnim }, orientation === 'portrait' ? {} : { bottom: 0 }]}>
         <Footer
           ref={this.footerRef}
           currentIndex={this.currentIndex || 0}
           totalPages={totalPages}
           onValueChange={this.handleSliderValueChange}
           isDisabled={isDisabled}
           width={width}
         />
       </Animated.View>
     </Animated.View>
   );
 }
}
