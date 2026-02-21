// JSONを読み込む
fetch('./videos.json')
  .then((res) => res.json())
  .then((data) => {
    // 🔹 release-containerを取得
    const container = document.getElementById('release-container');

    // 🔹 すでに出力した年を記録するセット
    const yearSet = new Set();

    data.forEach((item) => {
      // --- ① その年がまだ出力されていないなら表示 ---
      if (!yearSet.has(item.year)) {
        const yearHeading = document.createElement('h2');
        yearHeading.classList.add('year');
        yearHeading.textContent = item.year;
        container.appendChild(yearHeading);

        yearSet.add(item.year); // その年を記録
      }

      // --- ② タイトルリンクを作成（クリックで詳細ページへ）---
      const titleLink = document.createElement('a');
      titleLink.href = `work.html?no=${item.no}`;
      titleLink.textContent = item.title;
      titleLink.classList.add('work-link');

      container.appendChild(titleLink);
    });
  });
