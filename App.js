import React from 'react';
import ComicBookViewer from './src';

const asset = {
  id: 'zen_JungleBook_LOTS_01',
  title: 'Jungle Book: Last of the Species',
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
  for (let i = asset.start_page; i <= asset.end_page; i++) {
    pages.push({ key: i, url: asset.page_api + i });
  }
  return (
    <ComicBookViewer
      title={asset.title}
      pages={pages}
      pubYear={asset.details.pub_year}
      totalPages={asset.num_pages}
      issueNumber={asset.details.episode}
      volumeNumber={asset.series_num}
      comicType={asset.content_type}
      onClose={index => console.log(index)}
      imageWidth={1936}
      imageHeight={3056}
      onPageChange={index => console.log(index)}
      onEndReached={info => console.log(info)}
      onEndReachedThreshold={0.01}
    />
  );
};

export default App;
