import ColorVariable from "./color-variable";

export default class Color {
  constructor(document, fieldName) {
    this.document = document;
    this.input = fieldName + "-color-input";
    this.text = fieldName + "-color-text";
    this.display = fieldName + "-color-display";
    this.group = fieldName + " color";
  }

  update(vertical) {
    if (this.isEmpty()) {
      var colorGroup = this.document.getLayersNamed(this.group)[0];
      colorGroup.hidden = true;
    } else {
      this.setDisplay();
      this.setAdColors(vertical);
      this.setText();
      if (vertical === 'Motion Real Estate' && this.input === 'secondary-color-input') {
        this.setFontColor();
      }
    }
  }

  getInputLayer() {
    return this.document.getLayersNamed(this.input)[0];
  }

  getTextLayer() {
    return this.document.getLayersNamed(this.text)[0];
  }

  getDisplayLayer() {
    return this.document.getLayersNamed(this.display)[0];
  }

  setInputLayer(color) {
    this.getInputLayer().text = color;
    return this;
  }

  setDisplay() {
    var color = this.getInputLayer().text
    this.getDisplayLayer().style.fills[0].color = color;
    return this;
  }

  setColorVariable() {
    var colorName = this.fieldName;
    var hexCode = this.getInputLayer().text;
    new ColorVariable(this.document, colorName, hexCode).update();
  }

  setAdColors(vertical) {
    this.setSharedStyle();
    var sharedColorLayers = this.getSharedStyle().getAllInstancesLayers();
    for (var i = 0; i < sharedColorLayers.length; i++) {
      sharedColorLayers[i].style.syncWithSharedStyle(this.getSharedStyle());
      var textLayers = this.findLocalText(sharedColorLayers[i]);
      this.setTextColor(textLayers);
      var buttonBorderLayers = this.findLocalButtonBorders(sharedColorLayers[i]);
      if (buttonBorderLayers.length > 0) {
        this.setButtonBorderColor(buttonBorderLayers);
      }
    }
    if (this.input === 'primary-color-input') {
      this.setOverlayBarColor(vertical);
    }
  }

  getSharedStyle() {
    var sharedStyleId = this.getDisplayLayer().sharedStyleId;
    return this.document.getSharedLayerStyleWithID(sharedStyleId);
  }

  setSharedStyle() {
    this.getSharedStyle().style.fills[0].color = this.localColor();
  }

  findLocalText(colorLayer) {
    var artboard = colorLayer.getParentArtboard();
    return artboard.layers.filter(function (layer) {
      return layer.type === 'Text' &&
        layer.frame.y >= colorLayer.frame.y &&
        layer.frame.y <= (colorLayer.frame.y + colorLayer.frame.height) &&
        layer.frame.x >= colorLayer.frame.x &&
        layer.frame.x <= (colorLayer.frame.x + colorLayer.frame.width)
    })
  }

  setTextColor(textLayers) {
    for (var j = 0; j < textLayers.length; j++) {
      textLayers[j].style.textColor = this.outputColor(this.localColor())
    }
  }

  setText() {
    this.getTextLayer().text = this.localColor().slice(0, -2);
  }

  setFontColor() {
    var changingHeadline = this.document.getLayersNamed('Headline').filter(function (local) {
      return local.getParentArtboard().name === 'listings-3-web-slide2'
    })[0];
    changingHeadline.style.textColor = this.localColor();

    var changingPhone = this.document.getLayersNamed('Phone Number').filter(function (local) {
      return local.getParentArtboard().name === 'listings-3-web-slide3'
    })[0];
    changingPhone.style.textColor = this.localColor();
  }

  findLocalButtonBorders(colorLayer) {
    var artboard = colorLayer.getParentArtboard();
    return artboard.layers.filter(function (layer) {
      return layer.type === 'ShapePath' && layer.name === 'Button Border' &&
        layer.frame.y >= colorLayer.frame.y &&
        layer.frame.y <= (colorLayer.frame.y + colorLayer.frame.height) &&
        layer.frame.x >= colorLayer.frame.x &&
        layer.frame.x <= (colorLayer.frame.x + colorLayer.frame.width)
    })
  }

  setButtonBorderColor(buttonBorderLayers) {
    for (var j = 0; j < buttonBorderLayers.length; j++) {
      buttonBorderLayers[j].style.borders[0].color = this.outputColor(this.localColor())
    }
  }

  // findGroupedText(colorLayer) {
  //   var artboard = colorLayer.getParentArtboard();
  //   return artboard.layers.filter(function (layer) {
  //     return layer.type === 'Group' && layer.name === 'Phone and Location'
  //   })
  // }

  setOverlayBarColor(vertical) {
    var overlayBarLayers = this.document.getLayersNamed('Overlay Bar');
    for (var j = 0; j < overlayBarLayers.length; j++) {
      if (vertical == 'Wealth Management')
        { overlayBarLayers[j].style.opacity = 0.5 }
      else if (vertical == 'Motion Real Estate') {
        console.log(overlayBarLayers[j]);
        var barGradient = overlayBarLayers[j].style.fills[0].gradient;
        // Alpha 0%
        barGradient.stops[0].color = (this.localColor().slice(0, -2) + '00');
        // Alpha 100%
        barGradient.stops[1].color = (this.localColor().slice(0, -2) + 'FF');
      }
      else {
        var barGradient = overlayBarLayers[j].style.fills[0].gradient
        // Alpha 57%
        barGradient.stops[0].color = (this.localColor().slice(0, -2) + '91');
        // Alpha 92%
        barGradient.stops[1].color = (this.localColor().slice(0, -2) + 'EB');
      }
    }
  }

  localColor() {
    return this.getDisplayLayer().style.fills[0].color
  }

  isEmpty() {
    return (this.getInputLayer() === undefined )
  }

  outputColor(backgroundColor) {
    var rgb = this.hexToRgb(backgroundColor.slice(0, -2));
    if (rgb && ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186)) {
      return '#000000'
    } else {
      return '#FFFFFF'
    }
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
