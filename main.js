const BASE_URL = 'https://zipcloud.ibsnet.co.jp/api/'

// 共通のfetch関数
// APIを使用するときはすべてこの関数を呼んでね
const myFetch = (path) => {
  fetch(`${BASE_URL}${path}`)
    .then((response) => response.json())
    .then((data) => {
      if (path.match(/^search\?/)) {
        if (data.status == 200) {
          let address = [1, 2, 3].map((i => {
              return data.results[0][`address${i}`];
          }))
          console.info(`あなたの検索した住所は「${address.join('')}」です`)
        } else {
          console.error('郵便番号の問い合わせの時に以下ようなエラーが発生しました。');
          console.error(data.message);
        }
      }
    });
}

myFetch('search?zipcode=1340081');
myFetch('search?zipcode=0100947');
myFetch('search?zipcode=000');
