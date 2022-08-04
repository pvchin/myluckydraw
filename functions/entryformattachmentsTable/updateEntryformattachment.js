const { table } = require('./airtable-entryformattachments');
const formattedReturn = require('../formattedReturn');
module.exports = async event => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedEntryformAttachment = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedEntryformAttachment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
