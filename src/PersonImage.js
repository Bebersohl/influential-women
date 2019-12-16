import React from 'react';
import images from './data/images';

import annette from './images/annette.jpg'
import augusta from './images/augusta.jpg'
import barbara from './images/barbara.jpg'
import beryl from './images/beryl.jpg'
import cassie from './images/cassie.jpeg'
import dominick from './images/dominick.jpg'
import ida from './images/ida.jpg'
import jeanne from './images/jeanne.jpg'
import junko from './images/junko.jpg'
import kay from './images/kay.jpg'
import kira from './images/kira.jpg'
import kirk from './images/kirk.jpg'
import krystyna from './images/krystyna.jpeg'
import marie from './images/marie.jpg'
import mary from './images/mary.jpg'
import meagan from './images/meagan.jpeg'
import ness from './images/ness.jpg'
import osa from './images/osa.jpg'
import pine from './images/pine.jpg'
import robyn from './images/robyn.jpg'
import sophia from './images/sophia.jpg'
import tania from './images/tania.jpg'
import octavie from './images/octavie.jpg'

const imageMap = {
  annette,
  augusta,
  barbara,
  beryl,
  cassie,
  dominick,
  ida,
  jeanne,
  junko,
  kay,
  kira,
  kirk,
  krystyna,
  marie,
  mary,
  meagan,
  ness,
  osa,
  octavie,
  pine,
  robyn,
  sophia,
  tania,
}

function PersonImage({ name }) {

  const imageStyle = {
    height: 300,
    alignSelf: 'center',
    borderRadius: '4px',
    marginTop: 10
  };

  // const defaultImage =
  //   'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';

  function getImage(name) {
    const image = images[name];

    if (image.includes('https')) return image;

    return imageMap[image];
  }

  return (
    <img
      onError={() => console.log('image error')}
      style={imageStyle}
      src={getImage(name)}
      alt={name}
    />
  );
}

export default PersonImage;
