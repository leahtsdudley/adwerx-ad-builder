export default class Color {
  constructor(document, fieldName) {
    this.document = document;
    this.input = fieldName + "-color-input";
    this.text = fieldName + "-color-text";
    this.display = fieldName + "-color-display";
    this.font = fieldName + "-font-color";
  }

  update() {
    this.setDisplay();
    this.setAdColors();
    this.setText();
    this.setFontColor();
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
    // to programatically set brand colors
    this.getInputLayer().text = color;
    return this;
  }

  setDisplay() {
    var color = this.getInputLayer().text
    this.getDisplayLayer().style.fills[0].color = color;
    return this;
  }

  setAdColors() {
    this.setSharedStyle();
    var layers = this.getSharedStyle().getAllInstancesLayers();
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.syncWithSharedStyle(this.getSharedStyle());
      var textOverlaid = this.findLocalText(layers[i]);
      for (var j = 0; j < textOverlaid.length; j++) {
        textOverlaid[j].style.textColor = this.outputColor(this.localColor())
      }
      var phoneBorderOverlaid = this.findLocalPhoneBorder(layers[i]);
      for (var j = 0; j < phoneBorderOverlaid.length; j++) {
        phoneBorderOverlaid[j].style.borders[0].color = this.outputColor(this.localColor())
      }
    }
  }

  setText() {
    this.getTextLayer().text = this.localColor().slice(0, -2);
    this.getTextLayer().hidden = this.isEmpty();
    this.getDisplayLayer().hidden = this.isEmpty();
  }

  setFontColor() {
    var text = this.document.getLayersNamed(this.font);
    for (var i = 0; i < text.length; i++) {
      text[i].style.textColor = this.localColor()
    }
  }

  getSharedStyle() {
    var sharedStyleId = this.getDisplayLayer().sharedStyleId;
    return this.document.getSharedLayerStyleWithID(sharedStyleId);
  }

  setSharedStyle() {
    this.getSharedStyle().style.fills[0].color = this.localColor();
  }

  localColor() {
    return this.getDisplayLayer().style.fills[0].color
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

  findLocalPhoneBorder(colorLayer) {
    var artboard = colorLayer.getParentArtboard();
    return artboard.layers.filter(function (layer) {
      return layer.type === 'ShapePath' && layer.name === 'Phone Border' &&
        layer.frame.y >= colorLayer.frame.y &&
        layer.frame.y <= (colorLayer.frame.y + colorLayer.frame.height) &&
        layer.frame.x >= colorLayer.frame.x &&
        layer.frame.x <= (colorLayer.frame.x + colorLayer.frame.width)
    })
  }

  isEmpty() {
    return (this.getInputLayer() === 'undefined' )
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
