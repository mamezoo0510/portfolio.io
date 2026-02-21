// ------------------------------
// gallery.js
// サムネイル3列ページ
// ------------------------------

const grid = document.getElementById('gallery-grid');

fetch('./videos.json')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      // サムネ1つを包むdiv
      const div = document.createElement('div');
      div.classList.add('gallery-item');

      // カテゴリ情報（フィルタ用に保存）
      div.dataset.type = item.type;

      // --------------------------------------------------
      // サムネイルクリックで詳細ページへ飛ぶ処理
      // --------------------------------------------------
      div.addEventListener('click', () => {
        window.location.href = `work.html?no=${item.no}`;
      });

      // サムネイル画像
      const img = document.createElement('img');
      img.src = item.thumbnail; // 「thumbs/◯◯.jpg」
      img.alt = item.title;

      div.appendChild(img);
      grid.appendChild(div);
    });
  });

// ------------------------------
// カテゴリフィルタ
// ------------------------------
document.querySelectorAll('.category-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;

    document.querySelectorAll('.gallery-item').forEach((item) => {
      if (type === 'ALL') {
        item.style.display = 'block';
      } else if (item.dataset.type === type) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
