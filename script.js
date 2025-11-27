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
