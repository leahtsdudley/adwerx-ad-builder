export default class ColorVariable {

  constructor(document, colorName, hexCode) {
    this.document = document;
    this.colorName = colorName;
    this.hexCode = hexCode;
    this.variables = document.swatches;
  }

  update() {
    var colorVariable = this.getVariable();
    colorVariable.sketchObject.updateWithColor(
      MSColor.colorWithHex_alpha(this.hexCode, 1)
    );
  }

  getVariable() {
    var swatchName = this.colorName + " color"
    return this.variables.filter(function (color) {
      return color.name === swatchName
    })[0];
  }

}
