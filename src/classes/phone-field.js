import TextField from "./text-field";

export default class PhoneField extends TextField {
  getFieldLayers() {
    return this.document.getLayersNamed('Phone Number');
  }

  outputText() {
    return "(" + this.getInputLayer().text + ") 555-5555";
  }
}
