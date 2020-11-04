// 【グローバル変数】
//   ・areasMap エリア情報を読み込んだMAP
//
// 【依存】
//   ・sortJson.js

// グローバル変数
// API問合せ結果を保持するMAP
var areasMap = new Map();

function selectAreaGet() {
     //エリア情報取得
    var url = 'https://tenmusu-server-bxgfuej34q-an.a.run.app/api/v1/areas?fbclid=IwAR0SAKGStZxXUJ-j6Ffysy7eTnXCB1or1Kd2XDb39ok4Fuol0-Y0W-9u0HQ';
    fetch(url)
        .then(function (data) {
            return data.json(); // 読み込むデータをJSONに設定
        })
        .then(function (json) {
            // ソート処理
            sortJsonData(json);

            // 選択したエリアの番号を保持
            for (var areasIndex = 0; areasIndex < json.areas.length; areasIndex++) {
                var area = json.areas[areasIndex];
                var areaMap = new Map();
                for (var areaIndex = 0; areaIndex < area.area.length; areaIndex++) {
                    areaMap.set(area.area[areaIndex].number, area.area[areaIndex]);
                }
                areasMap.set(area.number, area);
                areasMap.get(area.number).area = areaMap;

                // エリア コンボボックス作成
                var option = document.createElement("option");
                option.value = area.number;
                option.text = area.name;
                document.getElementById("areaSelect").add(option);
            }
        });
}

function areaChange(searchFunction) {
    if (document.getElementById('areaSelect')) {
        // チェックボックス配置部分初期化(子要素全削除)
        var parent = document.getElementById("areaBox");
        while (parent.firstChild) {
            // NodeListは不変ではないので、処理ごとにparent.firstChildは変化
            parent.removeChild(parent.firstChild);
        }

        // 選択したエリアの番号を取得し、エリアに属する都道府県のMAPを取得
        var selectedAreaNum = document.getElementById("areaSelect").value;
        if (!selectedAreaNum) {
            return;
        }
        var areaMap = areasMap.get(selectedAreaNum).area;

        // チェックボックスの配置
        var counter = 1;
        for (let area of areaMap.values()) {
            // チェックボックスの要素を作成
            var checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("id", "check_" + counter);
            checkBox.setAttribute("name", "areaCheck");
            checkBox.value = area.number;
            checkBox.addEventListener('input', search);
            // チェックボックスのラベル要素を作成
            var checkBoxLabel = document.createElement("label");
            checkBoxLabel.setAttribute("for", "check_" + counter);
            checkBoxLabel.innerText = area.name;

            // チェックボックス配置部分に追加
            parent.appendChild(checkBox);
            parent.appendChild(checkBoxLabel);

            counter++;
        }
    }
}

function sortJsonData(json) {
    // エリアおよびエリアに属する県の情報の一覧を番号で昇順ソート
    sortJson(json.areas, "number", "string", true);
    for (var areasIndex = 0; areasIndex < json.areas.length; areasIndex++) {
        sortJson(json.areas[areasIndex].area, "number", "string", true);
    }
}
