# Podiya.ukr (Подія.укр) - p.s. no longer hosted

Before running you need to install [npm](https://www.npmjs.com/package/npm), [bower](https://www.npmjs.com/package/bower) and [grunt-cli](https://www.npmjs.com/package/grunt-cli).

After that in project root you need to:

```shell
npm install
bower install
```

After that you can start application by `DEBUG=events:* grunt`.

#### To deploy

You need to install ruby and bundle.

In project root:

```bash
bundle install
```

For deployment - run `./deploy.sh`.

#### To find new tasks

```shell
grep -r 'TODO' --exclude-dir=node_modules --exclude-dir=bower_components --exclude-dir=.git --exclude-dir=vendor --exclude-dir=public
```
