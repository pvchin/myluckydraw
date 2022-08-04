const { table } = require('./airtable-entryformattachments');
const formattedReturn = require('../formattedReturn');
module.exports = async event => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdEntryformAttachment = await table.create([{ fields }]);
    return formattedReturn(200, createdEntryformAttachment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
