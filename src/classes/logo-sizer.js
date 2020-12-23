export default class LogoSizer {
  constructor(document, logoType) {
    this.document = document;
    this.logoType = logoType;
  }

  update() {
    this.sizeCanvasToFit();
  }

  getLogoCanvas() {
    var symbolName = "Logos/" + this.logoType
    var symbols = this.document.getSymbols();
    return symbols.filter(function (symbol) {
      return symbol.name === symbolName
    })[0];
  }

  getLogoImage() {
    var logoCanvas = this.getLogoCanvas();
    return logoCanvas.layers[0];
  }

  sizeCanvasToFit() {
    var logoCanvas = this.getLogoCanvas();
    var logoImage = this.getLogoImage();
    if (logoImage === undefined) return;
    logoImage.frame.x = 0;
    logoImage.frame.y = 0;
    var initial_height = logoImage.frame.height;
    var initial_width = logoImage.frame.width;
    var frame_height = logoCanvas.frame.height;
    logoImage.frame.height = frame_height;
    var end_width = initial_width * frame_height / initial_height;
    logoCanvas.frame.width = end_width;
    logoImage.frame.width = end_width;
  }

}
