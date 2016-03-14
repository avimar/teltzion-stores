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
.daySelected { background-color: #008CBA !important; color: white !important; } /* Blue */
.buttons {
	border-radius: 3px;
	border: none;
	padding: 8px 8px;
	background-color: #e7e7e7;
	display: inline-block;
	color: black;
	}
.nighttime {
	background-color: #708090;
	}
#mapToggleButton a{width:120px;background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;font-size:1rem;line-height:1.5rem;position:absolute;}
#mapToggleButton {position:fixed;display:block;top:0;right:0;width:120px;overflow:hidden;height:200px;z-index:9999;}
</style>

<span id="mapToggleButton"><a onclick={mapToggle}>Toggle Map</a></span><!--https://developers.google.com/maps/documentation/javascript/examples/control-custom-->
<span id="dayButtons" hide={onlyMap}>
<br>
<span each={name,i in daysOfWeek}>
	<input type="button" class="buttons {daySelected: (showDay==i)}" data-day={i} value={name.capitalizeFirstLetter()+isToday(i)} onclick={seeDay}/>&nbsp;
	</span>
-- <input type="button" class="buttons {daySelected: (showDay==i)}" value="Entire Week" onclick={seeWeek}/>
&nbsp;&nbsp;<a href="https://github.com/avimar/teltzion-stores/issues" target="_blank">Report Issues</a>
&nbsp;&nbsp;<a href="https://docs.google.com/document/d/13aANpmRzo99J8VUXuxiSxVvZKBuLx9WO2OqOnLqNuyI/" target="_blank">TZ Info</a>
&nbsp;&nbsp;<a href="https://docs.google.com/document/d/1q8UVej2W6RziUNDtxFr7VYsTkaXoRp7thPVwL7H6tLI/" target="_blank">KY Info</a>
&nbsp;&nbsp;<a href="http://www.pkk.bycomputers.com/" target="_blank">Traffic</a>
<br><br></span>

<div id="visualization" hide={onlyMap}></div>


<script>
var self=this;
var map;
var timeline;
var lastOpenInfoWindow = false;
var divVis;
var divMap;
this.showDay = moment().format('e');
this.onlyMap=false;

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
	}
String.prototype.nl2br = function() {
	return this.replace(/(\n)/g, '<br>');
	}

function openInfoWindow(infoWindow,marker){
	if(lastOpenInfoWindow) lastOpenInfoWindow.close();
	lastOpenInfoWindow = infoWindow;
	marker.setAnimation(google.maps.Animation.BOUNCE);
	infoWindow.open(map,marker);
	window.setTimeout(function(){
		marker.setAnimation(null);
		},300);
	}

var startOfWeek = function(){
	return moment().startOf('week');
	}
var endOfWeek = function(){
	return moment().endOf('week');
	}

var dataForVis = [
 {group: '0daytime', content: 'Shabbos Starts: candle lighting '+shabbosStart().format('h:mma'), start: shabbosStart(), type: 'point'}
 , {group: '0daytime', content: 'Shabbos Ends: '+shabbosEnd().format('h:mma'), start: shabbosEnd(), type: 'point'}
  ];
var groups = new vis.DataSet();

groups.add({id: '0daytime', content: 'Daytime'});
[0,1,2,3,4,5,6].forEach(function(day){
	var zmanim=SunCalc.getTimes(startOfWeek().day(day), locationX, locationY);
	var daytime = {group: '0daytime', className: 'daytime'};
	daytime.content = 'Daylight (neitz '+moment(zmanim.sunrise).format('h:mma') + ', earliest mincha: '+moment(zmanim.solarNoon).add(30,'minute').format('h:mma')+')';
	daytime.start = zmanim.sunrise;
	daytime.end = zmanim.sunset;
	dataForVis.push(daytime);
	});

storeList.forEach(function(storeName){//loop store list keys to access each store
	if(!storeHours[storeName]) return; //some stores don't have hours
	groups.add({
		id: storeName
		,content: storeData[storeName] && storeData[storeName].name || storeName
		,title: storeData[storeName] && storeData[storeName].info || null});

	storeHours[storeName].forEach(function(hoursList){//loop hours list
		//console.log(hoursList);
		var entry = {group: storeName, content: storeData[storeName] && storeData[storeName].name || storeName};
		entry.id=storeName+Math.random();
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
	,margin: { item: 0, axis: 0 }
	,groupOrder: 'id'
	,showMajorLabels: false
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
	divVis= document.getElementById('visualization');
	divMap= document.getElementById('map');

	map = new google.maps.Map(divMap, {
		center: {lat: 31.880645, lng: 35.241750}
		,zoom: 17
		,streetViewControl: false
		});
	map.addListener('click', function() {//on click, clear open info windows
		if(lastOpenInfoWindow) lastOpenInfoWindow.close();
		});
	storeList.forEach(function(storeName){//loop store list keys to access each store, but once the map is loaded
		if(storeData[storeName] && storeData[storeName].coordX && storeData[storeName].coordY){
			var marker = {
				position : {lat:storeData[storeName].coordX, lng: storeData[storeName].coordY}
				,map: map
				,title: storeData[storeName].name || storeName
				};
			marker = new google.maps.Marker(marker);
			storeData[storeName].marker = marker;

			//Info window
			var content = "<b>"+(storeData[storeName].name || storeName)+"</b><br>";
			if(storeData[storeName].info) content+=storeData[storeName].info.nl2br()+"<br>";
			storeHours[storeName] && storeHours[storeName].forEach(function(hoursList){//loop hours list, some stores don't have hours
				content+="<br><u>" + daysOfWeekHuman[hoursList.day]+":</u> ";
				content+=hoursList.openHuman;
				if(hoursList.openText)content+=" ("+hoursList.openText+") ";
				content+="-"+hoursList.closeHuman;
				if(hoursList.closeText)content+=" ("+hoursList.closeText+")";
				})

			var infowindow = new google.maps.InfoWindow({
				content: content
				});
			storeData[storeName].infowindow = infowindow;
			marker.addListener('click', function() {
				openInfoWindow(infowindow,marker);
				});

			}//meta data exists
		});//loop stores

	// Create a Timeline
	timeline = new vis.Timeline(divVis, new vis.DataSet(dataForVis), groups, options);
	timeline.on('click', function (properties) {
		var group = properties.group;
		//var group = properties.item.split('0.')[0];
		if(storeData[group] && storeData[group].marker && storeData[group].infowindow){
			openInfoWindow(storeData[group].infowindow, storeData[group].marker);
			//map.setCenter({lat: storeData[group].coordX, lng: storeData[group].coordY});
			}
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
	self.showDay = seeDay;
	}

this.seeWeek = function (event){
	timeline.setWindow({
		start: startOfWeek()
		,end:  endOfWeek()
		,animation: false
		});
	self.showDay = 7;
	}

this.isToday=function(day){
	if(moment().format('e')==day) return ' (Today)';
	else return '';
	}

this.mapToggle=function(){
	this.onlyMap = !this.onlyMap;
	if(this.onlyMap) {
		divMap.style.height = "100%";
		google.maps.event.trigger(divMap,'resize');
		}
	else{
		divMap.style.height = "30%";
		google.maps.event.trigger(divMap,'resize');
		}
	}

</script>
</main>