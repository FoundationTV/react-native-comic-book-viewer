import React from 'react';
import ComicBookViewer from './src';


const images = [
  {
    key: '0',
    url:
      'http://images.cinedigm.com/jtv/contv/images/NNVG9946_AlexGreyandTheChapelofSacredMirrorsCoSMTheMovie_621x1218.jpg',
  },
  {
    key: '1',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG9943_Faster_621x1218.jpg',
  },
  {
    key: '2',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG9939_AirGuitarNation_621x1218.jpg',
  },
  {
    key: '3',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8985_ChinaTheForbiddenCity_621x1218.jpg',
  },
  {
    key: '4',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8929_Terrorists_621x1218.jpg',
  },
  {
    key: '5',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8924_HamAndCheese_621x1218.jpg',
  },
  {
    key: '6',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8922_GoingNomad_621x1218.jpg',
  },
  {
    key: '7',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8921_Flourish_621x1218.jpg',
  },
  {
    key: '8',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8775_AmericanZombie_621x1218.jpg',
  },
  {
    key: '9',
    url: 'http://images.cinedigm.com/jtv/contv/images/NNVG8773_AdventuresOfJohnnyTao_621x1218.jpg',
  },
];

const issue = {
  id: 'NNVG10008107',
  title: 'House on Haunted Hill',
  pages: images,
  pub_year: '1959',
  number: 1,
  totalPage: 10,
};

const App = () => (
  <ComicBookViewer
    title={issue.title}
    pages={issue.pages}
    pubYear={issue.pub_year}
    totalPages={issue.totalPage}
    issueNumber={issue.number}
    comicType="web"
    onClose={() => console.log('close pressed')}
    vertical
  />
);
export default App;
