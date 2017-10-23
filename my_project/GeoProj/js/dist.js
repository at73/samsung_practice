var distance, steps, curdist, cursteps;
var firstiter = false;

function start() {
	console.log('Start button');
	//tizen.humanactivitymonitor.unsetAccumulativePedometerListener();
	console.log("From now on, you will be notified when the pedometer data changes.");
	document.getElementById('beginCount').innerHTML = "Начался отсчет..";

	function onchangedCB(pedometerInfo) {
		if (firstiter === false) {
			distance = pedometerInfo.accumulativeDistance;
			steps = pedometerInfo.accumulativeTotalStepCount;
			firstiter = true;
		}
		curdist = pedometerInfo.accumulativeDistance - distance;
		cursteps = pedometerInfo.accumulativeTotalStepCount - steps;
		document.getElementById('beginCount').innerHTML = "";
		document.getElementById('infoCount').innerHTML = 'Текущяя информация:'		
				+ '<br>Статус передвижения: '
				+ pedometerInfo.stepStatus
				+ '<br>Скорость: '
				+ pedometerInfo.speed
				+ '<br>Дистанция: '
				+ curdist.toFixed(2)
				+ '<br>Количество шагов: '
				+ cursteps;
		console.log('Total step count: '
				+ pedometerInfo.accumulativeTotalStepCount);
		console.log('Distance: ' + pedometerInfo.accumulativeDistance);
	}
	tizen.humanactivitymonitor.setAccumulativePedometerListener(onchangedCB);
}

function finish() {
	document.getElementById('beginCount').innerHTML = "";
	tizen.humanactivitymonitor.unsetAccumulativePedometerListener();
	document.getElementById('infoCount').innerHTML = 'Информация:'
		+ '<br>Пройденная дистанция: '
		+ curdist.toFixed(2)
		+ '<br>Количество шагов: '
		+ cursteps;
	console.log("the pedometer is finished");
}
