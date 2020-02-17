const fs = require('file-system');

const scrapeFileAsync = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) reject(err);

    const watchList = buildList(data);
    const cleanedList = clean(watchList);
    resolve(cleanedList);
  })
});

const buildList = (text) => text.split('\n');

const clean = (list) => {
  return list
    .removeText('IMDb')
    .removeText('Google Search')
    .removeText('Wikipedia')
    .removeText('Rotten Tomatoes')
    .trim();
}

Array.prototype.removeText = function (text) {
  return this.map(item => item.removeText(text));
}

String.prototype.removeText = function (text) {
  const textRegex = new RegExp(`\\-\\s*${text}.*`, 'gi');

  return this.includes(text)
    ? this.replace(textRegex, '')
    : this;
}

Array.prototype.trim = function () {
  return this.map(item => item.trim());
}

module.exports = scrapeFileAsync;