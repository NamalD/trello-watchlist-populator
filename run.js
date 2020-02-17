const scrapeFileAsync = require('./scrapeFileAsync');
const categorise = require('./categorise');

const watchlistFilePath = './watchlist.txt';

scrapeFileAsync(watchlistFilePath).then(watchList => {
  var categorised = categorise(watchList);
  console.log(categorised)
});