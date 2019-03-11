# Docx to HTML demo 

a basic implementation of a drag-and-drop docx to html convertor, using Mammoth

See a [demo](demo.html) here

## Used third-party libraries:

[Mammoth.js](https://github.com/mwilliamson/mammoth.js/) (required)   
[jQuery](https://code.jquery.com/jquery/) (optional) for postprocessing

## How to use:

Simply drag and drop a Microsoft Word .docx file into the demo page. File will be parsed and the window contents will be replaced with the parsed and postprocessed version of the resulting html structure.

You can define your own mapping between Word styles and html tags as described in the [mammoth documentation](https://github.com/mwilliamson/mammoth.js/#custom-style-map). 

```javascript
// Example mapping:
styleMap: [
    'p.Date => div.postDate',
    'p.Title => h1.mainTitle',
    'p.Subtitle => h2.subtitle',
    'p.Heading1 => h2:fresh',
    'p.Heading2 => h3:fresh',
    'p.Heading3 => h4:fresh',
    'p.ListBullet => ul > li:fresh',
    'p.ListNumber => ol > li:fresh'
]
```
Images are converted to base64 representation as part of each ```<img>``` tag.
