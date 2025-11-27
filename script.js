// スクロールでフェードイン
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade');

  const appearOptions = {
    threshold: 0.1
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
const videos = document.querySelectorAll(".video");
const container = document.getElementById("video-container");


videos.forEach(video => {
  const maxX = container.clientWidth - video.offsetWidth;
  const maxY = container.clientHeight - video.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  const randomScale = 0.5 + Math.random() * 1.5; // 0.5〜2倍

  video.style.left = randomX + "px";
  video.style.top = randomY + "px";
  video.style.transform = `scale(${randomScale})`;
});


