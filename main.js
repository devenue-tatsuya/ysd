const BASE_URL = 'https://zipcloud.ibsnet.co.jp/api/'
const zipcodes = [
  '1340081',
  '0100947',
  '000'
]

// 共通のfetch関数
// APIを使用するときはすべてこの関数を呼んでね
const myFetch = (path) => {
  fetch(`${BASE_URL}${path}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 200) {
        if (path.match(/^search\?/)) {
          searchFunc(data);
          return
        }
        console.info('通信成功です。')
      } else {
        handleError(path, data);
      }
    });
}

const searchFunc = (data) => {
  let address = [1, 2, 3].map((i => {
    return data.results[0][`address${i}`];
  }))
  console.info(`あなたの検索した住所は「${address.join('')}」です`)
}

const handleError = (path, data) => {
  if (path.match(/^search\?/)) {
    console.error('郵便番号の問い合わせの時に以下ようなエラーが発生しました。');
    console.error(data.message);
    return
  }
  console.error('通信エラーが発生しました。');
}

for (let i = 0; i < zipcodes.length; i++) {
  myFetch(`search?zipcode=${zipcodes[i]}`);
}
