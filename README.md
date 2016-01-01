# swag.aurelia
Swagolicious done the Aurelia way!

To get up and running, first clone my repo

```shell
git clone https://github.com/rippo/swag.aurelia.git
```
 
Then install jspm

```shell
npm install -g jspm
```

Might as well get a http server

```shell
npm install -g http-server
```

Then use jspm to pull down the aurelia framework and dependencies

```shell
cd swag.aurelia
jspm install
```

Note: To run http server without any kind of caching

```shell
http-server -o -c-1
```

Further reading:-

http://aurelia.io/docs.html#/aurelia/framework/1.0.0-beta.1.0.6/doc/article/getting-started
