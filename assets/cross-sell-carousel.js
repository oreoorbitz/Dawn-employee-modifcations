class CrossSellCarousel extends HTMLElement {
  constructor() {
    super();
    this.glideInstance = new Glide('[data-glide]', {
      type: 'carousel',
      startAt: 0,
      perView: 2,
      gap: 15,
      breakpoints: {
        749: {
          perView: 3,
          gap: 20
        },
        480: {
          perView: 2
        },
        305: {
          perView: 1
        }
      }
    })
    this.mountGlideInstance();
  }
  mountGlideInstance() {
    this.glideInstance.mount()

    this.glideInstance.on('mount.after', function() {
      console.log('mounted')
    })
  }
}

customElements.define('cross-sell-carousel', CrossSellCarousel);
