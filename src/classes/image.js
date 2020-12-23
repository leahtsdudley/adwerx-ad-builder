export default class Image {
  constructor(document, imageType) {
    this.document = document;
    this.imageType = imageType;
  }

  update() {
    this.sizeCanvasToFit();
  }

  getImageCanvas() {
    var symbolName = "Images/" + this.imageType
    var symbols = this.document.getSymbols();
    return symbols.filter(function (symbol) {
      return symbol.name === symbolName
    })[0];
  }

  getImage() {
    var imageCanvas = this.getImageCanvas();
    return imageCanvas.layers[0];
  }

  sizeCanvasToFit() {
    var imageCanvas = this.getImageCanvas();
    var image = this.getImage();
    if (image === undefined) return;
    image.frame.x = 0;
    image.frame.y = 0;
    var initial_height = image.frame.height;
    var initial_width = image.frame.width;
    var frame_height = imageCanvas.frame.height;
    image.frame.height = frame_height;
    var end_width = initial_width * frame_height / initial_height;
    imageCanvas.frame.width = end_width;
    image.frame.width = end_width;
  }
}
