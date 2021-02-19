import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

import Color from './classes/color';
import ColorSwatch from "./classes/color-swatch";
import TextField from './classes/text-field';
import PhoneField from './classes/phone-field';
import ImageSizer from './classes/image-sizer';
import LogoLocator from './classes/logo-locator';
import PhotoLocator from './classes/photo-locator';

var document = require('sketch/dom').getSelectedDocument();

export default function() {
  var vertical = new TextField(document, 'Vertical').outputText();
  this.updateColors(vertical);
  this.updateTextFields(vertical);
  this.updateLogos(vertical);

  sketch.UI.message('Ads Updated Successfully!');
}

export function updateColors(vertical) {
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

export function updateTextFields(vertical) {
  new TextField(document, 'Partner Name').update();
  new TextField(document, 'Location').update();
  if (vertical === 'Real Estate') {
    new PhoneField(document, 'Area Code').update();
    new TextField(document, 'Listing Tagline').update();
  } else if (vertical === 'Mortgage') {
    new TextField(document, 'Button Text').update();
    new TextField(document, 'Title').update();
    new TextField(document, 'Disclaimer').update();
  }
  new TextField(document, 'Retargeting Tagline').update();
}

export function updateLogos(vertical) {
  if (vertical === 'Real Estate') {
    new ImageSizer(document, 'Logos', 'Listing').update();
    var listingLogo = new ImageSizer(document, 'Logos', 'Listing').getImageCanvas();
    var listingLogoLocator = new LogoLocator(document, listingLogo)
    listingLogoLocator.centerAlign('listings-1-web');
    listingLogoLocator.centerAlign('Social Media Listing Ad Style 1');
  }

  new ImageSizer(document, 'Logos', 'Brand').update();
  var brandLogo = new ImageSizer(document, 'Logos', 'Brand').getImageCanvas();
  var brandLogoLocator = new LogoLocator(document, brandLogo)
  brandLogoLocator.leftAlign('brand-1-web');
  brandLogoLocator.leftAlign('sphere-1-web');
  brandLogoLocator.centerAlign('Social Media Brand Ad Style 1');
  brandLogoLocator.centerAlign('brand-1-ad-builder', 1);
  brandLogoLocator.leftAlign('brand-1-banner-slide-one');
  brandLogoLocator.leftAlign('brand-1-banner-slide-two');
  brandLogoLocator.leftAlign('brand-1-mobile-slide-three');
}

export function updateImages(vertical) {
  new ImageSizer(document, 'Photos', 'Agent').update();
  if (vertical === 'Real Estate') {
    new ImageSizer(document, 'Photos', 'House').update();
  }
  var agentPhoto = new ImageSizer(document, 'Photos', 'Agent').getImageCanvas();
  new PhotoLocator(document, 'Agent', agentPhoto).update();
}
