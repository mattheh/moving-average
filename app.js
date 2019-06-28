const CronJob = require('cron').CronJob;
const calculator = require('./calculator');

// Fiddle around with these constants
const symbol = 'BTC';
const daysToAverage = 15;

// Create a new cron job that runs every night at 10pm
// To have the job run every 5 seconds for testing, edit the expression to be '*/5 * * * * *'
const job = new CronJob('00 22 * * * *', function() {
	calculator(symbol, daysToAverage);
});

job.start();