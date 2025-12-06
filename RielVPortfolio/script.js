document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".simple-carousel-section");

  carousels.forEach(section => {
    const track = section.querySelector(".simple-track");
    const images = Array.from(track.children);
    const prev = section.querySelector(".simple-arrow.left");
    const next = section.querySelector(".simple-arrow.right");

  
    images.forEach(img => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });

    let index = 0;
    let itemWidth;

    function updateWidth() {
      const style = getComputedStyle(images[0]);
      const marginRight = parseFloat(style.marginRight);
      itemWidth = images[0].offsetWidth + marginRight;
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    function moveTrack() {
      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function loopFix() {
      if (index >= images.length) {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(0px)`;
      }

      if (index < 0) {
        track.style.transition = "none";
        index = images.length - 1;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
      }
    }

    next.addEventListener("click", () => {
      index++;
      moveTrack();
      setTimeout(loopFix, 450);
    });

    prev.addEventListener("click", () => {
      index--;
      moveTrack();
      setTimeout(loopFix, 450);
    });

  });
});
