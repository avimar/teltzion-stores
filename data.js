var locationX = 31.8772;
var locationY = 35.2402;//18

var shabbosStartStore = moment(SunCalc.getTimes(moment().startOf('week').day(5).hour(14), locationX, locationY).sunset).subtract(40,'minute');
var shabbosEndStore = moment(SunCalc.getTimes(moment().startOf('week').day(6).hour(14), locationX, locationY).dusk).add(10,'minute');
function shabbosStart(){ return shabbosStartStore.clone(); }
function shabbosEnd(){ return shabbosEndStore.clone(); }

var storeData = {
	DoarTZ2: {name: 'Doar TZ #2', info: 'Corner of Mekor Baruch and Ahavas Yisroel', coordX:31.879313, coordY: 35.239771}
	,DoarKY: {name: 'Doar KY', info: '', coordX:31.881202, coordY: 35.245059}
	,RavFichel: {name: 'Rav Fichel Food Sale', info: 'Next to Merkaz Hatarbut', coordX:31.878511, coordY: 35.237738}
	,PharmacyMeuchedet: {name: 'Pharmacy, Meuchedet', info: 'Above TZ Makolet', coordX:31.880311, coordY: 35.239828}
	,BDStore:  {name: 'B&D Store', info: 'Ahavat Yisroel 18', coordX:31.878580, coordY: 35.239553}
	,ChadPaamit: {name: 'Chad Paamit', info: 'Ahavat Yisroel 14', coordX:31.878945, coordY: 35.239718}
	,EggsMB1: {name: 'Egg Sale MB1', info: 'Mekor Baruch 1, up 1/2 flight', coordX:31.878198, coordY: 35.240136}
	,WeberBakeStore: {name: 'Weber Bake Store', info: '5/1 Ahavat Yisroel (down 2 floors)\n997-9386 and 052-767-0471', coordX:31.879281, coordY: 35.240036}
	,KeiliMikvaTZ: {name: 'Keili Mikva TZ', info: 'Kehilat Yaakov 9\nOther time: Azulay on Ahavat Emet 17/2, 02-997-1490 until 4pm, by appointment.', coordX:31.881570, coordY: 35.239375}
	,MikvaTZ: {name: 'Women Mikva TZ',
		info: 'Kehilat Yaakov 9\nOnly times for normal days listed. Weekday winter: 6:30pm-9pm. Summer: 7:30pm-9:30pm\nYom Tov night: Tzeits. Motzei Yom Tov follow shabbos schedule.\nDifferent hours on: Motzei 17 Tammuz, 9 Av, Chol Hamoed, Purim. \nFor later, call 997-3441',
		coordX:31.881508, coordY: 35.239266}
	,MikvaKY: {name: 'Women Mikva KY',
		info: 'Mekor Chaaim, cost: 30shekel\nOnly times for normal days listed, on winter clock. Weekday winter: 7:30pm-8:30pm. Summer: ? Motzei Shabbos ?\nUse other times: Odelia Badi 052-720-3360 or Devora Mizrachi 050-414-5489 for 20 shekel more.',
		coordX:31.880620, coordY: 35.244936}
	,KikarNetanelSweetsStand: {name: 'Kikar Netanel Sweets Store', info: 'Next to Kikar Netanel', coordX:31.879945, coordY: 35.242878}
	,MakoletTZ: {name: 'Makolet TZ', info: 'Branch of Hachi K\'dai\n1 Kehilat Yaakov\nDeliveries cost 15shekel (free over 400 shekel)', coordX:31.880516, coordY: 35.239931}
	,MakoletKY: {name: 'Makolet KY', info: 'Phone 1-700-550-550', coordX:31.881013, coordY: 35.245131}
	,LeumiRamatEshkol: {name: 'Leumi Bank (Ramat Eshkol)', info: 'Ramat Eshkol', coordX:31.800846, coordY: 35.226847}
	,RamiLevyBinyamin: {name: 'Rami Levy (Sha\'ar Binyamin)', info: 'Phone: 02-633-5506', coordX:31.865733, coordY: 35.260683}
	,Shatnez: {name:'Shatnez Checking', info: '333 Etsei ha-Levanon Street\nPhone: 02-997-8122; 050-304-9782\n Hebrew/French Speakers', coordX:31.881544,coordY:35.246871}
	,DryCleaners: {name:'Hagisga Dry Cleaners', info: 'Next to the supermarket in KY\nPhone: 052-365-6652\nHours: Not sure: 8:00 or 8:15 until 2:00 or 2:30pm', coordX:31.881052,coordY:35.245527}
	,Seforim: {name:'Seforim Store, Sifrei Fischer', info: '28 Ahavat Emet, in the Machsan on the right\nPhone: 054-842-0616, 02-970-9799\nHe can order and deliver seforim that he doesn\'t have.', coordX:31.878727,coordY:35.238713}
	,HardwareStore: {name:'Hardware Store', info: 'Not sure of Friday times.\nPhone: 058-566-5252, 02-970-9571', coordX:31.879735,coordY:35.244133}
	,PharmacyShaarBinyamin: {name:'Pharmacy, Shaar Binyamin', info: 'Pharm 4 You - בית מרקחת אזורי שער בנימין\nPhone: 02-629-1029\nemail: pharm4foru@gmail.com, FB: pharm4u', coordX:31.865223,coordY:35.260526}
	};

var storeHours = {
	DoarTZ2: [
		{day: 'Sunday', open: 8.5, close: 9.5}
		,{day: 'Sunday', open: 17, close: 19}
		,{day: 'Monday', open: '8:30', close: 10.5}
		,{day: 'Tuesday', open: '15:30', close: 18}
		,{day: 'Thursday', open: 19, close: 21}
		,{day: 'Friday', open: 10.5, close: 12.5}
		]
	,DoarKY: [
		{day: 'Monday', open: 19, close: 20}
		,{day: 'Wednesday', open: 19, close: 20}
		,{day: 'Friday', open: 8, close: 9}
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
		{day: 'Tuesday', open: 20.5, close: 22}
		,{day: 'Wednesday', open: 20.5, close: 22}
		,{day: 'Thursday', open: 15.5, close: 17}
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
		,{day: 'Friday', open: 11, closeText: '1½ hours before Shabbos', close: shabbosStart().subtract(90,'minutes').format('HHmm')}
		,{day: 'Saturday', openText: '40minutes after Tzeits', open: shabbosEnd().add(40,'minutes').format('HHmm'), close: 23.5}
		]
	,KeiliMikvaTZ: [
		{day: 'Friday', open: 6, closeText: 'until Shabbos', close: shabbosStart().format('HHmm')}
		]
	,MikvaTZ: [
		{day: 'Friday', openText: 'Only Shkia/Tzeitz', open: shabbosStart().add(40,'minutes').format('HHmm'),
						close: shabbosEnd().add(10,'minutes').format('HHmm')	}
		,{day: 'Saturday', openText: '1½ after Shabbos', open: shabbosEnd().add(90,'minutes').format('HHmm'),
						closeText: 'for 2 hours, get there first hour', close: shabbosEnd().add(90+120,'minutes').format('HHmm') }
		]
	,MikvaKY: [
		{day: 'Sunday', open: 18.5, close: 20.5}
		,{day: 'Monday', open: 18.5, close: 20.5}
		,{day: 'Tuesday', open: 18.5, close: 20.5}
		,{day: 'Wednesday', open: 18.5, close: 20.5}
		,{day: 'Thursday', open: 18.5, close: 20.5}
		,{day: 'Friday', openText: 'Only Shkia/Tzeitz', open: shabbosStart().add(40,'minutes').format('HHmm'),
						close: shabbosEnd().add(10,'minutes').format('HHmm')	}
		]
	,MakoletTZ: [
		{day: 'Sunday', open: 7, close: 21}
		,{day: 'Monday', open: 7, close: 22}
		,{day: 'Tuesday', open: 7, close: 22}
		,{day: 'Wednesday', open: 7, close: 22}
		,{day: 'Thursday', open: 7, close: 23}
		,{day: 'Friday', open: 7, close: 13}
		]
	,MakoletKY: [
		{day: 'Sunday', open: 7, close: 21}
		,{day: 'Monday', open: 7, close: 21}
		,{day: 'Tuesday', open: 7, close: 21}
		,{day: 'Wednesday', open: 7, close: 22}
		,{day: 'Thursday', open: 7, close: 22}
		,{day: 'Friday', open: 7, closeText: '2hr before Shabbos', close: shabbosStart().subtract(2,'hours').format('HHmm')}
		]
	,RamiLevyBinyamin: [
		{day: 'Sunday', open: 8, close: 22}
		,{day: 'Monday', open: 8, close: 22}
		,{day: 'Tuesday', open: 8, close: 22}
		,{day: 'Wednesday', open: 8, close: 23}
		,{day: 'Thursday', open: 8, close: 23}
		,{day: 'Friday', open: 7.5, closeText: '3hr before Shabbos', close: shabbosStart().subtract(3,'hours').format('HHmm')}
		]
	,HardwareStore: [
		{day: 'Sunday', open: 8.5, close: 19}
		,{day: 'Monday', open: 8.5, close: 19}
		,{day: 'Tuesday', open: 8.5, close: 19}
		,{day: 'Wednesday', open: 8.5, close: 19}
		,{day: 'Thursday', open: 8.5, close: 19}
		,{day: 'Friday', open: 8.5, close: 12}
		]
	,Seforim: [
		{day: 'Sunday', open: 18, close: 21}
		,{day: 'Monday', open: 18, close: 21}
		,{day: 'Tuesday', open: 18, close: 21}
		,{day: 'Wednesday', open: 18, close: 21}
		,{day: 'Thursday', open: 18, close: 21}
		]
	,PharmacyShaarBinyamin: [
		{day: 'Sunday', open: 8, close: 21}
		,{day: 'Monday', open: 8, close: 21}
		,{day: 'Tuesday', open: 8, close: 21}
		,{day: 'Wednesday', open: 8, close: 21}
		,{day: 'Thursday', open: 8, close: 21}
		,{day: 'Friday', open: 8, close: 13}
		]
};


var DST = moment().isDST();
if (DST) storeHours.MikvaTZ.push(
		{day: 'Sunday', open: 19.5, close: 21.5}
		,{day: 'Monday', open: 19.5, close: 21.5}
		,{day: 'Tuesday', open: 19.5, close: 21.5}
		,{day: 'Wednesday', open: 19.5, close: 21.5}
		,{day: 'Thursday', open: 19.5, close: 21.5});
else storeHours.MikvaTZ.push(
		{day: 'Sunday', open: 18.5, close: 21}
		,{day: 'Monday', open: 18.5, close: 21}
		,{day: 'Tuesday', open: 18.5, close: 21}
		,{day: 'Wednesday', open: 18.5, close: 21}
		,{day: 'Thursday', open: 18.5, close: 21});


var daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
var daysOfWeekHuman = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var storeList = Object.keys(storeData);//since object, make list of stores

storeList.forEach(function(name){//iterate list of stores, and overwrite data to normalize it.
	if(!storeHours[name]) return;//some stores don't have hours
	storeHours[name] = storeHours[name].map(function(timeEntry){
		timeEntry.day= daysOfWeek.indexOf(timeEntry.day.toLowerCase());//convert date to numbers in 0-6 format.
		['open','close'].forEach(function(which){//dumb stuff to make it DRY
			timeEntry[which] = normalizeTime(timeEntry[which]);//normalize
			//console.log('just normalized: '+typeof timeEntry[which] + timeEntry[which])
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
	else if(time.length===4) arr = [time.substring(0,2), time.substring(2,4)];//hhmm format
	else arr = [time.substring(0,1), time.substring(1,3)];//hmm format
	//console.log(arr);
	return arr;
	}

function showTime (arr){
	var time=arr.slice(0);//clone it, don't overwrite.
	if (time[0]==12 && time[1]==0) return 'noon';// I did NOT cast it to numbers, so can't use ===
	if(typeof time[1]==='number' && time[1]<10) time[1]='0'+time[1];//left pad for readability
	var zone='pm';
	if(time[0]>12) time[0]-=12;
	else zone = 'am';
	return time.join(':')+zone;
	}
