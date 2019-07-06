const CronJob = require('cron').CronJob;
const calculator = require('./calculator');
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;

// Fiddle around with these constants
const symbol = 'BTC';
const daysToAverage = 15;

// Create a new cron job that runs every night at midnight
// To have the job run every 5 seconds for testing, edit the expression to be '*/5 * * * * *'
const job = new CronJob('0 0 0 * * *', function() {
    calculator(symbol, daysToAverage);
});

job.start();

// express app
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/calculate', (req, res) => {
	const {symbol, daysToAverage} = req.query
	console.log(`input params: ${symbol}  ${daysToAverage}`)

	calculator(symbol, daysToAverage)
		.then(responseObject => {
			res.send(JSON.stringify(responseObject))
		})
		.catch(err => {
			console.log(err)
			res.send(err)
		})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
