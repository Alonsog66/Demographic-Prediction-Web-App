import React from 'react';
import Tilt from 'react-tilt';
import Frida from './Frida.png';
import './Logo.css';

const Logo = () => {
  return (
    <div style={{ paddingTop: '20px' }} className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-3"
        options={{ max: 45 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          {' '}
          <img style={{ paddingTop: '10px' }} alt="logo" src={Frida} />{' '}
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
