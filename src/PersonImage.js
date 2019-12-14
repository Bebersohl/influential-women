import React, { useState, useEffect } from 'react';
import wikijs from 'wikijs';

const wiki = wikijs();

function PersonImage({ name }) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const explorerImage = localStorage.getItem(name);

    if (explorerImage) return setImage(explorerImage);

    setLoading(true);

    wiki
      .page(name)
      .then(page => page.mainImage())
      .then(image => {
        window.localStorage.setItem(name, image);

        setImage(image);
      })
      .catch(err => {
        console.log('image', err);

        setImage('');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const imageStyle = {
    height: 300,
    alignSelf: 'center',
    borderRadius: '4px',
    marginTop: 10
  };

  const defaultImage =
    'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';

  function validateImage(image) {
    if (image === 'undefined') return defaultImage;

    return image;
  }

  if (!image || loading) {
    return <img src={defaultImage} style={imageStyle} alt={name} />;
  }

  return (
    <img
      onError={() => console.log('image error')}
      style={imageStyle}
      src={validateImage(image)}
      alt={name}
    />
  );
}

export default PersonImage;
