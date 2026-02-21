// -------------------------------------------
// index.js
// トップページで "動画や写真作品の一覧" を生成するJS
// -------------------------------------------

// 作品一覧を入れるHTML要素を取得
const container = document.getElementById('works-container');

// fetch() = 外部ファイル(JSON)を読み込むWeb API
// ここが「Web API」と呼ばれる部分（ブラウザの機能の一部）
fetch('./videos.json')
  .then((response) => response.json()) // JSONデータに変換
  .then((data) => {
    // dataには「作品の配列」が入っている

    // 配列の数だけループして1つずつ表示を作る
    data.forEach((item) => {
      // 「作品を包む箱」を作る
      const div = document.createElement('div');
      div.classList.add('work-item');

      // 作品のカテゴリ(type)をセットしておく
      // これが後でフィルタリングに使える
      div.dataset.type = item.type;

      // 作品ID(no)もセット（詳細ページへ飛ぶ用）
      div.dataset.id = item.no;

      // 画像サムネイル（必須）
      const img = document.createElement('img');
      img.src = item.thumbnail; // JSONにthumbnailを追加しておく必要あり
      img.alt = item.title;

      // タイトル
      const title = document.createElement('h3');
      title.textContent = item.title;

      // year
      const year = document.createElement('p');
      year.innerHTML = item.year;

      // 説明
      const desc = document.createElement('p');
      desc.innerHTML = item.description.replace(/\n/g, '<br>');
      // クリックイベント：work.htmlへ飛ぶ
      div.addEventListener('click', () => {
        // URLに ?no= でIDを渡す
        window.location.href = `work.html?no=${item.no}`;
      });

      // 要素を組み立てる
      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(year);
      div.appendChild(desc);

      container.appendChild(div);
    });
  });

// -------------------------------------------
// カテゴリボタンの処理
// -------------------------------------------
document.querySelectorAll('.category-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type; // 例: "MUSICVIDEO"

    document.querySelectorAll('.work-item').forEach((item) => {
      // ALLなら全部表示
      if (type === 'ALL') {
        item.style.display = 'block';
        return;
      }

      // typeが一致する作品だけ表示
      if (item.dataset.type === type) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
