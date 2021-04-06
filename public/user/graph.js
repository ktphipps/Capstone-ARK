let intervalGraphElement = document.getElementById('intervalGraph');
let asynchronyGraphElement = document.getElementById('asynchronyGraph');
let score = sessionStorage.getItem('score');
let data = sessionStorage.getItem('totalTapArray');
let soundOnTime = sessionStorage.getItem('timeWSound');
let soundOffTime = sessionStorage.getItem('timeWOSound');
let cycles = sessionStorage.getItem('cycles');
let bpm = sessionStorage.getItem('bpm');
let total = sessionStorage.getItem('totalTapArray');

data = JSON.parse(data);

let yMaxInterval = 0, yMinInterval = -1, xMax = 0;

let beatTime = Math.round((60000 / bpm));

let yMaxAsynchrony = beatTime / 2, yMinAsynchrony = -yMaxAsynchrony;

//Creating the x,y pair array for the interval and asynchrony arrays
let intervalChartArray = [];
let asynchronyChartArray = [];
let prev;
data.splice(0, 1);
data.forEach(tap => {

    let timeSinceLast = tap.timeSinceLast;
    //Calculate pressTime taking into account cycle number
    let pressTime = (tap.pressTime/1000) + ((parseInt(soundOnTime) + parseInt(soundOffTime)) * (tap.cycleNumber - 1));
    pressTime = Math.round(pressTime * 100) / 100;

    //Calculate the current beat taking into account cycle number
    let currentBeat = (tap.beat/1000) + ((parseInt(soundOnTime) + parseInt(soundOffTime)) * (tap.cycleNumber - 1));
    currentBeat = Math.round(currentBeat * 100) / 100;

    //If this is a tap within our y-bounds (less than 2 times the beat time)
    if (timeSinceLast < (2 * beatTime) && timeSinceLast > (beatTime / 2)) {
        //On sound reset get a negative number, this fixes the bug, might want to investigate a fix in taphandler
        if (timeSinceLast < 0) {
            timeSinceLast = (pressTime - prev.pressTime);
        }

        //Get the max y value
        if (timeSinceLast > yMaxInterval) {
            yMaxInterval = timeSinceLast;
        }

        if (yMinInterval == -1 || timeSinceLast < yMinInterval) {
            yMinInterval = timeSinceLast;
        }

        intervalChartArray.push({ x: pressTime, y: timeSinceLast });
    }
    
    asynchronyChartArray.push({ x: currentBeat, y: tap.delta});

    prev = tap;
});

xMax = asynchronyChartArray[asynchronyChartArray.length - 1].x;

//Calculate the green, yellow, and red line positions based off of the bpm for the interval chart
let greenYPosInterval = beatTime + (beatTime * 0.1);
let greenYNegInterval = beatTime - (beatTime * 0.1);
let yellowYPosInterval = beatTime + (beatTime * 0.15);
let yellowYNegInterval = beatTime - (beatTime * 0.15);
let redYPosInterval = beatTime + (beatTime * 0.2);
let redYNegInterval = beatTime - (beatTime * 0.2);

let greenZonePosInterval = [{ x: 0, y: greenYPosInterval }, { x: xMax, y: greenYPosInterval }];
let greenZoneNegInterval = [{ x: 0, y: greenYNegInterval }, { x: xMax, y: greenYNegInterval }];
let yellowZonePosInterval = [{ x: 0, y: yellowYPosInterval }, { x: xMax, y: yellowYPosInterval }];
let yellowZoneNegInterval = [{ x: 0, y: yellowYNegInterval }, { x: xMax, y: yellowYNegInterval }];
let redZonePosInterval = [{ x: 0, y: redYPosInterval }, { x: xMax, y: redYPosInterval }];
let redZoneNegInterval = [{ x: 0, y: redYNegInterval }, { x: xMax, y: redYNegInterval }];

//Check if the red zones are greater than the current y min/max, if so set them to be our new min/max
if (redYPosInterval > yMaxInterval) {
    yMaxInterval = redYPosInterval;
}
if (redYNegInterval < yMinInterval) {
    yMinInterval = redYNegInterval;
}

//Calculate the green, yellow, and red line positions based off of the bpm for the asynchrony chart
let greenYPosAsynchrony = beatTime / 6;
let greenYNegAsynchrony = -greenYPosAsynchrony;
let yellowYPosAsynchrony = beatTime / 3;
let yellowYNegAsynchrony = -yellowYPosAsynchrony;
let redYPosAsynchrony = yMaxAsynchrony;
let redYNegAsynchrony = -redYPosAsynchrony;

let greenZonePosAsynchrony = [{ x: 0, y: greenYPosAsynchrony }, { x: xMax, y: greenYPosAsynchrony }];
let greenZoneNegAsynchrony = [{ x: 0, y: greenYNegAsynchrony }, { x: xMax, y: greenYNegAsynchrony }];
let yellowZonePosAsynchrony = [{ x: 0, y: yellowYPosAsynchrony }, { x: xMax, y: yellowYPosAsynchrony }];
let yellowZoneNegAsynchrony = [{ x: 0, y: yellowYNegAsynchrony }, { x: xMax, y: yellowYNegAsynchrony }];
let redZonePosAsynchrony = [{ x: 0, y: redYPosAsynchrony }, { x: xMax, y: redYPosAsynchrony }];
let redZoneNegAsynchrony = [{ x: 0, y: redYNegAsynchrony }, { x: xMax, y: redYNegAsynchrony }];

//Calculate the sound on/sound off lines for interval and asynchrony graphs
let soundOffLineInterval = [{ x: soundOnTime, y: yMaxInterval }, { x: soundOnTime, y: yMinInterval }];
let soundOffLineAsynchrony = [{ x: soundOnTime, y: yMaxAsynchrony }, { x: soundOnTime, y: yMinAsynchrony }];
let soundOnLineInterval = [], soundOnLineAsynchrony = [];
let currentTime = parseInt(soundOnTime);
for (let i = 1; i < cycles; i++) {
    currentTime += parseInt(soundOffTime);
    soundOffLineInterval.push(NaN);
    soundOffLineAsynchrony.push(NaN);
    soundOnLineInterval.push({ x: currentTime, y: yMaxInterval }, { x: currentTime, y: yMinInterval });
    soundOnLineAsynchrony.push({ x: currentTime, y: yMaxAsynchrony }, { x: currentTime, y: yMinAsynchrony });
    soundOnLineInterval.push(NaN);
    soundOnLineAsynchrony.push(NaN);
    currentTime += parseInt(soundOnTime);
    soundOffLineInterval.push({ x: currentTime, y: yMaxInterval }, { x: currentTime, y: yMinInterval });
    soundOffLineAsynchrony.push({ x: currentTime, y: yMaxAsynchrony }, { x: currentTime, y: yMinAsynchrony });
}


//https://www.chartjs.org/docs/ Docs for charts
//Create the chart for the intertap interval graph
let intervalGraph = new Chart(intervalGraphElement.getContext('2d'), {
    type: 'scatter',
    data: {
        fill: true,
        backgroundColor: 'black',
        datasets: [{
            order: 0,
            label: 'Inter-tap Interval',
            data: intervalChartArray,
            pointStyle: 'rectRot',
            radius: 5,
            hoverRadius: 10,
            borderColor: 'black',
            borderWidth: 1.2
        },
        {
            label: 'Great',
            data: greenZonePosInterval,
            borderColor: 'rgba(44, 155, 8, 0.8)',
            backgroundColor: 'rgba(44, 155, 8, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 4
        }, {
            label: 'Good',
            data: yellowZonePosInterval,
            borderColor: 'rgba(218, 251, 8, 0.8)',
            backgroundColor: 'rgba(218, 251, 8, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 1
        }, {
            label: 'Pass',
            data: redZonePosInterval,
            borderColor: 'rgba(194, 33, 9, 0.8)',
            backgroundColor: 'rgba(194, 33, 9, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 2
        }, {
            data: greenZoneNegInterval,
            borderColor: 'rgba(44, 155, 8, 0.8)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: false
        }, {
            data: yellowZoneNegInterval,
            borderColor: 'rgba(218, 251, 8, 0.8)',
            backgroundColor: 'rgba(218, 251, 8, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 4
        }, {
            data: redZoneNegInterval,
            borderColor: 'rgba(194, 33, 9, 0.8)',
            backgroundColor: 'rgba(194, 33, 9, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 5
        },
        {
            label: "Sound Off",
            data: soundOffLineInterval,
            borderColor: 'black',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: false,
            spanGaps: false
        },
        {
            data: soundOnLineInterval,
            borderColor: 'rgba(12, 176, 12, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: false,
            spanGaps: false
        }],
    },
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Inter-tap Interval Length",
                },
                ticks: {
                    beginAtZero: false,
                    max: yMaxInterval,
                    min: yMinInterval
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Beat Number",
                },
                ticks: {
                    max: xMax
                }
            }]
        },
        legend: {
            labels: {
                //Only display the label for the accuracy of taps
                filter: function (legendItem, data) {
                    return legendItem.datasetIndex < 4 && legendItem.datasetIndex > 0 || legendItem.datasetIndex == 7;
                }
            }
        }
    }
});

//https://www.chartjs.org/docs/ Docs for charts
//Create the chart for the asynchrony graph
let asynchronyGraph = new Chart(asynchronyGraphElement.getContext('2d'), {
    type: 'scatter',
    data: {
        fill: true,
        backgroundColor: 'black',
        datasets: [{
            order: 0,
            label: 'Asynchrony',
            data: asynchronyChartArray,
            pointStyle: 'rectRot',
            radius: 5,
            hoverRadius: 10,
            borderColor: 'black',
            borderWidth: 1.2
        },
        {
            label: "Great",
            data: greenZonePosAsynchrony,
            borderColor: 'rgba(44, 155, 8, 0.8)',
            backgroundColor: 'rgba(44, 155, 8, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 4
        }, {
            label: "Good",
            data: yellowZonePosAsynchrony,
            borderColor: 'rgba(218, 251, 8, 0.8)',
            backgroundColor: 'rgba(218, 251, 8, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 1
        }, {
            label: "Pass",
            data: redZonePosAsynchrony,
            borderColor: 'rgba(194, 33, 9, 0.8)',
            backgroundColor: 'rgba(194, 33, 9, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 2
        }, {
            data: greenZoneNegAsynchrony,
            borderColor: 'rgba(44, 155, 8, 0.8)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: false
        }, {
            data: yellowZoneNegAsynchrony,
            borderColor: 'rgba(218, 251, 8, 0.8)',
            backgroundColor: 'rgba(218, 251, 8, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 4
        }, {
            data: redZoneNegAsynchrony,
            borderColor: 'rgba(194, 33, 9, 0.8)',
            backgroundColor: 'rgba(194, 33, 9, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: 5
        },
        {
            label: "Sound Off",
            data: soundOffLineAsynchrony,
            borderColor: 'black',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: false,
            spanGaps: false
        },
        {
            data: soundOnLineAsynchrony,
            borderColor: 'rgba(12, 176, 12, 0.3)',
            type: 'line',
            showLine: true,
            pointRadius: 0,
            fill: false,
            spanGaps: false
        }],
    },
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Asynchrony'
                },
                ticks: {
                    beginAtZero: false,
                    max: yMaxAsynchrony,
                    min: yMinAsynchrony
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Beat Number'
                },
                ticks: {
                    max: xMax
                }
            }]
        },
        legend: {
            labels: {
                //Only display the label for the accuracy of taps
                filter: function (legendItem, data) {
                    return legendItem.datasetIndex > 0 && legendItem.datasetIndex < 4 || legendItem.datasetIndex == 7;
                }
            }
        }
    }
});

let scoreString = document.querySelector("#score");
let star1 = document.querySelector("#star1");
let star2 = document.querySelector("#star2");
let star3 = document.querySelector("#star3");

score = Math.round(score * 100) / 100;

scoreString.innerHTML = "Score: " + score + "%";

loadScoreBar();

if (score > 85) {
    star1.innerHTML = "<img id='star1img' src='./game/assets/star.png'/>"
    star2.innerHTML = "<img id='star2img' src='./game/assets/star.png'/>"
    star3.innerHTML = "<img id='star3img' src='./game/assets/star.png'/>"
}
else if (score > 70) {
    star1.innerHTML = "<img id='star1img' src='./game/assets/star.png'/>"
    star2.innerHTML = "<img id='star2img' src='./game/assets/star.png'/>"
    star3.innerHTML = "<img id='star3img' src='./game/assets/emptyStar.png'/>"
}
else if (score > 55) {
    star1.innerHTML = "<img id='star1img' src='./game/assets/star.png'/>"
    star2.innerHTML = "<img id='star2img' src='./game/assets/emptyStar.png'/>"
    star3.innerHTML = "<img id='star3img' src='./game/assets/emptyStar.png'/>"
}
else {
    star1.innerHTML = "<img id='star1img' src='./game/assets/emptyStar.png'/>"
    star2.innerHTML = "<img id='star2img' src='./game/assets/emptyStar.png'/>"
    star3.innerHTML = "<img id='star3img' src='./game/assets/emptyStar.png'/>"
}


var count = 1;
var timer2 = setInterval(function () {
    if (count >= 31){
        clearInterval(timer2);
    }
    else if (count % 10 == 0)
        fadeIn(document.getElementById('star' + (count / 10) + 'img'));
    count += 1;
}, 50);


function fadeIn(element) {
    var op = 0.0;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 25);
}

function loadScoreBar() {
    var elem = document.getElementById("scoreBar");   
    var width = 1;
    var id = setInterval(frame, 1);
    function frame() {

      if (width + 0.5 >= score) {
        if (width + 0.1 >= score) {
            if (width >= score) {
                clearInterval(id);
              } else {
                width+=0.01; 
                elem.style.width = width + '%';
              }
        } else {
        width+=0.1; 
        elem.style.width = width + '%';
        }
      } else {
        width+=0.5; 
        elem.style.width = width + '%'; 
      }
    }
  }


function resetToParamSelect() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location = "userdashboard.html";
        } else {
            window.location = "parameters.html";
        }
    });
}

function changeToIntervalGraph() {
    intervalGraphElement.style.display = "initial";
    asynchronyGraphElement.style.display = "none";
}

function changeToAsynchronyGraph() {
    intervalGraphElement.style.display = "none";
    asynchronyGraphElement.style.display = "initial";
}