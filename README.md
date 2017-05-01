# CommonsChunkPlugin-async-testcase

# About
This testcase demonstrates an issue when using CommonsChunkPlugin in some production-like configurations.

# Running
```
yarn
npm start
```
After `npm start` finishes, a new browser window will be opened. Inspecting the dev tools console shows this error:

```
Uncaught TypeError: Cannot read property 'call' of undefined
    at __webpack_require__ (manifest.cc96ba.js:55)
    at webpackJsonpCallback (manifest.cc96ba.js:26)
    at pageA.b287e3.js:1
```

Gist of build results: [https://gist.github.com/jbellenger/f16429c8787969591e245d024c75db69](https://gist.github.com/jbellenger/f16429c8787969591e245d024c75db69)


# Interpretation
The error surfaces when on all of these conditions are met:

- the webpack runtime is extracted with a CommonsChunkPlugin
- multiple entry points point to the same module
- an async CommonsChunkPlugin is used with `minChunks` less than or equal to the number of entry points.

The error is caused when CommonsChunkPlugin extracts the entry module from a chunk, producing an entry chunk that depends on a module that that it does not contain.