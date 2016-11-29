Big redux boilerplate template with isomporphic

## install and development
To start develop, run:
```bash
yarn install
yarn start
```
and open browser with displayed link

You need use [yarn](https://github.com/yarnpkg/yarn) for install dependencies. Yarn several times faster than npm.

Jest testing with watch:
```bash
yarn test:watch
```
ps: For Mac you maybe need `brew install watchman`

Jest testing with coverage:
```bash
yarn test
```

Open storybook on http://localhost:9001/ after starting:
```bash
yarn storybook
```

Static analyze code by eslint:
```bash
yarn lint
```

Automatic fix some of eslint errors:
```bash
yarn lint:fix
```

Generate .blueprint Component command:
```bash
redux g component ComponentName
redux g component /subPath/ComponentName
```


## production
```
yarn install
yarn start-prod
```

Порты и хосты можно поменять переменными окружения, имена которых видны в packages.json в соответствующих командах npm start


