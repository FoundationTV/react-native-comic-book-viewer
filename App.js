import React from 'react';
import ComicBookViewer from './src';

const loading = require('./src/placeholder_portrait.jpg');

const asset = {
  id: 'zen_JungleBook_LOTS_01',
  title: 'Jungle Book: Last of the Species',
  details: {
    id: 'zen_JungleBook_LOTS_01',
    title: 'Jungle Book: Last of the Species',
    type: 'comic_issue',
    episode: '1',
    subscriber_type: 'free',
    description: 'Mowglii has recovered from her wounds after defeating the ferocious Shere Khan, but she soon learns that on Kipling Isle, there is no down time!',
  },
  content_type: 'western',
  series_num: 1,
  num_pages: 21,
  start_page: 0,
  end_page: 20,
  pause_time: 0,
  err_code: 0,
  err_msg: '',
  page_api: '',
};

const App = () => {
  const pages = [];
  return (
    <ComicBookViewer
      title={asset.title}
      pages={pages}
      pubYear={asset.pub_year}
      totalPages={pages.length}
      issueNumber={asset.details.episode}
      volumeNumber={asset.series_num}
      comicType={asset.content_type}
      loadingIndicatorSource={loading}
      imageWidth={621}
      imageHeight={1218}
      onPageChange={() => {}}
      horizontal
      inverted
      // onEndReached={() => setModalVisible(true)}
      onEndReachedThreshold={0.01}
    />
  );
};

export default App;
