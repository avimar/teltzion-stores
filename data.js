var storeHours = {
	postOffice: [
		{day: 'Sunday', open: '15:30', close: 17}
		,{day: 'Monday', open: '8:30', close: 10}
		,{day: 'Tuesday', open: '15:30', close: 17}
		,{day: 'Wednesday', open: '1700', close: 18}
		,{day: 'Thursday', open: '15:30', close: 17}
		,{day: 'Friday', open: 11, close: 13}
		//moment({ hour:3, minute:30, e: 1 }).twix(moment().day("Sunday").set({ hour:5}))
		//moment.duration(1.5, "hours").afterMoment({ hour:3, minute:30})
		//{4: {open: 17, close: 18}}
		//,{4: {open: 15, close: 15.5}}
		]
	,pharmacyMeuchedet: [
		{day: 'Sunday', open: 8, close: 14}
		,{day: 'Monday', open: 14, close: 19}
		,{day: 'Tuesday', open: 8, close: 15}
		,{day: 'Wednesday', open: 8, close: 13}
		,{day: 'Thursday', open: 13, close: 19}
		,{day: 'Friday', open: 8, close: 11}
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
	,EggsMekorBaruch1: [
		{day: 'Sunday', open: 19, close: 20}
		,{day: 'Wednesday', open: 16, close: 18}
		]
};

var daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday'];

var storeList = Object.keys(storeHours);//since object, make list of stores
storeList.forEach(function(name){//iterate list of stores, and overwrite data to normalize it.
	storeHours[name] = storeHours[name].map(function(timeEntry){
		timeEntry.day= daysOfWeek.indexOf(timeEntry.day.toLowerCase());//convert date to numbers in 0-6 format.
		
		['open','close'].forEach(function(which){//dumb stuff to make it DRY
			timeEntry[which] = normalizeTime(timeEntry[which]);//normalize
			//console.log('just normalized: '+typeof timeEntry[which] + timeEntry[which])
			timeEntry[which+'Minutes'] = hoursToMinutes(timeEntry[which]);//then create calc minutes
			timeEntry[which+'Human'] = showTime(timeEntry[which]);//and also human readable time
			});
		
		return timeEntry;
		});
	})

//console.log(storeHours.pharmacyMeuchedet[0]);

function showTime (arr){
	if(arr[1]<10) arr[1]='0'+arr[1];//left pad for readability
	var zone='am';
	if(arr[0]>12) {//show AM/PM
		arr[0]-=12;
		zone = 'pm';
		}
	else if (arr[0]==12) zone = 'pm';
	return arr.join(':')+zone;
	}

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

function hoursToMinutes(time){
	if(!Array.isArray(time)) time = normalizeTime(time);
	return time[0]*60 + time[1]*1;//cast back to numbers
	}