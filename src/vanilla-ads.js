import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

import Color from './classes/color';
import ColorSwatch from "./classes/color-swatch";
import TextField from './classes/text-field';

var document = require('sketch/dom').getSelectedDocument();

export default function() {
  this.updateColors();
  this.updateTextFields();

  sketch.UI.message('Ads Updated Successfully!');
}

export function updateColors() {
  new Color(document, 'primary').update();
  new Color(document, 'secondary').update();
  this.handleTertiary();
  new Color(document, 'additional-1').update();
  new Color(document, 'additional-2').update();
}

export function handleTertiary() {
  var tertiary = new Color(document, 'tertiary');
  tertiary.update();
  var hideTertiary = tertiary.isEmpty();
  new ColorSwatch(document, hideTertiary).update();
}

export function updateTextFields() {
  new TextField(document, 'Partner Name').update();
  new TextField(document, 'Location').update();
}
