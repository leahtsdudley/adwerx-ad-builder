export default class TextField {
  constructor(document, fieldName) {
    this.document = document;
    this.fieldName = fieldName;
    this.input = fieldName + " input";
  }

  update() {
    var text = this.outputText();
    var layers = this.getFieldLayers();
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'SymbolInstance') {
        layers[i].overrides[0].value = text
        layers[i].overrides[2].value = this.getCharacterLength(text);
      } else {
        layers[i].text = text;
      }
    }
  }

  getInputLayer() {
    return this.document.getLayersNamed(this.input)[0];
  }

  outputText() {
    return this.isEmpty() ? ' ' : this.getInputLayer().text;
  }

  getFieldLayers() {
    return this.document.getLayersNamed(this.fieldName);
  }

  getCharacterLength(text) {
    return text.toString().length || 0
  }

  isEmpty() {
    return (this.getInputLayer() === undefined)
  }

}
