Moving Average
==
The purpose of this app is to calculate the moving average of a given crypto currency and submit an order to Gemini based on the result.

Starting the app
--

    npm start


Adding your personal API key
--

Before starting the app make sure to go into `keys.js` and insert your own personal API key.  Additionally, you may wish to change some to configurations in `app.js`.  For example, changing the cron statement or the parameters passed into job.

Changelog
==
## [0.0.1] - 2019-06-27
### Added
- Module to calculate the Moving Average of the given currency and logs a recommended action based on a comparison to the current price
- Cron job to kick off the calculation at a scheduled time


## [0.0.2] - 2019-07-05
### Added
- Express server to expose an api endpoint that runs the calculation
