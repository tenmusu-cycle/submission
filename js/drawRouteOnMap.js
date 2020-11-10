function initMap() {
    'use strict';

    // グラフ描画用：高度を保持する配列
    var eleBuf = [];

    var target = document.getElementById('mapTarget');
    var map = new google.maps.Map(target, {
        center: null,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var gpxPath = document.getElementById("gpxPath").value;
    $.ajax({
        type: "GET",
        url: gpxPath,
        dataType: "xml",
        success: function(xml) {
            var points = [];
            var bounds = new google.maps.LatLngBounds();

            var index = 0;
            $(xml).find("trkpt").each(function() {
                var lat = $(this).attr("lat");
                var lon = $(this).attr("lon");
                // TODO : <ele>タグが添字指定なのは後で改善する
                var ele = $(this).children()[0].innerHTML;
                var p = new google.maps.LatLng(lat, lon);
                points.push(p);
                bounds.extend(p);

                // 高度を保持
                eleBuf[index++] = ele;
            });
            // create PolyLine
            var poly = new google.maps.Polyline({
                path: points,
                strokeColor: "#FF00AA",
                strokeOpacity: .7,
                storokeWeight: 4,
            });
            poly.setMap(map);
            map.fitBounds(bounds);

            poly.addListener('click', function(e) {
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                var key = e.latLng.toString();
                var infoWindow = new google.maps.InfoWindow({
                    content: 
                        "緯度:" + e.latLng.lat() + "<br />" +
                        "経度:" + e.latLng.lng(),
                });
                marker.addListener('mouseover', function() {
                    infoWindow.open(map, marker);
                });
                marker.addListener('mouseout', function() {
                    infoWindow.close();
                });
                marker.addListener('click', function() {
                    this.setMap(null);
                });
            });

            // 高度のグラフ表示
            drawEleGaph(eleBuf);
        }
    });
}
