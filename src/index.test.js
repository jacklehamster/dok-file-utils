const expect = require('chai').expect;

const { FileUtils, ImageLoader } = require('./index.js');

const MockXMLHttpRequest = require('mock-xmlhttprequest');
const MockXhr = MockXMLHttpRequest.newMockXhr();

// Mock JSON response
MockXhr.onSend = (xhr) => {
  const responseHeaders = { 'Content-Type': 'application/json' };
  const response = '{ "success": true }';
  xhr.respond(200, responseHeaders, response);
};

describe('FileUtils', function() {
  it('should load from FileUtils', async function() {
  	const fileUtils = new FileUtils(MockXhr);
    const data = await fileUtils.load("file.json");
    expect(data.success).to.be.true;
    expect(fileUtils.fileStock["file.json"].data).to.equal(data);
    expect(fileUtils.fileStock["file.json"].url).to.equal("file.json");
    expect(fileUtils.fileStock["file.json"].progress).to.equal(1);
    expect(fileUtils.fileStock["file.json"].loaded).to.be.true;
  });
});

describe('ImageLoader', function() {
  it('should load from ImageLoader', async function() {
    const Image = class {
      addEventListener(type, callback) {
        expect(type).to.equal("load");
        setTimeout(callback, 1000);
      }
    };
    globalThis.URL.createObjectURL = () => "<url>";
    globalThis.URL.revokeObjectURL = () => {};


    console.log(URL);
    const imageLoader = new ImageLoader({}, MockXhr, Image);
    const { src } = await imageLoader.loadImage("file.png");
    expect(src).to.equal('<url>');
  });
});
