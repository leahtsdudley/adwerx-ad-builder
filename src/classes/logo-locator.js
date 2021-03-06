export default class LogoLocator {
  constructor(document, logo) {
    this.document = document;
    this.logo = logo;
  }

  centerAlign(artboardName, padding) {
    this.alignVertical = 'middle';
    this.alignHorizontal = 'center';
    this.padding = padding || 5;
    var localLogo = this.findArtboardLogo(artboardName);
    this.setWrapper(artboardName);
    localLogo.frame = this.setDimensions();
  }

  leftAlign(artboardName, padding) {
    this.alignVertical = 'middle';
    this.alignHorizontal = 'left';
    this.padding = padding || 5;
    var localLogo = this.findArtboardLogo(artboardName);
    this.setWrapper(artboardName);
    localLogo.frame = this.setDimensions();
    if (artboardName === 'sphere-1-web' ||
        artboardName === 'brand-1-web' ||
        artboardName === 'brand-1-mobile-slide-three') {
      this.setBottomBarText(artboardName)
    }
  }

  rightAlign(artboardName, padding) {
    this.alignVertical = 'middle';
    this.alignHorizontal = 'right';
    this.padding = padding || 5;
    var localLogo = this.findArtboardLogo(artboardName);
    this.setWrapper(artboardName);
    localLogo.frame = this.setDimensions();
  }

  findArtboardLogo(artboardName) {
    return this.logo.getAllInstances().filter(function (local) {
      return local.getParentArtboard().name === artboardName
    })[0]
  }

  setWrapper(artboardName) {
    var wrappers = this.document.getLayersNamed('Logo Wrapper');
    this.wrap = wrappers.filter(function (wrapper) {
      return wrapper.getParentArtboard().name === artboardName
    })[0].frame
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
    return this.wrap.width - (this.padding * 2)
  }

  maxHeight() {
    return this.wrap.height - (this.padding * 2)
  }

  aspectRatio(width, height) {
    return width / height;
  }

  imageAspectRatio() {
    return this.aspectRatio(this.logo.frame.width, this.logo.frame.height);
  }

  maxAspectRatio() {
    return this.aspectRatio(this.maxWidth(), this.maxHeight())
  }

  setBottomBarText(artboardName) {
    var text = this.getLayer('Bottom Bar Text', artboardName);
    text.frame.x = this.displayLeft() + this.displayWidth() + 10;
  }

}
