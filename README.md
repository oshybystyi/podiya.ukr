# Подія.укр

Перед запуском необхідно встановити [npm](https://www.npmjs.com/package/npm) та [bower](https://www.npmjs.com/package/bower).

Після цього в корні проекту зробити:

```shell
npm install
bower install
```

Для запуску необхідно зробити `DEBUG=events:* grunt`.

#### Для деплойменту

Необхідно встановити рубі та бандл.

В корні проекту запустити:

```bash
bundle install
```

Для деплоя на production необхідно `./deploy.sh`

#### Щоб знайти нові завдання

```shell
grep -r 'TODO' --exclude-dir=node_modules --exclude-dir=bower_components --exclude-dir=.git --exclude-dir=vendor --exclude-dir=public
```

### In english

Before running project you need to install [npm](https://www.npmjs.com/package/npm) and [bower](https://www.npmjs.com/package/bower).

After that in root of the project you need to:

```shell
npm install
bower install
```

To run the application you need `DEBUG=events:* grunt`.

To deploy you need to install ruby and bundle after that run `./deploy.sh`.

To find tasks `grep -r 'TODO' --exclude-dir=node_modules --exclude-dir=bower_components --exclude-dir=.git --exclude-dir=vendor --exclude-dir=public`
