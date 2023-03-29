'use strict'; //厳格モード
const hanaNameInput = document.getElementById('hana-name'); //花の名前取得
const stertButton = document.getElementById('stert');       //スタートボタン押下
const stertDivided = document.getElementById('stert-area'); //スタートエリア
const gameDivided = document.getElementById('game-area');   //ゲームエリア
const endDivided = document.getElementById('end-area');     //エエンドエリア
const p = document.createElement('p');                    //段落
let player = {                                              //プレイヤーオブジェクト
    hanaName    : '',
    level       : 0,
    waterCount  : 0,
    sunCount    : 0,
    hiryoCount  : 0,
};

//入力フォームにカーソルをデフォルトでセット
hanaNameInput.focus();

//スタートボタン押下
stertButton.onclick = () => {
    player.hanaName = hanaNameInput.value;
    //名前が空の場合は処理終了
    if (player.hanaName.length === 0) {
        return;
    }

    stertDivided.innerText = '';    //スタートエリアのクリア
    gameDivided.innerText = '';     //ゲームエリアのクリア
    endDivided.innerText = '';      //エンドエリアのクリア

    const header = document.createElement('h3'); //ヘッダー要素の作成（花の名前とレベル）
    const image = document.createElement('img'); //画像要素の作成

    //更新関数の実行
    update(player, header, image, '', '', '');

    //ヘッダーと画像の表示
    gameDivided.appendChild(header);
    image.width = 200;  // 横サイズ（px）
    image.height = 200; // 縦サイズ（px）
    gameDivided.appendChild(image);
    gameDivided.appendChild(p);

    //ボタン要素の作成・表示
    //水やり
    const buttonWater = document.createElement('button');
    buttonWater.innerText = '水やり';                     //属性の設定
    buttonWater.style.backgroundColor = '#0000ff';        //ボタンの色
    gameDivided.appendChild(buttonWater);                 //HTML表示

    //おひさま
    const buttonSun = document.createElement('button');
    buttonSun.innerText = 'おひさま';
    buttonSun.style.backgroundColor = '#ffff00';
    gameDivided.appendChild(buttonSun);

    //肥料
    const buttonHiryo = document.createElement('button');
    buttonHiryo.innerText = '肥料';
    buttonHiryo.style.backgroundColor = '#ff0000';
    gameDivided.appendChild(buttonHiryo);

    //ボタンの動き
    //水やり
    buttonWater.onclick = () => {
        player.level = player.level + 1;
        player.sunCount = player.sunCount + 1;
        update(player, header, image, buttonWater, buttonSun, buttonHiryo); //更新関数の実行
    };

    //おひさま
    buttonSun.onclick = () => {
        player.level = player.level + 3;
        player.sunCount = player.sunCount + 1;
        update(player, header, image, buttonWater, buttonSun, buttonHiryo);
    };

    //肥料
    buttonHiryo.onclick = () => {
        player.level = player.level + 5;
        player.waterCount = player.waterCount + 1;
        update(player, header, image, buttonWater, buttonSun, buttonHiryo); 
    };
};


/** 
 * レベルに応じて表示を更新する関数
 * @param {object} player プレイヤーオブジェクト
 * @param {string} header ヘッダー
 * @param {string} image 画像
 * @param {string} buttonWater 水やりボタン
 * @param {string} buttonSun おひさまボタン
 * @param {string} buttonHiryo 肥料ボタン
*/
function update(player, header, image, buttonWater, buttonSun, buttonHiryo) {
    //ヘッダーの属性設定
    header.innerText = player.hanaName + '  レベル：' + player.level;

    //画像の表示
    //レベル0-4の場合、葉っぱ
    if (0 <= player.level && player.level <= 4) {
        image.src = './1leaf.png'; // 画像パス
        image.alt = '葉っぱモードの画像'; // 代替テキスト
    }
    //レベル5-9の場合、つぼみ
    else if (5 <= player.level && player.level <= 9) {
        image.src = './2buds.png';
        image.alt = 'つぼみモードの画像';
    }
    //レベル10以上の場合
    else if (player.level >= 10) {
        let result = 'お花を育てるゲームをやってみた結果、'
        //水やり、おひさま、肥料のどれかが0の場合、枯れる
        if (player.waterCount == 0 || player.sunCount == 0 || player.sunCount == 0) {
            image.src = './4dead.png';
            image.alt = '枯れ葉モードの画像';
            result = result + 'お花が枯れました';
            end(buttonWater,buttonSun, buttonHiryo,result); //終了処理の実行
        } else { //花が咲く
            image.src = './3flower.png';
            image.alt = 'お花モードの画像';
            result = result + 'お花が咲きました';
            end(buttonWater,buttonSun, buttonHiryo,result); //終了処理の実行
        };

    };
};


//終了処理をする関数
function end(buttonWater,buttonSun, buttonHiryo,result) {
    buttonOff(buttonWater, buttonSun, buttonHiryo); //ボタン非活性関数の実行
    setTimeout(alert(result), 500); //アラートまで0.5秒止める
    
    //ヘッダー
    const endHeader = document.createElement('h4');
    endHeader.innerText = '▼▼▼お花の育て方の参考にしてね▼▼▼';
    endDivided.appendChild(endHeader); //HTML表示

    //動画
    const movieHeader = document.createElement('h5');
    movieHeader.innerText = '育て方の動画';
    endDivided.appendChild(movieHeader); //HTML表示

    const movie = document.createElement('iframe');
    movie.width = '560';
    movie.height='315';
    movie.src = 'https://www.youtube.com/embed/3HBnXIISqyA';
    movie.title = 'YouTube video player';
    movie.frameborder='0';
    movie.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;';
    movie. allowfullscreen;
    endDivided.appendChild(movie); //HTML表示

    //マップ
    const mapHeader = document.createElement('h5');
    mapHeader.innerText = '花屋の地図';
    endDivided.appendChild(mapHeader); //HTML表示

    const map = document.createElement('iframe');
    map.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9179.636641225323!2d132.45018377871506!3d34.38359096467737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355aa3513200239f%3A0x6cd493e101c513c2!2zYmlvdG9wIOODk-OCquODiOODvOODlyDluoPls7blupc!5e0!3m2!1sja!2sjp!4v1680057627423!5m2!1sja!2sjp';
    map.width = '600';
    map.height='450';
    map.style.border = '0';
    map.allowfullscreen = '';
    map.loading = 'lazy';
    map.referrerpolicy = 'no-referrer-when-downgrade';
    endDivided.appendChild(map); //HTML表示

    //ツイート機能
    const anchor = document.createElement('a');
    const hrefValue =
     'https://twitter.com/intent/tweet?button_hashtag' +
     encodeURIComponent('お花を育てるゲーム') +
     '&ref_src=twsrc%5Etfw';
  
    anchor.setAttribute('href', hrefValue); //setAttribute:anchor(という要素)のhref(という属性)をhrefValueに変更する
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #お花を育てるゲーム';
    endDivided.appendChild(anchor);
    //ツイート機能の実行
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    endDivided.appendChild(script);
    
    
    
};

//ボタンを非活性にする関数
function buttonOff(buttonWater, buttonSun, buttonHiryo) {
    //非活性
    buttonWater.disabled = true;
    buttonSun.disabled = true;
    buttonHiryo.disabled = true;

    //hover等のイベント無効
    buttonWater.style.pointerEvents = "none";
    buttonSun.style.pointerEvents = "none";
    buttonHiryo.style.pointerEvents = "none";

    //背景を灰色へ
    buttonWater.style.backgroundColor = '#808080';
    buttonSun.style.backgroundColor = '#808080';
    buttonHiryo.style.backgroundColor = '#808080';
};


//enterキー押下でもゲーム開始できる
hanaNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        stertButton.onclick();
    }
};

