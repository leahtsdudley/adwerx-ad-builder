import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

import Color from './classes/color';
import ColorSwatch from "./classes/color-swatch";
import TextField from './classes/text-field';
import PhoneField from './classes/phone-field';
import ImageSizer from './classes/image-sizer';
import LogoLocator from './classes/logo-locator';

// import PhotoLocator from './classes/photo-locator';

var document = require('sketch/dom').getSelectedDocument();

export default function() {
  var vertical = new TextField(document, 'Vertical').outputText();
  this.updateColors(vertical);
  this.updateTextFields(vertical);
  this.updateLogos(vertical);
  // this.updateImages(vertical);

  sketch.UI.message('Ads Updated Successfully!');
}

export function updateColors(vertical) {
  new Color(document, 'primary').update(vertical);
  new Color(document, 'secondary').update(vertical);
  this.handleTertiary(vertical);
  new Color(document, 'additional-1').update(vertical);
  new Color(document, 'additional-2').update(vertical);
}

export function handleTertiary(vertical) {
  var tertiary = new Color(document, 'tertiary');
  tertiary.update(vertical);
  var hideTertiary = tertiary.isEmpty();
  new ColorSwatch(document, hideTertiary).update();
}

export function updateTextFields(vertical) {
  new TextField(document, 'Partner Name').update();
  new TextField(document, 'Retargeting Tagline').update();
  if (vertical === 'Real Estate' || vertical === 'Motion Real Estate') {
    new TextField(document, 'Location').update();
    new PhoneField(document, 'Area Code').update();
    new TextField(document, 'Listing Tagline').update();
    new TextField(document, 'Agent Title').update();
  } else if (vertical === 'Mortgage') {
    new TextField(document, 'Location').update();
    new TextField(document, 'Button Text').update();
    new TextField(document, 'Title').update();
    new TextField(document, 'Disclaimer').update();
  } else if (vertical === 'Wealth Management') {
    new TextField(document, 'Button Text').update();
    new TextField(document, 'Title').update();
    new TextField(document, 'Subtitle').update();
    new TextField(document, 'Disclaimer').update();
  }
}

export function updateLogos(vertical) {
  if (vertical === 'Motion Real Estate') {
    new ImageSizer(document, 'Logos', 'Listing').update();
    var listingLogo = new ImageSizer(document, 'Logos', 'Listing').getImageCanvas();
    var listingLogoLocator = new LogoLocator(document, listingLogo);
    listingLogoLocator.centerAlign('listings-1-web-slide2');
    listingLogoLocator.centerAlign('listings-1-web-slide3');
    listingLogoLocator.centerAlign('Social Media Listing Ad Style 1');
    listingLogoLocator.centerAlign('listings-2-web-slide1');
    listingLogoLocator.rightAlign('listings-2-web-slide2');
    listingLogoLocator.rightAlign('Social Media Listing Ad Style 2');
    listingLogoLocator.rightAlign('listings-3-web-slide1');
    listingLogoLocator.rightAlign('listings-3-web-slide3');
    listingLogoLocator.leftAlign('Social Media Listing Ad Style 3');
  } else if (vertical === 'Real Estate') {
    new ImageSizer(document, 'Logos', 'Listing').update();
    var listingLogo = new ImageSizer(document, 'Logos', 'Listing').getImageCanvas();
    var listingLogoLocator = new LogoLocator(document, listingLogo)
    listingLogoLocator.centerAlign('listings-1-web');
    listingLogoLocator.centerAlign('Social Media Listing Ad Style 1');
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
  } else if (vertical === 'Wealth Management') {
    new ImageSizer(document, 'Logos', 'Brand').update();
    var brandLogo = new ImageSizer(document, 'Logos', 'Brand').getImageCanvas();
    var brandLogoLocator = new LogoLocator(document, brandLogo)
    brandLogoLocator.leftAlign('brand-1-web');
    brandLogoLocator.centerAlign('Social Media Brand Ad Style 1');
    brandLogoLocator.centerAlign('brand-1-ad-builder', 1);
  } else if (vertical === 'Mortgage') {
    new ImageSizer(document, 'Logos', 'Brand').update();
    var brandLogo = new ImageSizer(document, 'Logos', 'Brand').getImageCanvas();
    var brandLogoLocator = new LogoLocator(document, brandLogo)
    brandLogoLocator.leftAlign('sphere-1-web');
    brandLogoLocator.leftAlign('brand-1-banner-slide-one');
    brandLogoLocator.leftAlign('brand-1-banner-slide-two');
    brandLogoLocator.leftAlign('brand-1-mobile-slide-three');
  }
}

// export function updateImages(vertical) {
//   if (vertical === 'Real Estate' || vertical === 'Motion Real Estate') {
//     var housePhoto = new ImageSizer(document, 'Photos', 'House');
//     housePhoto.update();
//     var canvas = housePhoto.getImageCanvas();
//     new PhotoLocator(document, 'House', canvas).update();
//   }

//   if (vertical === 'Wealth Management') {
//     var backgroundPhoto = new ImageSizer(document, 'Photos', 'Background');
//     backgroundPhoto.update();
//     var canvas = backgroundPhoto.getImageCanvas();
//     new PhotoLocator(document, 'Background', canvas).update();
//   } else {
//     var agentPhoto = new ImageSizer(document, 'Photos', 'Agent');
//     var canvas = agentPhoto.getImageCanvas();
//     agentPhoto.update();
//     new PhotoLocator(document, 'Agent', canvas).update();
//   }
// }
