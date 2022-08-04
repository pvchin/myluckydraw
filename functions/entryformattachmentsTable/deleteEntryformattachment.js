const { table } = require('./airtable-entryformattachments');
const formattedReturn = require('../formattedReturn');
module.exports = async event => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedEntryformAttachment = await table.destroy(id);
    return formattedReturn(200, deletedEntryformAttachment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
