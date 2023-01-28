const numberOfThumbnails = document.querySelector('[data-glide-thumbnail-slides]').dataset.glideThumbnailSlides;

const glideOptions = {
  image: {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    focusAt: 'center',
    gap: 0,
    dragThreshold: 10,
    peek: 75,
    breakpoints: {
      1200: {
        peek: 70
      },
      1000: {
        peek: 55
      },
      875: {
        peek: 45
      },
      749: {
        peek: 65
      },
      550: {
        peek: 55
      },
      375: {
        peek: 45
      },
    }
  },
  thumbnail: {
    type: 'carousel',
    startAt: 0,
    perView: numberOfThumbnails,
    focusAt: numberOfThumbnails % 2 === 0 ? (numberOfThumbnails / 2) - 1 : 'center'
  }
};

const createGlideInstance = (element, optionsObject) => {
  return new Glide(element, optionsObject);
};

const mountGlideInstance = (instance) => {
  instance.mount()
};

const indexOfSlide = (instance, identifier) => {
  instance.on('mount.after', function() {
    instance.on('run', function() {
      console.log(`${identifier} index: ${instance.index}`)
    })
  })
};

const onSlide = (instance, staticInstance) => {
  instance.on(['mount.after', 'run'], function() {
    staticInstance.go(`=${instance.index}`)
  })
};

class ProductImagesSlider extends HTMLElement {
  constructor() {
    super();

    this.onThumbnailClick = this.thumbnailClickHandler.bind(this)

    // Thumbnail Slider
    this.glideInstanceThumbnails = createGlideInstance('[data-glide-thumbnails]', glideOptions.thumbnail);
    this.addEventListener('click', this.thumbnailClickHandler)
    indexOfSlide(this.glideInstanceThumbnails, 'thumbnail');
    mountGlideInstance(this.glideInstanceThumbnails);

    // Product Image Slider
    this.glideInstance = createGlideInstance('[data-glide-product-images]', glideOptions.image);
    indexOfSlide(this.glideInstance, 'image');
    onSlide(this.glideInstance, this.glideInstanceThumbnails);
    onSlide(this.glideInstanceThumbnails, this.glideInstance);
    mountGlideInstance(this.glideInstance);
  }

  thumbnailClickHandler (e) {
    if(e.target.matches('[data-thumbnail-image]')) {
      const closestLiToImg = e.target.closest('[data-thumbnail-index]').dataset.thumbnailIndex;
      this.glideInstanceThumbnails.go(`=${closestLiToImg}`);
    }
  }
}

customElements.define('product-images-slider', ProductImagesSlider);
