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

// ビデオ配置
const videos = document.querySelectorAll(".video");
const container = document.getElementById("video-container");

const placed = []; // 配置済みの座標を保存

function isOverlapping(x, y, w, h) {
  return placed.some(v => {
    return !(x + w < v.x || x > v.x + v.w || y + h < v.y || y > v.y + v.h);
  });
}

videos.forEach(video => {
  const w = video.offsetWidth;
  const h = video.offsetHeight;
  let x, y;

  let attempts = 0;
  do {
    x = Math.random() * (container.clientWidth - w);
    y = Math.random() * (container.clientHeight - h);
    attempts++;
    if(attempts > 100) break; // 無限ループ防止
  } while (isOverlapping(x, y, w, h));

  video.style.left = x + "px";
  video.style.top = y + "px";

  placed.push({x, y, w, h});
});




