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

![Watch the video](https://github.com/SheepCreativeSoftware/progress-bar-capture/assets/33145691/a473b577-75d6-4c22-9d43-6a71f2d8e42c)

It captures following commands:
```js
console.log();
console.info();
console.warn();
console.error();
console.debug();
```

## Instalation
```bash
npm i progress-bar-capture
```

## Basic Usage
The progress-bar-capture module can be loaded using ESM:
```js
import { ProgressBar } from 'progress-bar-capture';
```

First you need to integrate the progress-bar-capture into your application:
```js
const progressBar = new ProgressBar(options);
```

Then you can use `start` to print a progress bar to the terminal:
```js
// Start to print the progress bar on terminal
progressBar.start();
```
*Note: this also starts the capturing of console output*

Now you can update the value of the progress bar using `update` while youre process is been executed:
```js
progressBar.update(25);
// ... do some stuff
progressBar.update(50);
// ... do some stuff
progressBar.update(75);
// ... do some stuff
progressBar.update(100);
```

When you are finished with your process, you can remove/destroy the progress bar using `finish`:
```js
progressBar.finish();
```
*Note: this also stops the capturing of console output*

## Configuring progress-bar-capture
The configuration is optional. Without any manual configuration, progress-bar-capture tries to use reasonable defaults.
However, sometimes you may need to change it's configuration.  

You can apply a configuration when starting a new instance of progress-bar-capture by providing an object.
```js
const progressBar = new ProgressBar(options);
```

### Options

The object can have following options:
#### options.isInteractiveSession
----------------------------------
Type: `boolean` Default: `true || process.stdout.isTTY`

In interactive sessions the progress bar is shown in the terminal, while in non-interactive sessions (ussually not a terminal) it is hidden. By default, progress-bar-capture tries to detect whether a session is interative or not.
To explicitly enable or disable interactive sessions, use the `isInteractiveSession` function

#### options.maxNumber
----------------------------------
Type: `number` Default: `100`

Defines the number that represents 100% in progress of the progress bar.

#### options.minChangeOfValue
----------------------------------
Type: `number` Default: `1`

By default progress-bar-capture tries only to print a new progress value to the terminal when using `update` if the value has change by more than the value of `minChangeOfValue`.
This improves performance and prevents flickering.

#### options.percentageFractionDigits
----------------------------------
Type: `number` Default: `1`

You can change the number of digits after the decimal point, for the percentage value using `percentageFractionDigits`

#### options.prefixText
----------------------------------
Type: `string` Default: `''`

You can add an additional prefixed text to the progress bar (e.g. 'Progress')
*If the string is empty, only the percentage will be displayed.*

### Chaining functions
If you want to run a number of progress-bar-capture functions as a sequence, you can chain them into a single call.
```js
// Start and set a progress
progressBar.start().update(value);
// Restart with a new progress
progressBar.finish().start().update(value);
```

## License
Copyright (c) 2023-2024 Marina Egner ([sheepcs.de](https://sheepcs.de)). This is free software and may be redistributed under the terms specified in the LICENSE file.
