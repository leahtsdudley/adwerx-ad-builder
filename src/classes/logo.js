export default class Logo {
  constructor(document, logoType) {
    this.document = document;
    this.logoType = logoType;
  }

  update() {
    this.sizeCanvasToFit();
    if (this.logoType === 'Listing') {
      // this.centerAlign('listings-1-web');
      // this.centerAlign('Social Media Listing Ad Style 1');
    }
    else if (this.logoType === 'Brand') {
      // this.leftAlign('brand-1-web');
      // this.leftAlign('sphere-1-web');
      // this.centerAlign('Social Media Brand Ad Style 1');
      // this.centerAlign('brand-1-ad-builder', 1);
      // this.leftAlign('brand-1-banner-slide-one');
      // this.leftAlign('brand-1-banner-slide-two');
      // this.leftAlign('brand-1-mobile-slide-three');
    };
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

  setWrapper(artboardName) {
    var wrapper = this.document.getLayersNamed('Logo Wrapper');
    this.wrap = wrapper.filter(function (wrapper) {
      return wrapper.getParentArtboard().name === artboardName
    })[0].frame
  }

  centerAlign(artboardName) {
    this.alignVertical = 'middle';
    this.alignHorizontal = 'center';
    this.padding = 5;
    var localLogo = this.getLogoImage();
    this.setWrapper(artboardName);
    localLogo.frame = this.setDimensions();
  }

  leftAlign(artboardName, padding) {
    this.alignVertical = 'middle';
    this.alignHorizontal = 'left';
    this.padding = padding || 5;
    var localLogo = this.getLogoCanvas();
    this.setWrapper(artboardName);
    localLogo.frame = this.setDimensions();
    var office = this.getLayer('Partner Name', artboardName);
    var location = this.getLayer('Location', artboardName);
    location.frame.x = this.displayLeft() + this.displayWidth() + this.padding;
    office.frame.x = this.displayLeft() + this.displayWidth() + this.padding;
  }

  setDimensions() {
    return {
      x: this.displayLeft(),
      y: this.displayTop(),
      width: this.displayWidth(),
      height: this.displayHeight()
    }
  }

  getLayer(name, artboardName) {
    var layers = this.document.getLayersNamed(name);
    return layers.filter(function (layer) {
      return layer.getParentArtboard().name === artboardName
    })[0];
  }

  displayLeft() {
    switch (this.alignHorizontal) {
      case 'left':
        return this.wrap.x + this.padding;
      case 'right':
        return this.wrap.x + this.padding + this.maxWidth() - this.displayWidth();
      case 'center':
        return this.wrap.x + this.padding + (this.maxWidth() - this.displayWidth()) / 2;
    }
  }

  displayTop() {
    switch (this.alignVertical) {
      case 'top':
        return this.wrap.y + this.padding;
      case 'bottom':
        return this.wrap.y + this.padding + this.maxHeight() - this.displayHeight();
      case 'middle':
        return this.wrap.y + this.padding + (this.maxHeight() - this.displayHeight()) / 2;
    }
  }

  displayWidth() {
    if (this.imageAspectRatio() < this.maxAspectRatio()) {
      return this.maxHeight() * this.imageAspectRatio()
    } else {
      return this.maxWidth()
    }
  }

  displayHeight() {
    if (this.imageAspectRatio() < this.maxAspectRatio()) {
      return this.maxHeight()
    } else {
      return this.maxWidth() / this.imageAspectRatio()
    }
  }

  maxWidth() {
    return this.wrap.width - (this.padding * 2);
  }

  maxHeight() {
    return this.wrap.height - (this.padding * 2);
  }

  aspectRatio(width, height) {
    return width / height;
  }

  imageAspectRatio() {
    var logo = this.getLogoCanvas();
    return this.aspectRatio(logo.frame.width, logo.frame.height);
  }

  maxAspectRatio() {
    return this.aspectRatio(this.maxWidth(), this.maxHeight());
  }

}
