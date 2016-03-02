<main>

<style scoped>
</style>

Time to check: {moment(timeToCheck).format(dateFormat)}<br>
Sunrise: {moment(times.sunrise).format(dateFormat)}<br>
Sunset: {moment(times.sunset).format(dateFormat)}<br>
Now is: {daytime ? 'DAY!' : 'Night'}<br>

<script>
this.dateFormat='YYYY-MM-DD hh:mm:ss a';
this.timeToCheck = moment();//.add(12,'hours');
this.locationX = 31.8772;
this.locationY = 35.2402;//18
this.times = SunCalc.getTimes(this.timeToCheck, this.locationX, this.locationY);
this.daytime = moment(this.timeToCheck).isBetween(this.times.sunrise,this.times.sunset);


</script>
</main>