import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

import Color from './classes/color';
import ColorSwatch from "./classes/color-swatch";
import TextField from './classes/text-field';
import PhoneField from './classes/phone-field';
import LogoSizer from './classes/logo-sizer';
import LogoLocator from './classes/logo-locator';
import Image from './classes/image';

var document = require('sketch/dom').getSelectedDocument();

export default function() {
  this.updateColors();
  this.updateTextFields();
  this.updateLogos();
  this.updateImages();

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
  new PhoneField(document, 'Area Code').update();
  new TextField(document, 'Listing Tagline').update();
  new TextField(document, 'Retargeting Tagline').update();
}

export function updateLogos() {
  new LogoSizer(document, 'Listing').update();
  var listingLogo = new LogoSizer(document, 'Listing').getLogoCanvas();
  var listingLogoLocator = new LogoLocator(document, listingLogo)
  listingLogoLocator.centerAlign('listings-1-web');
  listingLogoLocator.centerAlign('Social Media Listing Ad Style 1');

  new LogoSizer(document, 'Brand').update();
  var brandLogo = new LogoSizer(document, 'Brand').getLogoCanvas();
  var brandLogoLocator = new LogoLocator(document, brandLogo)
  brandLogoLocator.leftAlign('brand-1-web');
  brandLogoLocator.leftAlign('sphere-1-web');
  brandLogoLocator.centerAlign('Social Media Brand Ad Style 1');
  brandLogoLocator.centerAlign('brand-1-ad-builder', 1);
  brandLogoLocator.leftAlign('brand-1-banner-slide-one');
  brandLogoLocator.leftAlign('brand-1-banner-slide-two');
  brandLogoLocator.leftAlign('brand-1-mobile-slide-three');
}

export function updateImages() {
  new Image(document, 'Agent').update();
  new Image(document, 'House').update();
}
