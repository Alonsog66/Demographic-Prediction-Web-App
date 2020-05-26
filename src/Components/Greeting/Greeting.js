import React from 'react';

const Greeting = ({ box }) => {
  return (
    <div>
      <div className="white f1">{'Hi There!'}</div>
      <div className="white f3">
        {
          'Feel free to post a URL of a photo of you and I will determine your demographics.'
        }
      </div>
    </div>
  );
};

export default Greeting;
