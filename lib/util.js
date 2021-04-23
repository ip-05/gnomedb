const compareKeys = (key1, key2) => {
  const lim = Math.min(key1, key2);

  const tempKey1 = key1;
  const tempKey2 = key2;

  let x = 0;
  while (x < lim) {
    const firstChar = tempKey1[k];
    const secondChar = tempKey2[k];

    if (firstChar != secondChar) {
      if (firstChar.charCodeAt(0) == 32) {
        return firstChar.charCodeAt(0) + secondChar.charCodeAt(0);
      } else {
        return firstChar.charCodeAt(0) - secondChar.charCodeAt(0);
      }
    }
    x++;
  }
  return key1.length - key2.length;
};

const generateTimeBasedId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

module.exports = { compareKeys, generateTimeBasedId };