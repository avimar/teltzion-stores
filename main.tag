<main>

<style scoped>
</style>
<!--

Time to check: {moment(timeToCheck).format(dateFormat)} [<a onclick={reset}><u>now</u></a>]<br>
Day: <input name="day" type="range" min="0" max="6" step="1" oninput={updateTime}/> {moment(timeToCheck).format('dddd')} <br>
Hour: <input name="hour" type="range" min="0" max="24" step="0.25" oninput={updateTime}/> {moment(timeToCheck).format('h:mm a')} <br>

<div each={store in storeList}>
	<br>{store}, Open hours:
	<div each={value in openToday(store)}>
		*{value.openHuman}-{value.closeHuman} -- {isOpen(value)}
	</div>
	<span if={openToday(store).length==0}> -- not open today</span>

</div>-->

<div id="visualization"></div>

<script>
//{checkOpen(store,timeToCheck) ? "OPEN!" : "closed"}
var self = this;
this.dateFormat='YYYY-MM-DD hh:mm a, dddd';
this.timeToCheck = moment();//.add(2,'hours');
// Create a DataSet (allows two way data-binding)
var dataForVis = [
  ];

String.prototype.toSpaces = function(){
	return this.replace(/([A-Z])/g, function($1){return " "+$1;});
	};

storeList.forEach(function(storeName){//loop store list keys to access each store
	storeHours[storeName].forEach(function(hoursList){//loop hours list
		//console.log(hoursList);
		var entry = {group: storeName, content: storeName.toSpaces()};
		entry.start = self.timeToCheck.clone().day(hoursList.day).hours(hoursList.open[0]).minutes(hoursList.open[1]);
		entry.end = entry.start.clone().hours(hoursList.close[0]).minutes(hoursList.close[1]);
		dataForVis.push(entry);
		/*hoursList.forEach(function(hours){//loop hours list
			console.log(storeName + hours)
			});*/
		});
	});


  // Configuration for the Timeline
  var options = {
    height: '300px'
    ,start: this.timeToCheck.clone().startOf('day')
    ,end: this.timeToCheck.clone().startOf('day').add(1, 'day')
    ,min: this.timeToCheck.clone().startOf('day')				// lower limit of visible range
    ,max: this.timeToCheck.clone().startOf('day').add(7,'days')	// upper limit of visible range
    ,zoomMin: 1000 * 60 * 60 * 24		// one day in milliseconds
    ,zoomMax: 1000 * 60 * 60 * 24 * 7
    ,showCurrentTime: true
  };

this.on('mount', function(){
	// DOM element where the Timeline will be attached
	var container = document.getElementById('visualization');
	// Create a Timeline
	var timeline = new vis.Timeline(container, new vis.DataSet(dataForVis), options);

	/*timeline.setWindow({
		start: this.timeToCheck.clone().startOf('day')
		,end:  this.timeToCheck.clone().startOf('day').add(1, 'day')
		});*/
	});


/*
this.locationX = 31.8772;
this.locationY = 35.2402;//18
	self.times = SunCalc.getTimes(this.timeToCheck, this.locationX, this.locationY);
	//self.daytime = moment(this.timeToCheck).isBetween(this.times.sunrise,this.times.sunset);
	Sunrise: {moment(times.sunrise).format(dateFormat)}<br>
Sunset: {moment(times.sunset).format(dateFormat)}<br>
Now is: {daytime ? 'DAYTIME!' : 'Night'}<br>*/

isOpen = function(value){
	var now = hoursToMinutes(self.timeToCheck.format('HH:mm'));
	//console.log('now: ' + now);
	//console.log('value.openMinutes: ' + value.openMinutes);
	if(now>=value.closeMinutes) return 'already closed';
	if(value.openMinutes <= now && now < value.closeMinutes) return 'CURRENTLY OPEN!';
	if(value.openMinutes>now) return 'open in ' + showHumanMinutes(value.openMinutes-now);
	else return '???';
	}

function showHumanMinutes(minutes){
	if (minutes<60) return minutes + ' minutes!!';
	else return Math.floor(minutes/60) + ' hours and ' + (minutes%60) + ' minutes';
	}

openToday = function(location){
	var dayOfWeek = self.timeToCheck.format('e');//dddd is full name, E is 1-7 SUPPOSEDLY, e is 1-6
	return storeHours[location].filter(function(val){
		return dayOfWeek==val.day;//matched the day
		});
	}

updateTime = function(){
	var hours = Math.floor(self.hour.value);
	var minutes = self.hour.value % 1 * 60;
	self.timeToCheck.hour(hours);
	self.timeToCheck.minute(minutes);
	self.timeToCheck.day(self.day.value);
	//self.times = SunCalc.getTimes(this.timeToCheck, this.locationX, this.locationY);
	//self.daytime = moment(this.timeToCheck).isBetween(this.times.sunrise,this.times.sunset);
	}
reset = function(){
	self.timeToCheck = moment();
	}


/*checkOpen = function(location,time){
	var dayOfWeek = time.format('E');//dddd is full name, E is 1-7
	var minutes = hoursToMinutes(time.format('HH:mm'));
	console.log('now: ' + minutes + ' (' + time.format('HH:mm'))
	return storeHours[location]
			.filter(function(val){
				return dayOfWeek==val.day;//matched the day
				})
			.some(function(val){
					console.log(val)
					console.log(hoursToMinutes(val.open))
					return val.openMinutes <= minutes && minutes < val.closeMinutes;
					//var duration = moment(val.open, 'Hmm').twix(moment(val.close,'Hmm'));
					//return duration.contains(self.timeToCheck);
				});
	}*/
</script>
</main>