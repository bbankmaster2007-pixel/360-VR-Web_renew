AFRAME.registerComponent('gogo', {
  schema: {
    imageSrc: { type: 'selector' },
    hide: { type: 'selector' },
    show: { type: 'selector' },
    locationName: { type: 'string', default: 'Unknown Location' },
    imgRotate: { type: 'string', default: '0 0 0' },
    moveDirection: { type: 'string', default: '-5 1.6 0' },
    moveDur: { type: 'number', default: 600 },
    fadeDur: { type: 'number', default: 400 }
  },
  init: function () {
    const el = this.el;
    const data = this.data;
    const TP = document.querySelector('#TP');
    const sky = document.querySelector('#sky');
    const overlay = document.querySelector('#fade-overlay');

    overlay.setAttribute('animation__fadeout', 'dur', data.moveDur);
    overlay.setAttribute('animation__fadein', 'dur', data.moveDur);

    // Hover Scale Effect
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.15 1.15 1.15');
    });
    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1');
    });

    el.addEventListener('click', () => {
      // Implementation for click event
      TP.setAttribute('animation__move', {
        property: 'position',
        to: data.moveDirection,
        dur: data.moveDur,
        easing: 'easeInQuad'
      });
      overlay.emit('fade-out');


      setTimeout(() => {
        sky.setAttribute('src', data.imageSrc.getAttribute('src'));

        data.hide.setAttribute('visible', false);
        data.show.setAttribute('visible', true);

        sky.setAttribute('rotation', data.imgRotate);
        overlay.emit('fade-in');

      }, data.moveDur);
    });
  }
});

AFRAME.registerComponent('open-url', {
  schema: { url: { type: 'string' } },
  init: function () {
    this.el.addEventListener('click', () => {
      window.open(this.data.url, '_blank');
    });
  }
});