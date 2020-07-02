export default class ColorSwatch {

  constructor(document, hideTertiary) {
    this.document = document;
    this.symbols = document.getSymbols();
    this.hideTertiary = hideTertiary;
  }

  swatchWithTertiary() {
    return this.symbols.filter(function (symbol) {
      return symbol.name === "Color/Swatch/Selector"
    })[0];
  }

  swatchWithoutTertiary() {
    return this.symbols.filter(function (symbol) {
      return symbol.name === "Color/Swatch/Selector Without Tertiary"
    })[0];
  }

  getSwatchSymbolId() {
    if (this.hideTertiary) {
      return this.swatchWithoutTertiary().symbolId;
    } else {
      return this.swatchWithTertiary().symbolId;
    }
  }

  update() {
    var symbolId = this.getSwatchSymbolId();
    this.swatchWithTertiary().getAllInstances().forEach(function (instance) {
      instance.symbolId = symbolId;
    })
    this.swatchWithoutTertiary().getAllInstances().forEach(function (instance) {
      instance.symbolId = symbolId;
    })
  }

}
