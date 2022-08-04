const { table } = require('./airtable-entryform');
const formattedReturn = require('../formattedReturn');
module.exports = async event => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedEntryform = await table.destroy(id);
    return formattedReturn(200, deletedEntryform);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
