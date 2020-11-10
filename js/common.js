/**
 * 指定のルートIDに該当するルートのデータを取得して返します。
 * 
 * @param {*} routeId ルートID
 */
const getRouteData = async(routeId) => {
    var url = "https://tenmusu-server-bxgfuej34q-an.a.run.app/api/v1/route/" + routeId;
    return fetch(url)
        .then(function (data) {
            return data.json();
        });
};

/**
 * 全てのルートのデータを取得して返します。
 */
const getAllRoutes = async() => {
    var url = "https://tenmusu-server-bxgfuej34q-an.a.run.app/api/v1/routes";
    return fetch(url)
        .then(function (data) {
            return data.json();
        });
};

/**
 * 指定のスポットIDに該当するスポットのデータを取得して返します。
 * 
 * @param {*} spotId スポットID
 */
const getSpotData = async(spotId) => {
    var url = "https://tenmusu-server-bxgfuej34q-an.a.run.app/api/v1/spot/" + spotId;
    return fetch(url)
        .then(function (data) {
            return data.json();
        });
};

/**
 * 全てのスポットのデータを取得して返します。
 */
const getAllSpots = async() => {
    var url = "https://tenmusu-server-bxgfuej34q-an.a.run.app/api/v1/spots";
    return fetch(url)
        .then(function (data) {
            return data.json();
        });
};

/**
 * ルートデータから、一覧表示用の要素を作成して返します。
 * 
 * @param {*} routeData ルートデータ
 * @param {*} pathToContent  遷移URL用：contentフォルダへのパス
 */
const createRouteListItem = (routeData, pathToContent) => {
    var listData = document.createElement("li");
    var aTag = document.createElement("a");
    aTag.setAttribute("name", "detailUrl");
    aTag.setAttribute("href", pathToContent + "content/route.php.html?id=" + routeData.id + "&gpxPath=" + routeData.gpxPath);
    var imgBoxDiv = document.createElement("div");
    imgBoxDiv.setAttribute("class", "img_box");
    var thumbnailImg = document.createElement("img");
    thumbnailImg.setAttribute("name", "thumbnailImg");
    // TODO : 変更 サムネイルURLがリンク切れしているので、暫定対応
    thumbnailImg.setAttribute("src", routeData.imageDataRoute.url);
    // thumbnailImg.setAttribute("src", routeData.imageDataRoute.thumbnailURL);
    imgBoxDiv.appendChild(thumbnailImg);
    aTag.appendChild(imgBoxDiv);
    var txtBoxDiv = document.createElement("div");
    txtBoxDiv.setAttribute("class", "txt_box");
    var txtBoxHeadDiv = document.createElement("div");
    txtBoxHeadDiv.setAttribute("class", "head");
    var daySpan = document.createElement("span");
    daySpan.setAttribute("class", "day");
    daySpan.innerText = "2020/09/26";
    var photoSapn = document.createElement("span");
    photoSapn.setAttribute("class", "photo");
    var photoIcon = document.createElement("i");
    photoIcon.setAttribute("class", "fas fa-camera");
    photoSapn.appendChild(photoIcon);
    var photoCountText = document.createTextNode("17");
    photoSapn.appendChild(photoCountText);
    var likeOnSpan = document.createElement("span");
    likeOnSpan.setAttribute("class", "like on");
    var likeOnIcon = document.createElement("i");
    likeOnIcon.setAttribute("class", "fas fa-heart");
    likeOnSpan.appendChild(likeOnIcon);
    var likeOnCountText = document.createTextNode("253");
    likeOnSpan.appendChild(likeOnCountText);
    txtBoxHeadDiv.appendChild(daySpan);
    txtBoxHeadDiv.appendChild(photoSapn);
    txtBoxHeadDiv.appendChild(likeOnSpan);
    var titleTextTag = document.createElement("h2");
    titleTextTag.innerText = routeData.title;

    var txtBoxFooterDiv = document.createElement("div");
    txtBoxFooterDiv.setAttribute("class", "foot");
    var userDiv = document.createElement("div");
    userDiv.setAttribute("class", "user");
    var profileImg = document.createElement("img");
    profileImg.setAttribute("src", "../../img/profile.jpg");
    userDiv.appendChild(profileImg);
    var userNameText = document.createTextNode("ユーザー名");
    userDiv.appendChild(userNameText);

    var distanceDiv = document.createElement("div");
    distanceDiv.setAttribute("class", "distance");
    distanceDiv.innerText = "距離:148km";

    var timeDiv = document.createElement("div");
    timeDiv.setAttribute("class", "time");
    timeDiv.innerText = "時間:6:34";

    txtBoxFooterDiv.appendChild(userDiv);
    txtBoxFooterDiv.appendChild(distanceDiv);
    txtBoxFooterDiv.appendChild(timeDiv);

    txtBoxDiv.appendChild(txtBoxHeadDiv);
    txtBoxDiv.appendChild(titleTextTag);
    txtBoxDiv.appendChild(txtBoxFooterDiv);
    aTag.appendChild(txtBoxDiv);
    listData.appendChild(aTag);

    return listData;
};

/**
 * スポットデータから、一覧表示用の要素を作成して返します。
 * 
 * @param {*} spotData スポットデータ
 * @param {*} pathToContent  遷移URL用：contentフォルダへのパス
 */
const createSpotListItem = (spotData, pathToContent) => {
    var listData = document.createElement("li");
    var aTag = document.createElement("a");
    aTag.setAttribute("name", "detailUrl");
    aTag.setAttribute("href", pathToContent + "content/shop.php.html?id=" + spotData.id);
    var imgBoxDiv = document.createElement("div");
    imgBoxDiv.setAttribute("class", "img_box");
    var thumbnailImg = document.createElement("img");
    thumbnailImg.setAttribute("name", "thumbnailImg");
    // TODO : 変更 サムネイルURLがリンク切れしているので、暫定対応
    // thumbnailImg.setAttribute("src", spotData.imageDataSpot.thumbnailURL);
    thumbnailImg.setAttribute("src", spotData.imageDataSpot.url);
    imgBoxDiv.appendChild(thumbnailImg);
    aTag.appendChild(imgBoxDiv);
    var txtBoxDiv = document.createElement("div");
    txtBoxDiv.setAttribute("class", "txt_box");
    var txtBoxHeadDiv = document.createElement("div");
    txtBoxHeadDiv.setAttribute("class", "head");
    var titleTextTag = document.createElement("h2");
    titleTextTag.innerText = spotData.title;

    var txtBoxFooterDiv = document.createElement("div");
    txtBoxFooterDiv.setAttribute("class", "foot");
    txtBoxFooterDiv.innerHTML = "<br />住所：長崎県長崎市浜町10-10 (2F・3F)<br />カテゴリ：カフェ・スイーツ<br />営業時間：11:00～23:00<br />特典：あり";

    txtBoxDiv.appendChild(txtBoxHeadDiv);
    txtBoxDiv.appendChild(titleTextTag);
    txtBoxDiv.appendChild(txtBoxFooterDiv);
    aTag.appendChild(txtBoxDiv);
    listData.appendChild(aTag);

    return listData;
};

/**
 * 
 * @param {*} data 
 */
const searchCondition = (data) => {
  // エリア
  var areaSelect = document.getElementById("areaSelect");
  var area = areaSelect.options[areaSelect.selectedIndex].value;
  if (area && area != data.area) {
    return false;
  }
  // 都道府県
  var prefectures = [];
  var index = 0;
  while (document.getElementsByName("areaCheck")[index]) {
    if (document.getElementsByName("areaCheck")[index].checked) {
      prefectures.push(document.getElementsByName("areaCheck")[index].value);
    }
    index++;
  }
  if (prefectures.length > 0 && !prefectures.includes(data.prefectureID)) {
    return false;
  }
  return true;
}

const createPager = (url, currentPage, itemsPerPage, itemCount, pagerElement) => {
  while (pagerElement.firstChild) {
    // NodeListは不変ではないので、処理ごとにppagerElement.firstChildは変化
    pagerElement.removeChild(pagerElement.firstChild);
  }

  var maxPage = Math.floor(itemCount / itemsPerPage) + ((itemCount % itemsPerPage == 0)? 0 : 1);
  // TODO : 削除 予防措置
  maxPage = (maxPage <= 0)? 1 : maxPage;

  var prevPage = document.createElement("li");
  if (currentPage != 1) {
    var prevPageLink = document.createElement("a");
    prevPageLink.setAttribute("href", url + "?page=" + (currentPage - 1));
    prevPageLink.innerText = "＜　";
    prevPage.appendChild(prevPageLink);
  }
  else {
    prevPage.innerText = "＜　";
  }
  pagerElement.appendChild(prevPage);

  for (var i = 1; i <= maxPage; i++) {
    var page = document.createElement("li");
    if (i != currentPage) {
      var pageLink = document.createElement("a");
      pageLink.setAttribute("href", url + "?page=" + i);
      pageLink.innerText = i;
      page.appendChild(pageLink);
    }
    else {
      page.innerText = i;
    }
    pagerElement.appendChild(page);
  }

  var nextPage = document.createElement("li");
  if (currentPage != maxPage) {
    var nextPageLink = document.createElement("a");
    nextPageLink.setAttribute("href", url + "?page=" + (currentPage + 1));
    nextPageLink.innerText = "　＞";
    nextPage.appendChild(nextPageLink);
  }
  else {
    nextPage.innerText = "　＞";
  }
  pagerElement.appendChild(nextPage);
};

/**
 * URLからGETパラメータを解析し、オブジェクトにして返します。
 */
const getGETParams = () => {
    var queryString = window.location.search;
    var queryObject = new Object();
    if (queryString) {
      queryString = queryString.substring(1);
      var parameters = queryString.split('&');
    
      for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split('=');
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
        queryObject[paramName] = paramValue;
      }
    }
    return queryObject;
};