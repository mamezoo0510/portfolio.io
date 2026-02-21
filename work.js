// --------------------------------------
// work.js
// 作品詳細ページのスクリプト
// --------------------------------------

// URL の ?no=〇〇 を取得する処理
const params = new URLSearchParams(window.location.search);
const workNo = params.get('no'); // ← "20251129" などの番号が取れる

// 表示先の要素
const container = document.getElementById('work-detail');

// JSONを読み込む
fetch('./videos.json')
  .then((res) => res.json())
  .then((data) => {
    // JSON配列から、no がURLと一致する作品データを探す
    const work = data.find((item) => String(item.no) === workNo);

    if (!work) {
      container.innerHTML = '<p>作品が見つかりません。</p>';
      return;
    }

    // 作品データを使ってHTMLを生成
    displayWork(work);
  });

// --------------------------------------
// 表示処理を関数化
// --------------------------------------
function displayWork(work) {
  // タイトル
  const title = document.createElement('h1');
  title.textContent = work.title;

  // 年
  const year = document.createElement('p');
  year.textContent = work.year;

  // 説明（フル版）
  const desc = document.createElement('p');
  desc.innerHTML = work.description.replace(/\n/g, '<br>');

  // メディアを包むdiv
  const mediaBox = document.createElement('div');
  mediaBox.classList.add('media-box');

  // --- 動画の場合 ---
  if (work.url && work.url.includes('youtube.com')) {
    const iframe = document.createElement('iframe');
    iframe.src = work.url;
    iframe.width = '800';
    iframe.height = '450';
    iframe.allowFullscreen = true;
    mediaBox.appendChild(iframe);
  }

  // --- 画像作品の場合 ---
  // 画像が1枚の場合 → string
  // 画像が複数の場合 → 配列
  if (work.images) {
    // 配列なら複数表示
    if (Array.isArray(work.images)) {
      work.images.forEach((imgPath) => {
        const img = document.createElement('img');
        img.src = imgPath; // "works/xxx.jpg"
        img.classList.add('work-image');
        mediaBox.appendChild(img);
      });
    } else {
      // imagesが配列ではない場合
      const img = document.createElement('img');
      img.src = work.imgPath; // "works/xxx.jpg"
      img.classList.add('work-image');
      mediaBox.appendChild(img);
    }
  }
  // thumbnailを最後にぶちこむことにした。これで画像登録なしの場合も画像が入る
  const img = document.createElement('img');
  img.src = work.thumbnail; // "works/xxx.jpg"
  img.classList.add('work-image');
  mediaBox.appendChild(img);

  // 要素を画面に追加
  container.appendChild(title);
  container.appendChild(year);
  container.appendChild(mediaBox);
  container.appendChild(desc);
}
