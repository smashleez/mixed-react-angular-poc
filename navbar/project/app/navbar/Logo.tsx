import React, { } from 'react';


import logoRCM from '../../static/images/logo-availity-rcm.png';
// import logoRCMDev from '../static/images/logo-availity-rcm-dev.png';

const getLogo = () => {
    return logoRCM;
};

const Logo = () => (
    <img className="logo" alt="Availity Logo" src={getLogo()} />
);

export default Logo;