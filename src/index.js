import React, { Component } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageZoom from './image-zoom';
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
    const { pages, totalPages } = props;
    const loading = new Array(totalPages);
    loading.fill(false);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      seekerPosition: 0,
      fadeAnim: new Animated.Value(1),
      orientation: this.isPortrait() ? 'portrait' : 'landscape',
      loading,
    };
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
    const { fadeAnim } = this.state;
    Animated.timing(
      fadeAnim,
      { toValue: 0, duration: 4000 },
    ).start();
    Dimensions.addEventListener('change', ({ window }) => {
      this.setState({
        orientation: this.isPortrait() ? 'portrait' : 'landscape',
        width: window.width,
        height: window.height,
      });
    });
  }

 handleClick = (arg) => {
   const { fadeAnim } = this.state;
   if (arg.locationX > 240) {
     this.listRef.current.snapToNext();
   } else if (arg.locationX < 120) {
     this.listRef.current.snapToPrev();
   } else {
     Animated.timing(
       fadeAnim,
       { toValue: 1 - fadeAnim._value, duration: 500 },
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
  }

  if (vxRTL >= -0.03 && vxRTL <= 0) {
    this.resetPosition.call(this);
  }
};

resetPosition=() => {
  this.imageRefs[this.listRef.current.currentIndex].reset();
  this.listRef.current.forceUpdate();
}

  renderItem = ({ item, index }) => {
    const { width: screenWidth, height: screenHeight, orientation } = this.state;
    const { imageWidth, imageHeight } = this.props;
    let width = imageWidth;
    let height = imageHeight;
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
    // console.log(`screenWidth: ${screenWidth} ;screenHeight: ${screenHeight}`);
    // console.log(`imageWidth: ${imageWidth} ;imageHeight: ${imageHeight}`);
    // console.log(`width: ${width} ;height: ${height}`);

    let loader = <ActivityIndicator style={styles.spinnerStyle} size="large" color="#FFF" />;
    if (this.props.loader) loader = <View style={styles.spinnerStyle}><Image source={this.props.loader} style={{ width: 100, height: 100 }} /></View>;
    return (
      <ImageZoom
        ref={ref => this.imageRefs[index] = ref}
        cropWidth={screenWidth}
        cropHeight={screenHeight}
        onClick={this.handleClick}
        imageWidth={(orientation === 'portrait' || imageWidth > screenWidth) ? screenWidth : imageWidth}
        imageHeight={(orientation === 'portrait' || imageHeight > screenHeight) ? screenHeight : imageHeight}
        enableCenterFocus={false}
        horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
        responderRelease={this.handleResponderRelease}
      >
        <Animated.View style={styles.imageZoom}>
          <Animated.Image
            source={{ uri: item.url }}
            style={{ width, height }}
            resizeMode="contain"
            resizeMethod="resize"
            onLoadStart={() => this.setState((state) => {
              const loading = state.loading.map((item, j) => {
                if (j === index) return true;
                return state.loading[j];
              });
              return { loading };
            })}
            onLoad={() => this.setState((state) => {
              const loading = state.loading.map((item, j) => {
                if (j === index) return false;
                return state.loading[j];
              });
              return { loading };
            })}
            defaultSource={this.props.loadingIndicatorSource}
          />
          {this.state.loading[index] && loader}
        </Animated.View>
      </ImageZoom>
    );
  }

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
     pages, totalPages, title, pubYear, issueNumber, onClose, comicType, vertical, inverted, onPageChange, volumeNumber,
   } = this.props;
   const {
     fadeAnim, width, height, seekerPosition, orientation,
   } = this.state;
   return (
     <Animated.View
       style={styles.container}
       onLayout={this.handleLayout}
     >
       <StatusBar hidden />
       <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
         <Header
           currentIndex={this.listRef.current?.currentIndex || 0}
           title={title}
           pubYear={pubYear}
           issueNumber={issueNumber}
           onClose={onClose}
           volumeNumber={volumeNumber}
         />
       </Animated.View>
       <Carousel
         ref={this.listRef}
         data={pages}
         extraData={this.state}
         renderItem={this.renderItem}
         initialNumToRender={2}
         sliderWidth={width}
         itemWidth={width}
         sliderHeight={height}
         itemHeight={height}
         slideStyle={{ width }}
         inactiveSlideOpacity={1}
         inactiveSlideScale={1}
         vertical={vertical}
         inverted={inverted}
         onSnapToItem={(slideIndex) => {
           const percent = slideIndex / totalPages;
           this.setState({
             seekerPosition: (Dimensions.get('window').width - 40) * percent,
           });
           onPageChange(slideIndex);
         }}
         {...this.props}
       />
       <Animated.View style={[styles.footer, { opacity: fadeAnim }, orientation === 'portrait' ? {} : { bottom: 0 }]}>
         <Footer
           currentIndex={this.listRef.current?.currentIndex || 0}
           totalPages={totalPages}
           seekPanResponder={this.seekPanResponder}
           seekerPosition={seekerPosition}
         />
       </Animated.View>
     </Animated.View>
   );
 }
}
