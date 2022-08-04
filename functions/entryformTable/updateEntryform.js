const { table } = require('./airtable-entryform');
const formattedReturn = require('../formattedReturn');
module.exports = async event => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedEntryform = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedEntryform);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
