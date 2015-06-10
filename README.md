# Подія.укр

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

You need to run `DEBUG=events:* grunt` in development.

To deploy you need to run `./deploy.sh`.

To find tasks `grep -r 'TODO' --exclude-dir=node_modules --exclude-dir=bower_components --exclude-dir=.git --exclude-dir=vendor --exclude-dir=public`
