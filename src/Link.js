import React from 'react';

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.description} ({"localhost:3000/gamestats"})
      </div>
    </div>
  );
};

export default Link;