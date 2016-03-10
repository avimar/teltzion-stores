var locationX = 31.8772;
var locationY = 35.2402;//18

var shabbosStart = moment(SunCalc.getTimes(moment().startOf('week').day(5), locationX, locationY).sunset).subtract(40,'minute');
var shabbosEnd = moment(SunCalc.getTimes(moment().startOf('week').day(6), locationX, locationY).dusk).add(10,'minute');

var storeData = {
	PostOffice: {name: 'TZ Doar #2', info: 'Corner of Mekor Baruch and Ahavas Yisroel', coordX:31.879313, coordY: 35.239771}
	,RavFichel: {name: 'Rav Fichel Food Sale', info: 'Corner of Mekor Baruch and Ahavas Yisroel Parking Lot', coordX:31.879413, coordY: 35.239728}
	,PharmacyMeuchedet: {name: 'Meuchedet Pharmacy', info: 'Above TZ Makolet', coordX:31.880311, coordY: 35.239828}
	,BDStore:  {name: 'B&D Store', info: 'Ahavat Yisroel 18', coordX:31.878580, coordY: 35.239553}
	,ChadPaamit: {name: 'Chad Paamit', info: 'Ahavat Yisroel 14', coordX:31.878945, coordY: 35.239718}
	,EggsMB1: {name: 'Egg Sale MB1', info: 'Mekor Baruch 1, up 1/2 flight', coordX:31.878198, coordY: 35.240136}
	,WeberBakeStore: {name: 'Weber Bake Store', info: '5/1 Ahavat Yisroel (down 2 floors)\n997-9386 and 052-767-0471', coordX:31.879281, coordY: 35.240036}
	,KeiliMikvaTZ: {name: 'Keili Mikva TZ', info: 'Kehilat Yaakov 9\nOther time: Azulay on Ahavat Emet 17/2, 02-997-1490 until 3pm, by appointment.', coordX:31.881570, coordY: 35.239375}
	,KikarNetanelSweetsStand: {name: 'Kikar Netanel Sweets Store', info: 'Next to Kikar Netanel', coordX:31.879945, coordY: 35.242878}
	};

var storeHours = {
	PostOffice: [
		{day: 'Sunday', open: '15:30', close: 17}
		,{day: 'Monday', open: '8:30', close: 10}
		,{day: 'Tuesday', open: '15:30', close: 17}
		,{day: 'Wednesday', open: '1700', close: 18}
		,{day: 'Thursday', open: '15:30', close: 17}
		,{day: 'Friday', open: 11, close: 13}
		]
	,PharmacyMeuchedet: [
		{day: 'Sunday', open: 8, close: 14}
		,{day: 'Monday', open: 14, close: 19}
		,{day: 'Tuesday', open: 8, close: 15}
		,{day: 'Wednesday', open: 8, close: 13}
		,{day: 'Thursday', open: 13, close: 19}
		,{day: 'Friday', open: 8, close: 11}
		]
	,BDStore: [
		{day: 'Sunday', open: 16, close: 21}
		,{day: 'Monday', open: 16, close: 21}
		,{day: 'Tuesday', open: 16, close: 21}
		,{day: 'Wednesday', open: 13, close: 21}
		,{day: 'Thursday', open: 16, close: 21}
		,{day: 'Friday', open: 9, close: 13}
		]
	,LeumiRamatEshkol: [
		{day: 'Monday', open: 8.5, close: 13}
		,{day: 'Thursday', open: 8.5, close: 13}
		,{day: 'Monday', open: 16, close: '18:15'}
		,{day: 'Thursday', open: 16, close: '18:15'}

		,{day: 'Tuesday', open: 8.5, close: 14.5}
		,{day: 'Wednesday', open: 8.5, close: 14.5}
		
		,{day: 'Friday', open: 8.5, close: 12.5}
		]
	,RavFichel: [
		{day: 'Wednesday', open: 12, close: 22}
		]
	,WeberBakeStore: [
		{day: 'Thursday', open: 15.5, close: 17}
		
		,{day: 'Tuesday', open: 20.5, close: 22}
		,{day: 'Wednesday', open: 20.5, close: 22}
		,{day: 'Thursday', open: 20.5, close: 22}

		,{day: 'Friday', open: 10, close: 13}
		]
	,ChadPaamit: [
		{day: 'Monday', open: 17, close: 19}
		,{day: 'Tuesday', open: 17, close: 19}
		,{day: 'Wednesday', open: 16, close: 21}
		,{day: 'Thursday', open: 16, close: 21}
		,{day: 'Friday', open: 8.5, close: 13}
		]
	,EggsMB1: [
		{day: 'Sunday', open: 19, close: 20}
		,{day: 'Wednesday', open: 16, close: 18}
		]
	,KikarNetanelSweetsStand: [
		{day: 'Sunday', open: 12, close: 23}
		,{day: 'Monday', open: 12, close: 23}
		,{day: 'Tuesday', open: 12, close: 23}
		,{day: 'Wednesday', open: 12, close: 23}
		,{day: 'Thursday', open: 12, close: 23}
		,{day: 'Friday', open: 11, closeText: '1½ hours before Shabbos', close: shabbosStart.clone().subtract(90,'minutes').format('HHmm')}
		,{day: 'Saturday', openText: '40minutes after Tzeits', open: shabbosEnd.clone().add(40,'minutes').format('HHmm'), close: 23.5}
		]
	,KeiliMikvaTZ: [
		,{day: 'Friday', open: 6, closeText: 'until Shabbos', close: shabbosStart.clone().format('HHmm')}
		]
};

var daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
var daysOfWeekHuman = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var storeList = Object.keys(storeHours);//since object, make list of stores

storeList.forEach(function(name){//iterate list of stores, and overwrite data to normalize it.
	storeHours[name] = storeHours[name].map(function(timeEntry){
		timeEntry.day= daysOfWeek.indexOf(timeEntry.day.toLowerCase());//convert date to numbers in 0-6 format.
		['open','close'].forEach(function(which){//dumb stuff to make it DRY
			timeEntry[which] = normalizeTime(timeEntry[which]);//normalize
			//console.log('just normalized: '+typeof timeEntry[which] + timeEntry[which])
			//timeEntry[which+'Minutes'] = hoursToMinutes(timeEntry[which]);//then create calc minutes
			timeEntry[which+'Human'] = showTime(timeEntry[which]);//and also human readable time
			});
		
		return timeEntry;
		});
	})

function normalizeTime(time){
	//console.log('about to normalize:' +typeof time + time);
	var arr=[0,0];
	if(typeof time === 'number' && Number.isInteger(time)) arr[0]=time;//if ints, just *60 to get minutes.
	else if(typeof time === 'number') arr= [Math.floor(time), time%1*60];//e.g. open at 8.5 = 8:30
	else if(time.indexOf(':')!==-1) arr = time.split(':');//hh:mm format
	else if(time.length==4) arr = [time.substring(0,2), time.substring(2,4)];//hhmm format
	else arr = [time.substring(0,1), time.substring(1,3)];//hmm format
	//console.log(arr);
	return arr;
	}

function showTime (arr){
	var time=arr.slice(0);//clone it, don't overwrite.
	if(typeof time[1]==='number' && time[1]<10) time[1]='0'+time[1];//left pad for readability
	var zone='am';
	if(time[0]>12) {//show AM/PM
		time[0]-=12;
		zone = 'pm';
		}
	else if (time[0]==12) zone = 'pm';
	return time.join(':')+zone;
	}
