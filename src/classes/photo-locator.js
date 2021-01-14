export default class PhotoLocator {
  constructor(document, photoType, photo) {
    this.document = document;
    this.photoType = photoType;
    this.photo = photo;
  }

  update() {
    var photoGroups = this.getPhotoGroups();
    for (var i = 0; i < photoGroups.length; i++) {
      var artboardName = photoGroups[i].getParentArtboard().name;
      var localPhoto = this.getArtboardPhoto(artboardName);
      this.setMask(artboardName);
      localPhoto.frame = this.setDimensions(this.mask);
    }
  }

  getPhotoGroups() {
    return this.document.getLayersNamed(this.photoType + ' Photo');
  }

  getArtboardPhoto(artboardName) {
    return this.photo.getAllInstances().filter(function (local) {
      return local.getParentArtboard().name === artboardName
    })[0]
  }

  setMask(artboardName) {
    var masks = this.document.getLayersNamed(this.photoType + ' Image Mask');
    this.mask = masks.filter(function (mask) {
      return mask.getParentArtboard().name === artboardName
    })[0].frame
  }

  setDimensions() {
    return {
      x: this.displayLeft(),
      y: this.displayTop(),
      width: this.displayWidth(),
      height: this.displayHeight()
    }
  }

  displayLeft() {
    return this.mask.x + (this.maxWidth() - this.displayWidth()) / 2;
  }

  displayTop() {
    return this.mask.y + (this.maxHeight() - this.displayHeight()) / 2
  }

  displayWidth() {
    if (this.imageAspectRatio() < this.maxAspectRatio()) {
      return this.maxHeight() * this.imageAspectRatio()
    } else {
      return this.maxWidth()
    }
  }

  displayHeight() {
    if (this.imageAspectRatio() < this.maxAspectRatio()) {
      return this.maxHeight()
    } else {
      return this.maxWidth() / this.imageAspectRatio()
    }
  }

  maxWidth() {
    return this.mask.width;
  }

  maxHeight() {
    return this.mask.height;
  }

  aspectRatio(width, height) {
    return width / height;
  }

  imageAspectRatio() {
    return this.aspectRatio(this.photo.frame.width, this.photo.frame.height);
  }

  maxAspectRatio() {
    return this.aspectRatio(this.maxWidth(), this.maxHeight());
  }

}
