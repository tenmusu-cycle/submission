function drawEleGaph(eleBuf) {
    'use strict';
    var type = 'line';
    var data = {
        labels: getEmptyBuf(eleBuf.length),
        datasets: [{
            label: '高度(m)',
            data: eleBuf,   
        }]
    };
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 420,
                    stepSize: 100,
                }
            }],
        },
        title: {
            display: true,
            text: '標高(m)',
            fontsize: 20,
        },
        animation: {
            duration: 0,
        },
        legend: {
            display: false
        }
    };
    var ctx = document.getElementById("eleChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: type,
        data: data,
        options: options,
    });
}

function getEmptyBuf(size) {
    return getSameValueBuf('', size);
}
function getSameValueBuf(value, size) {
    var buf = [];
    for (var index = 0; index < size; index++) {
        buf[index] = value;
    }
    return buf;
}