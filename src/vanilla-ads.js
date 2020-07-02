import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

import Color from './classes/color';
import ColorSwatch from "./classes/color-swatch";

var document = require('sketch/dom').getSelectedDocument();

export default function() {
  new Color(document, 'primary').update();
  new Color(document, 'secondary').update();
  this.handleTertiary();
  new Color(document, 'additional-1').update();
  new Color(document, 'additional-2').update();

  sketch.UI.message('Ads Updated Successfully!');
}

export function handleTertiary() {
  var tertiary = new Color(document, 'tertiary');
  tertiary.update();
  var hideTertiary = tertiary.isEmpty();
  new ColorSwatch(document, hideTertiary).update();
}
