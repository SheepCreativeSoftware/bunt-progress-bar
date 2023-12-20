# progress-bar-capture

# progress-bar-capture **[WIP]**  

====================

[![NPM Version](https://img.shields.io/npm/v/progress-bar-capture.svg)](https://www.npmjs.com/package/progress-bar-capture)
[![NPM Downloads](https://img.shields.io/npm/dt/progress-bar-capture.svg)](https://www.npmjs.com/package/progress-bar-capture)
[![GitHub](https://img.shields.io/github/license/SheepCreativeSoftware/progress-bar-capture)](https://github.com/SheepCreativeSoftware/progress-bar-capture)
[![node-lts](https://img.shields.io/node/v-lts/progress-bar-capture)](https://www.npmjs.com/package/progress-bar-capture)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=RG6PSXR828X94)

## Important Note
**This module is still work in progress!**  
**Major changes can and will happend before v1.0.0**  
**Do not use this in an production enviroment**  

## Description
Simple progress bar for CLI including a simple capture function that handles console input while progress bar is shown.

## Instalation
```bash
npm i progress-bar-capture
```

## Basic Usage
Commands are following this format:
```js
import { ProgressBar } from 'progress-bar-capture';

const progressBar = new ProgressBar(options);

progressBar.update(25);
progressBar.update(50);
progressBar.update(75);
progressBar.update(100);
progressBar.finish();
```
