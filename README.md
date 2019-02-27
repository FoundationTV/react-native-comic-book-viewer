# React Native Comic Book Reader

<p align="center">
    <img src="https://img.shields.io/npm/v/@junctiontv/react-native-comic-book-viewer.svg" />
    <img src="https://img.shields.io/npm/dt/@junctiontv/react-native-comic-book-viewer.svg" />
    <img src="https://img.shields.io/github/issues/JunctionTV/react-native-comic-book-viewer.svg" />
    <img src="https://img.shields.io/github/forks/JunctionTV/react-native-comic-book-viewer.svg" />
    <img src="https://img.shields.io/github/stars/JunctionTV/react-native-comic-book-viewer.svg" />
    <img src="https://img.shields.io/github/license/JunctionTV/react-native-comic-book-viewer.svg" />
    <img src="https://img.shields.io/twitter/url/https/github.com/JunctionTV/react-native-comic-book-viewer.svg?style=social" />        
</p>
<p>
A comic book viewer for React Native that takes in a list of images and displays them in a sequential manner.
</p>

## Installation

`npm i react-native-comic-book-viewer`

## Usage

```javascript
import ComicBookViewer from "react-native-comic-book-viewer";
...

<ComicBookViewer
  title={title}
  inputType={inputType}
  pages={pages}
  pubYear={pub_year}
  totalPages={totalPage}
  issueNumber={number}
  onClose={() => console.log('close pressed')}
/>
```

| Prop                                                                                                                                            | Type     | Optional           | Description                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| **`title`**                                                                                                                                     | _String_ | :heavy_check_mark: | sets the title of the book                                                                              |
| **`inputType`**                                                                                                                                 | _String_ | :x:                | sets the input type of the viewer. Currently only `static` and `uri` are supported. (Defaults to `uri`) |
| **`pages`** | _List of Static Image Resources or Network Images_ | :heavy_check_mark: | the reference of the `TextInput` which is to be attached |
| **`pubYear`**                                                                                                                                   | _String_ | :x:                | sets the publication year of the issue                                                                  |
| **`totalPages`**                                                                                                                                | _String_ | :heavy_check_mark: | sets the total number of pages in the issue                                                             |
| **`issueNumber`**                                                                                                                               | _String_ | :x:                | sets the number of the issue                                                                            |
| **`onClose`**                                                                                                                                   | _String_ | :heavy_check_mark: | sets the function which is called when the cross button is pressed                                      |
| **`vertical`**                                                                                                                                   | _Boolean_ | :x: | sets whether the pages are rendered vertically or horizontally (defaults to false)                                      |
| **`inverted`**                                                                                                                                   | _Boolean_ | :x: | sets whether the direction of the pages are inverted or not (defaults to false)                                      |


### Inherited props

The component is built on top of the `FlatList` component, meaning it inherits from [`FlatList`](https://facebook.github.io/react-native/docs/flatlist.html), [`VirtualizedList`](https://facebook.github.io/react-native/docs/virtualizedlist.html), and [`ScrollView`](https://facebook.github.io/react-native/docs/scrollview.html).

You can use almost all props from this three components, but some of them can't be overriden because it would mess with our implementation's logic.

Here are a few useful props regarding carousel's **style and "feeling"**: `scrollEnabled` (if you want to disable user scrolling while still being able to use `Carousel`'s methods), `showsHorizontalScrollIndicator`, `overScrollMode` (android), `bounces` (ios), `decelerationRate` (ios), `scrollEventThrottle` (ios).

And here are some useful ones for **performance optimizations and rendering**: `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, `updateCellsBatchingPeriod`, `extraData`, `removeClippedSubviews` (the latter may have bugs, as stated in [RN's doc](https://facebook.github.io/react-native/docs/flatlist.html#removeclippedsubviews)). The first three are already implemented with default parameters, but you can override them if they don't suit your needs.

## Contributing

All contributions including new features, requests, bug fixes are open to everyone. Feel free to open a PR!

### License

React Native Comic Book Reader is [MIT licensed](./LICENSE).
