import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageZoom from './image-zoom';
import Header from './Header';
import Footer from './Footer';

type Props = {};
const circleRadius = 30;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class ComicBookViewer extends Component<Props> {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      width: 0, height: 0, seekerPosition: 0, fadeAnim: new Animated.Value(1), orientation: null,
    };
    const { pages, totalPages } = props;
    this.flipThreshold = 80;
    this.imageRefs = [];
    this.seekPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        const position = gestureState.moveX;
        const { state } = this;

        state.seekerFillWidth = position;
        state.seekerPosition = position;

        if (!state.seeking) {
          state.seekerPosition = position;
        }
        this.setState(state);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const percent = this.state.seekerPosition / Dimensions.get('window').width;
        const currentIndex = Math.floor(pages.length * percent);
        this.listRef.current.snapToItem(currentIndex);
      },
    });
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 4000 },
    ).start();
    Dimensions.addEventListener('change', ({ window, screen }) => {
      console.log(window);
      console.log(screen);
      this.setState({
        orientation: this.isPortrait() ? 'portrait' : 'landscape',
      });
      console.log(this.state);
    });
  }

 handleClick = (arg) => {
   console.log(arg);
   if (arg.locationX > 240) {
     this.listRef.current.snapToNext();
   } else if (arg.locationX < 120) {
     this.listRef.current.snapToPrev();
   } else {
     Animated.timing(
       this.state.fadeAnim,
       { toValue: 1 - this.state.fadeAnim._value, duration: 500 },
     ).start();
   }
 };

 isPortrait = () => {
   const dim = Dimensions.get('screen');
   return dim.height >= dim.width;
 };

handleResponderRelease = (vx = 0, vy = 0) => {
  const { vertical, inverted } = this.props;

  const vxRTL = inverted ? -vx : vx;
  if (vxRTL > 0.7 && !vertical) {
    this.listRef.current.snapToPrev();
  } else if (vxRTL < -0.7 && !vertical) {
    this.listRef.current.snapToNext();
  }

  const vyRTL = inverted ? -vy : vy;
  if (vyRTL > 0.7 && vertical) {
    this.listRef.current.snapToPrev();
  } else if (vyRTL < -0.7 && vertical) {
    this.listRef.current.snapToNext();
  } else {
    this.resetPosition.call(this);
  }
};

resetPosition=() => {
  console.log('here');
  // this.positionXNumber = this.standardPositionX;
  // Animated.timing(this.positionX, {
  //   toValue: this.standardPositionX,
  //   duration: 150,
  // }).start();
  this.imageRefs[this.listRef.current.currentIndex].reset();
  this.listRef.current.forceUpdate();
}

  renderItem = ({ item, index }) => {
    const screenWidth = this.state.width;
    const screenHeight = this.state.height;
    let width = 621;
    let height = 1218;
    if (width > screenWidth) {
      const widthPixel = screenWidth / width;
      width *= widthPixel;
      height *= widthPixel;
    }

    if (height > screenHeight) {
      const HeightPixel = screenHeight / height;
      width *= HeightPixel;
      height *= HeightPixel;
    }
    return (
      <ImageZoom
        ref={ref => this.imageRefs[index] = ref}
        cropWidth={screenWidth}
        cropHeight={screenHeight}
        onClick={this.handleClick}
        imageWidth={screenWidth}
        imageHeight={screenHeight}
        enableCenterFocus={false}
        horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
        responderRelease={this.handleResponderRelease}
      >
        <Animated.View style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Image source={{ uri: item.url }} style={{ width, height }} resizeMode="contain" resizeMethod="resize" />
        </Animated.View>
      </ImageZoom>
    );
  }

 handleLayout = (event) => {
   const { width, height } = this.state;
   if (event.nativeEvent.layout.width !== width) {
     this.hasLayout = true;
     this.setState({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
   }
 };

 render() {
   const {
     pages, totalPages, title, pubYear, issueNumber, onClose, comicType, vertical, inverted,
   } = this.props;
   const { fadeAnim } = this.state;
   return (
     <Animated.View
       style={[styles.container]}
       onLayout={this.handleLayout}
     >
       <StatusBar hidden />
       <Animated.View style={[{
         top: 0, position: 'absolute', zIndex: 9, opacity: fadeAnim,
       }]}
       >
         <Header
           currentIndex={this.listRef.current?.currentIndex || 0}
           title={title}
           pubYear={pubYear}
           issueNumber={issueNumber}
           onClose={onClose}
         />
       </Animated.View>
       <Carousel
         ref={this.listRef}
         data={pages}
         extraData={this.state}
         renderItem={this.renderItem}
         initialNumToRender={2}
         sliderWidth={viewportWidth}
         itemWidth={viewportWidth}
         sliderHeight={viewportHeight}
         itemHeight={viewportHeight}
         slideStyle={{ width: viewportWidth }}
         inactiveSlideOpacity={1}
         inactiveSlideScale={1}
         vertical={vertical}
         inverted={inverted}
         onSnapToItem={(slideIndex) => {
           const percent = slideIndex / totalPages;
           this.setState({
             seekerPosition: (Dimensions.get('window').width - 20) * percent,
           });
         }}
       />
       <Animated.View style={{
         bottom: 0, position: 'absolute', zIndex: 9, opacity: fadeAnim,
       }}
       >
         <Footer
           currentIndex={this.listRef.current?.currentIndex || 0}
           totalPages={totalPages}
           seekPanResponder={this.seekPanResponder}
           seekerPosition={this.state.seekerPosition}
         />
       </Animated.View>
     </Animated.View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});
