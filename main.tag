<main>

<style scoped>
.vis-item .vis-item-overflow {
	overflow: visible;
	}
.daytime { #via http://www.cssmatic.com/gradient-generator#'\-moz\-linear\-gradient\%28left\%2C\%20rgba\%28179\%2C220\%2C237\%2C1\%29\%200\%25\%2C\%20rgba\%2841\%2C140\%2C227\%2C1\%29\%2050\%25\%2C\%20rgba\%28188\%2C224\%2C238\%2C1\%29\%20100\%25\%29\%3B'
	#background-color: #00BFFF;
	background: rgba(179,220,237,1);
	background: -moz-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,140,227,1) 50%, rgba(188,224,238,1) 100%);
	background: -webkit-gradient(left top, right top, color-stop(0%, rgba(179,220,237,1)), color-stop(50%, rgba(41,140,227,1)), color-stop(100%, rgba(188,224,238,1)));
	background: -webkit-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,140,227,1) 50%, rgba(188,224,238,1) 100%);
	background: -o-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,140,227,1) 50%, rgba(188,224,238,1) 100%);
	background: -ms-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,140,227,1) 50%, rgba(188,224,238,1) 100%);
	background: linear-gradient(to right, rgba(179,220,237,1) 0%, rgba(41,140,227,1) 50%, rgba(188,224,238,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b3dced', endColorstr='#bce0ee', GradientType=1 );
	}
</style>

<span class="menu" each={name,i in daysOfWeek}>
	<input class="menu" type="button" data-day={i} value={name.capitalizeFirstLetter()+isToday(i)} onclick={seeDay}/>&nbsp;
	</span>
-- <input class="menu" type="button" value="Entire Week" onclick={seeWeek}/>
<br><br>

<div id="visualization"></div>

<script>
var timeline;
var startOfWeek = function(){
	return moment().startOf('week');
	}
var endOfWeek = function(){
	return moment().endOf('week');
	}

String.prototype.toSpaces = function(){//@TODO ugly: clean up need for this stuff
	return this.replace(/([A-Z])/g, function($1){return " "+$1;});
	};
String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
	}

var dataForVis = [
 {group: 'Daytime', content: 'Shabbos Starts: candle lighting '+shabbosStart.format('h:mma'), start: shabbosStart, type: 'point'}
 , {group: 'Daytime', content: 'Shabbos Ends: '+shabbosEnd.format('h:mma'), start: shabbosEnd, type: 'point'}
  ];
var groups = new vis.DataSet();

groups.add({id: 'Daytime', content: 'Daytime'});
[0,1,2,3,4,5,6,7].forEach(function(day){
	var daytime = {group: 'Daytime', content: 'Daylight', className: 'daytime'};
	daytime.start = SunCalc.getTimes(startOfWeek().day(day), locationX, locationY).sunrise;
	daytime.end = SunCalc.getTimes(startOfWeek().day(day), locationX, locationY).sunset;
	dataForVis.push(daytime);
	});

storeList.forEach(function(storeName){//loop store list keys to access each store
	groups.add({
		id: storeName
		,content: storeData[storeName] && storeData[storeName].name || storeName.toSpaces().capitalizeFirstLetter()
		,title: storeData[storeName] && storeData[storeName].info || null});

	storeHours[storeName].forEach(function(hoursList){//loop hours list
		//console.log(hoursList);
		var entry = {group: storeName, content: storeData[storeName] && storeData[storeName].name || storeName.toSpaces().capitalizeFirstLetter()};
		entry.start = startOfWeek().day(hoursList.day).hours(hoursList.open[0]).minutes(hoursList.open[1]);
		entry.end = startOfWeek().day(hoursList.day).hours(hoursList.close[0]).minutes(hoursList.close[1]);
		dataForVis.push(entry);
		});
	});

// Configuration for the Timeline: http://visjs.org/docs/timeline/#Configuration_Options
var options = {
	//height: '300px'
	start: moment().startOf('day')//default display: today
	,end: moment().endOf('day')//default display: today
	,min: startOfWeek()	// lower limit of visible range
	,max: endOfWeek()	// upper limit of visible range

	,zoomMin: 1000 * 60 * 60 * 24		// one day in milliseconds
	,zoomMax: 1000 * 60 * 60 * 24 * 7
	,showCurrentTime: true
	,hiddenDates: [{start: startOfWeek(), end: startOfWeek().hour(5), repeat: 'daily'}]
	,moveable: false
	,selectable: false
	,orientation: 'both'
	,format: {
		minorLabels: {
			millisecond:'SSS',
			second:     's',
			minute:     'h:mma',//changed THIS for am/pm
			hour:       'h:mma',//changed THIS for am/pm
			weekday:    'ddd D',
			day:        'D',
			month:      'MMM',
			year:       'YYYY'
			},
		majorLabels: {
			millisecond:'HH:mm:ss',
			second:     'D MMMM HH:mm',
			minute:     'ddd D MMMM',
			hour:       'ddd D MMMM',
			weekday:    'MMMM YYYY',
			day:        'MMMM YYYY',
			month:      'YYYY',
			year:       ''
			}
		}
	};

this.on('mount', function(){
	// DOM element where the Timeline will be attached
	var container = document.getElementById('visualization');
	// Create a Timeline
	timeline = new vis.Timeline(container, new vis.DataSet(dataForVis), options);
	timeline.setGroups(groups);
	timeline.on('doubleClick', function (properties) {
		var group = properties.group;
		//if(storeData[group] && storeData[group].coordX) window.open('https://maps.google.com/?q='+storeData[group].coordX+','+storeData[group].coordY);
		//else if(storeData[group] && storeData[group].map) window.open('https://maps.google.com/?q='+storeData[group].map);
		});
	});

this.seeDay = function (event){
	var seeDay = event.target.getAttribute('data-day');
	timeline.setWindow({
		start: startOfWeek().day(seeDay)
		,end:  startOfWeek().day(seeDay).endOf('day')
		,animation: false
		});
	}

this.seeWeek = function (event){
	timeline.setWindow({
		start: startOfWeek()
		,end:  endOfWeek()
		,animation: false
		});
	}

this.isToday=function(day){
	if(moment().format('e')==day) return ' (Today)';
	else return '';
	}

</script>
</main>