function uuid() {
    return 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'
    .replace(/[xN]/g, function(c) {
      let r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
    .replace(/M/, function(){
      return (Math.random() * 5 + 1 | 0).toString(16);
    });
  }
  
  let userID = uuid();
  console.log(userID);
  