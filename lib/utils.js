'use strict';

const generateUUID = () => {
  return Math.random().toString(36).substring(2, 13);
}

module.exports = { generateUUID };