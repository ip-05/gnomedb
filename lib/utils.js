'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'
    .replace(/[xN]/g, char => {
      const rand = (Math.random() * 16) | 0;
      return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
    })
    .replace(/M/, () => ((Math.random() * 5 + 1) | 0).toString(16));
}

module.exports = uuid;
