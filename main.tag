<main>

<style scoped>
.vis-item .vis-item-overflow {
	overflow: visible;
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
 //, {group: 'shabbos', content: 'Shabbos Starts: candle lighting '+shabbosStart.format('h:mma'), start: shabbosStart, type: 'point'}
 //, {group: 'shabbos', content: 'Shabbos Ends: '+shabbosEnd.format('h:mma'), start: shabbosEnd, type: 'point'}
  ];
var groups = new vis.DataSet();
//groups.add({id: 'shabbos', content: 'Shabbos'});

storeList.forEach(function(storeName){//loop store list keys to access each store
	groups.add({id: storeName, content: storeName.toSpaces().capitalizeFirstLetter()});//@todo: 'title' is tooltip, which can contain \n
	storeHours[storeName].forEach(function(hoursList){//loop hours list
		//console.log(hoursList);
		var entry = {group: storeName, content: storeName.toSpaces().capitalizeFirstLetter()};
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