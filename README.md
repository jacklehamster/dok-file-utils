# ![](icon.png) dok-file-utils
Dobuki's file utils. Just a simple way to load files

Those are browser APIs exposed as npm modules.


## Setup

### Directly in web page

Include the scripts in html as follow:
```
<script src="https://unpkg.com/dok-file-utils/src/file-utils.js"></script>
<script src="https://unpkg.com/dok-file-utils/src/image-loader.js"></script>
```


### Through NPM


Add to `package.json`:
```
  "dependencies": {
  	...
    "dok-file-utils": "^1.0.0",
    ...
  }
```


Use Browserify to make classes available in browser

In `package.json`:
```
  "scripts": {
  	...
    "browserify": "browserify browserify/main.js -s dok-lib -o public/gen/compact.js",
    ...
  },

```

In `browserify/main.js`:
```
const { FileUtils, ImageLoader } = require('dok-file-utils');

module.exports = {
  FileUtils,
  ImageLoader,
};
```

## Components

### FileUtils

#### Description
FileUtils is used to load files. It caches data for duplicate files loaded to avoid repeated loads.

#### Usage
```
const fileUtils = new FileUtils();
const json = await fileUtils.load("file.json");

```

### ImageLoader

#### Description
ImageLoader is used for loading images. Like FileUtils, it caches images to avoid duplicate. ImageLoader tracks progress of downloaded images, and it uses Blob to provide a URL that can be reused to avoid multiple load of images.

### Usage
```
const imageLoader = new ImageLoader({
			"assets/cursor.png": true,
		});
const image = await imageLoader.load("image.png");

const cursor = await imageLoader.load("assets/cursor.png");
// In this case, cursor.url is the URL of a block that can be reused. This is useful when using a changing cursor in CSS that points to an image, avoiding repeated load of that image.
```

### Demo

[demo](https://jacklehamster.github.io/dok-file-utils/)