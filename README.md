# GnomeDB

GnomeDB is an in-memory DBMS (Database Management System) built on Node.js

## Installation

Clone the repository and run npm installation command

```
npm install @gnomedb/gnomedb
```

## Usage

```js
const GnomeDB = require('@gnomedb/gnomedb');
const db = new GnomeDB();

const [marcus, lucius, pius, hadrian, trajan] = db.addFrom([
  { name: 'Marcus Aurelius', city: 'Rome', born: 121, dynasty: 'Antonine' },
  { name: 'Lucius Verus', city: 'Rome', born: 130, dynasty: 'Antonine' },
  { name: 'Antoninus Pius', city: 'Lanuvium', born: 86, dynasty: 'Antonine' },
  { name: 'Hadrian', city: 'Santiponce', born: 76, dynasty: 'Nerva–Trajan' },
  { name: 'Trajan', city: 'Sevilla', born: 98, dynasty: 'Nerva–Trajan' },
]);

console.log(db.find({ born: { $gt: 121 }, dynasty: 'Antonine' })); // Lucius Verus
```

## Scripts

Run tests

```
npm run test
```

Generate typescript declarations

```
npm run types
```

Run linter

```
npm run lint
```

## Authors

Yevgen Yakovliev ([Github](https://github.com/JenyaFTW))

Mykola Chub ([Github](https://github.com/nikolaichub))

Artem Bondarchuk ([Github](https://github.com/artemkaxdxd))

Alina Dyachenko ([Github](https://github.com/dyachaliin))

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/JenyaFTW/OgnomDB/issues).

## License

This project is [MIT](LICENSE) licensed.
