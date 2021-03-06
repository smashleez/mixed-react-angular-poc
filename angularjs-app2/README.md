# availity-toolkit

> Starter project for Angular apps on the Availity platform.

## Table of Contents

* [Requirements](#requirements)
* [Features](#features)
* [Getting Started](#getting-started)
* [Git](#git)
* [Releasing](#releasing)
* [Upgrading](#upgrading)
* [Troubleshooting](#troubleshooting)
* [NPM](#npm)
* [Best Practices](#best-practices)
* [Authors](#authors)
* [License](#license)

## Requirements

* [node.js](https://nodejs.org/download/) - `brew install node` _(mac)_
* [node-gyp](https://github.com/nodejs/node-gyp) - is a cross-platform command-line tool for compiling native add-on modules for Node.js.  Please review your [system requirements](https://github.com/nodejs/node-gyp#installation) for Node to function properly.
* [git](http://git-scm.com/downloads) - `brew install git` _(mac)_
* [bower](http://bower.io/)  - `npm install -g bower`

## Features

The Toolkit combines several projects that simplify developing web applications on Availity platform. These projects include:

* [availity-angular](https://github.com/Availity/availity-angular) -  Client side web framework using [Angular 1.2.28](https://github.com/angular/angular.js/tree/v1.2.28) :neckbeard:
* [availity-ekko](https://github.com/Availity/availity-ekko) - Mock server for REST API simulation
* [availity-uikit](https://github.com/Availity/availity-uikit) - HTML, CSS, and JS framework powered by [Boostrap 3'ish](http://getbootstrap.com/)
* [availity-workflow](https://github.com/Availity/availity-workflow) - Upgradeable task and workflow modules that leverage:
    * [Karma](http://karma-runner.github.io/0.13/index.html) with [Jasmine](http://jasmine.github.io/2.0/introduction.html) integration
    * [Webpack](https://webpack.github.io/)
    * [Less](http://lesscss.org/)
* [Fontello Fonts](http://fontello.com/)

## Getting Started

* `git clone https://github.com/Availity/availity-toolkit {{your-project-name}}`
* `cd {{your-project-name}}`
* `npm install availity-workflow --save-dev`
* `bower install availity-uikit availity-angular --save`
* `npm install` - install module dependencies
* run the CLI for project initialization by updating the `package.json`, `bower.json` and `availity.json` meta info.
    * **Windows:** `node_modules\.bin\av init`
    * **Mac:** `./node_modules/.bin/av init`
* `npm run start`
    * starts the development server on `http://localhost:3000`

## Git

Before pushing to Git repository:

* cd into `{{your-project-name}}`
* delete the `.git` folder else you will contain `availity-toolkit` history inside your project
* `git init`
* `git remote add origin ssh://{{your-git-url}}.git`
* `git push` to your Git repo

## Releasing

* `npm run production`
    - run interactive cli
    - minifies bundles
    - cache bust bundles
    - tags bundle in git
    - bundles are stored in `./dist` folder
* `npm run staging`
    - run interactive cli
    - cache bust bundles
    - tags bundle in git
    - bundles are stored in `./dist` folder
* `npm run integration`
    - run interactive cli
    - cache bust bundles
    - bundles are stored in `./build` folder

## Upgrading

Always check the release logs for changes

* https://github.com/Availity/availity-workflow/releases
* https://github.com/Availity/availity-uikit/releases
* https://github.com/Availity/availity-angular/releases

Upgrading Availity bower modules

>`bower install availity-uikit availity-angular --save`

Upgrading the Toolkit workflow

>`npm install availity-workflow --save-dev`

## Troubleshooting

* Git protocol blocked by firewall
    * `git config --global url."https://".insteadOf git://`
* Windows installation issues
    * Please review your [node-gyp system requirements](https://github.com/nodejs/node-gyp#installation) for Node to function properly.
* `EADDRNOTAVAIL` or `ERR_CONNECTION_CLOSED`
    * Change bind address from `0.0.0.0` to `127.0.0.1` or `localhost` for your [web server](https://github.com/Availity/availity-toolkit/blob/master/project/config/developer-config-example.js#L14) configuration


## NPM

* `npm start` - starts the development server on `http://localhost:3000`
* `npm run tests` - executes your spec files using the Karma test runner and [Phantom.js](http://phantomjs.org/)
* `npm run production` - see [releasing](#releasing)
* `npm run staging` - see [releasing](#releasing)
* `npm run integration` - see [releasing](#releasing)
* `npm run lint` - lint browser and node javascript files

## CLI

* `/node_modules/.bin/av --help`


## Best Practices

We encourage you to organize your project using feature folders and dashes **`-`** within file names for readability.

##### Good


```bash
????????? project
|    ????????? app/
|    |    ????????? orders/
|    |    |   ????????? tests/
|    |    |   |   ?????????orders-directive-spec.js
|    |    |   |   ?????????orders-service-spec.js
|    |    |   ????????? templates/
|    |    |   |   ?????????orders-template.html
|    |    |   ????????? orders-directive.js
|    |    |   ????????? orders-controller.js
|    |    |   ????????? orders-service.js
|    |    ????????? users/
|    |    |   ????????? tests/
|    |    |   |   ?????????users-directive-spec.js
|    |    |   |   ?????????users-service-spec.js
|    |    |   ????????? templates/
|    |    |   |   ?????????users-template.html
|    |    ???   ????????? users-directive.js
|    |    ???   ????????? users-controller.js
|    |    |   ????????? order-service.js
|    |    ????????? index.js
|    |    ????????? vendor.js
|    |    ????????? module.js
|    |    ????????? index.html
```

##### Bad

```bash
????????? project
???    ????????? app/
???    ???    ????????? controllers/
???    ???    ???   ????????? homeController.js
???    ???    ???   ?????????loginController.js
???    ???    ????????? directives/
???    ???    ???   ????????? usersDirective.js
???    ???    ???   ?????????ordersDirective.js
???    ???    ????????? services/
???    ???    ???   ????????? userService.js
???    ???    ???   ????????? orderService.js
???    ???    ???   ????????? loginService.js
```


## Authors

**Robert McGuinness**
+ [rob.mcguinness@availity.com](rob.mcguinness@availity.com)

**Robert Warner**
+ [rob.warner@availity.com](rob.warner@availity.com)

**Kasey Powers**
+ [kasey.powers@availity.com](kasey.powers@availity.com)

## Disclaimer

Open source software components distributed or made available in the Availity Materials are licensed to Company under the terms of the applicable open source license agreements, which may be found in text files included in the Availity Materials.

## License

Copyright (c) 2016 Availity, LLC. Code released under the [the MIT license](LICENSE)


