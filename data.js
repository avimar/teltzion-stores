var locationX = 31.8772;
var locationY = 35.2402;//18

var shabbosStart = moment(SunCalc.getTimes(moment().startOf('week').day(5), locationX, locationY).sunset).subtract(40,'minute');
var shabbosEnd = moment(SunCalc.getTimes(moment().startOf('week').day(6), locationX, locationY).dusk).add(10,'minute');

var storeData = {
	postOffice: {name: 'TZ Doar #2', info: 'Corner of Mekor Baruch and Ahavas Yisroel', coords:'31.879362,35.239793'}
	,pharmacyMeuchedet: {name: 'Meuchedet Pharmacy', info: 'Above TZ Makolet', coords:'31.880311,35.239828'}
	,BDStore:  {name: 'B&D Store', info: 'Ahavat Yisroel 18', map: 'Ahavat Yisroel 18, Kokchav Yaakov, Israel'}
	,ChadPaamit: {name: 'Chad Paamit', info: 'Ahavat Yisroel 14', map:'Ahavat Yisroel 14, Kokchav Yaakov, Israel'}
	,eggsMB1: {name: 'Egg Sale MB1', info: 'Mekor Baruch 1, up 1/2 flight', map:'Mekor Baruch 1, Kokchav Yaakov, Israel'}
	,WeberBakeStore: {name: 'Weber Bake Store', info: '5/1 Ahavat Yisroel (down 2 floors)\n997-9386 and 052-767-0471', map:'Ahavat Yisroel 5, Kokchav Yaakov, Israel'}
	,KeiliMikvaTZ: {name: 'Keili Mikva TZ', info: 'Kehilat Yaakov 9\nOther time: Azulay on Ahavat Emet 17/2, 02-997-1490 until 3pm, by appointment.', map:'Kehilat Yaakov 9, Kokchav Yaakov, Israel'}
	};

var storeHours = {
	postOffice: [
		{day: 'Sunday', open: '15:30', close: 17}
		,{day: 'Monday', open: '8:30', close: 10}
		,{day: 'Tuesday', open: '15:30', close: 17}
		,{day: 'Wednesday', open: '1700', close: 18}
		,{day: 'Thursday', open: '15:30', close: 17}
		,{day: 'Friday', open: 11, close: 13}
		]
	,pharmacyMeuchedet: [
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
	,leumiRamatEshkol: [
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
	,eggsMB1: [
		{day: 'Sunday', open: 19, close: 20}
		,{day: 'Wednesday', open: 16, close: 18}
		]
	,KikarNetanelSweetsStand: [
		{day: 'Sunday', open: 12, close: 23}
		,{day: 'Monday', open: 12, close: 23}
		,{day: 'Tuesday', open: 12, close: 23}
		,{day: 'Wednesday', open: 12, close: 23}
		,{day: 'Thursday', open: 12, close: 23}
		,{day: 'Friday', open: 11, close: shabbosStart.clone().subtract(90,'minutes').format('HHmm')}
		,{day: 'Saturday', open: shabbosEnd.clone().add(40,'minutes').format('HHmm'), close: 23.5}
		//Friday / Erev Chag: 11am until 1½ hours before shabbos/chag
		//Motzei Shabbos: 40minutes after Tzeits until 11:30pm.
		]
	,KeiliMikvaTZ: [
		,{day: 'Friday', open: 6, close: shabbosStart.clone().format('HHmm')}
		]
};

var daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

var storeList = Object.keys(storeHours);//since object, make list of stores

storeList.forEach(function(name){//iterate list of stores, and overwrite data to normalize it.
	storeHours[name] = storeHours[name].map(function(timeEntry){
		timeEntry.day= daysOfWeek.indexOf(timeEntry.day.toLowerCase());//convert date to numbers in 0-6 format.
		['open','close'].forEach(function(which){//dumb stuff to make it DRY
			timeEntry[which] = normalizeTime(timeEntry[which]);//normalize
			//console.log('just normalized: '+typeof timeEntry[which] + timeEntry[which])
			//timeEntry[which+'Minutes'] = hoursToMinutes(timeEntry[which]);//then create calc minutes
			//timeEntry[which+'Human'] = showTime(timeEntry[which]);//and also human readable time //@TODO: overwrite original array?!
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