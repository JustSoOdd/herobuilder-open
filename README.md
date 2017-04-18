# Hero Builder 2.0

### Getting Started

```
$ git clone git@gitlab.com:ggunleashed/herobuilder.git herobuilder
$ cd herobuilder
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # React.js-based web pages
│   ├── /img/                   # Website images
│   ├── /js/                    # JavaScript code and React.js components
│   │   ├── /actions/           # Actions interfacing with the stores
│   │   ├── /components/        # Single components interfacing with actions
│   │   ├── /constants/         # Various constants which can't be changed
│   │   ├── /dispatcher/        # Contains the AppDispatcher
│   │   ├── /helpers/           # Various small helper methods like l10n
│   │   ├── /stores/            # Different stores for App State
│   ├── /404.js                 # 'Not found' page
│   └── /index.js               # 'Home' page
├── /test/                      # Unit tests
├── /tools/                     # Build automation scripts
│── LICENSE.txt                 # License file
│── package.json                # Dev dependencies and NPM scripts
└── README.md                   # Project overview
```

### How to Build

```shell
$ npm run build                # Builds the project
```

### NPM tasks

# lint
Runs eslint against the JS codebase using the .eslintrc file for configuration.

# spritify
Creates spritesheets out of the herotiles and skill images.
NOTE: ggunleashed-assets repository is required to run this task.

# data-merge
Creates a single file containing all heroes from single hero.json files.
NOTE: ggunleashed-assets repository is required to run this task.

update-assets
  npm run spritify && npm run data-merge

clean
  `babel-node --eval "require('./tools/clean')().catch(err => console.log(err.stack))"`

build
 `babel-node --eval "require('./tools/build')().catch(err => console.log(err.stack))"`

build:release
  `babel-node --eval "require('./tools/build')().catch(err => console.log(err.stack))" release`

deploy
  `babel-node --eval "require('./tools/deploy')().catch(err => console.log(err.stack))"`

### Migrating from bitbucket
Easiest way to migrate from bitbucket to gitlab is to remove the folder containing the herobuilder

And then following the [Getting Started](### Getting Started) section of the README
