const { table } = require('./airtable-entryform');
const formattedReturn = require('../formattedReturn');
module.exports = async event => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdEntryform = await table.create([{ fields }]);
    return formattedReturn(200, createdEntryform);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
