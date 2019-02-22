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

`npm i @junctiontv/react-native-comic-book-viewer`

## Usage

```javascript
import ComicBookViewer from "@junctiontv/react-native-comic-book-viewer";
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
| **`pages** | _List of Static Image Resources or Network Images_ | :heavy_check_mark: | the reference of the `TextInput` which is to be attached |
| **`pubYear`**                                                                                                                                   | _String_ | :x:                | sets the publication year of the issue                                                                  |
| **`totalPages`**                                                                                                                                | _String_ | :heavy_check_mark: | sets the total number of pages in the issue                                                             |
| **`issueNumber`**                                                                                                                               | _String_ | :x:                | sets the number of the issue                                                                            |
| **`onClose`**                                                                                                                                   | _String_ | :heavy_check_mark: | sets the function which is called when the cross button is pressed                                      |

## Contributing

All contributions including new features, requests, bug fixes are open to everyone. Feel free to open a PR!

### License

React Native Comic Book Reader is [MIT licensed](./LICENSE).
