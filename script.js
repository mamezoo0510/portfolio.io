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
const container = document.getElementById("video-container");
const placed = [];

// JSONを読み込む
fetch("videos.json")
  .then(response => response.json())
  .then(videosData => {
    videosData.forEach((video, i) => {
      const w = video.width;
      const h = video.height;

      // 左右交互
      const x = (i % 2 === 0) ? 50 : container.clientWidth - w - 50;

      // y座標はランダムで重ならないように
      let y;
      let attempts = 0;
      do {
        y = Math.random() * (container.clientHeight - h);
        attempts++;
        if (attempts > 100) break;
      } while (placed.some(v => !(x + w < v.x || x > v.x + v.w || y + h < v.y || y > v.y + v.h)));

      const iframe = document.createElement("iframe");
      iframe.src = video.url + "?autoplay=0&mute=1&loop=1&playlist=" + video.url.split("/").pop();
      iframe.width = w;
      iframe.height = h;
      iframe.className = "video";
      iframe.style.position = "absolute";
      iframe.style.left = x + "px";
      iframe.style.top = y + "px";
      iframe.style.border = "none";

      container.appendChild(iframe);
      placed.push({x, y, w, h});
    });
  })
  .catch(err => console.error("JSON読み込みエラー:", err));
