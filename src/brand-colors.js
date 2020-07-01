import Color from "./classes/color";
var UI = require('sketch/ui');
var document = require('sketch/dom').getSelectedDocument();

export default function() {
  var brandCode = '';
  var colors = ['#FFFFFF', '#FFFFFF', '#FFFFFF'];
  UI.getInputFromUser("Brand Name?", {
    type: UI.INPUT_TYPE.selection,
    possibleValues: ['Coldwell Banker', 'Century 21', 'Sotheby\'s International Realty', 'ERA']
  }, (err, value) => {
    brandCode = value;
    if (err) {
      // most likely the user canceled the input
      throw err.message
    }
  });

  switch (brandCode) {
    case 'Coldwell Banker':
      colors = ['#012169', '#97999b', '#7d9bc1'];
      break;
    case 'Century 21':
      colors = ['#BEAF87', '#252526', '#E6E7E8'];
      break;
    case 'ERA':
      colors = ['#C8120E', '#250E62', '#8A1538'];
      break;
    case 'Sotheby\'s International Realty':
      colors = ['#002349', '#999999', '#666666'];
      break;
  }

  var primary = new Color(document, 'primary');
  var secondary = new Color(document, 'secondary');
  var tertiary = new Color(document, 'tertiary');

  primary.setDefaultColor(colors[0]).update();
  secondary.setDefaultColor(colors[1]).update();
  tertiary.setDefaultColor(colors[2]).update();

}
