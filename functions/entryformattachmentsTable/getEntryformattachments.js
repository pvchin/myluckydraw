const { table } = require('./airtable-entryformattachments');
const formattedReturn = require('../formattedReturn');

module.exports = async event => {
  const { id, fi } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const entryformattachment = await table.find(id);
    const formattedEntryformAttachments = {
      id: entryformattachment.id,
      ...entryformattachment.fields,
    };
    if (entryformattachment.error) {
      return {
        statusCode: 404,
        body: `No Entry Form attachment with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedEntryformAttachments);
  }

  if (fi) {
    const entryformattachments = await table
      .select({ view: 'sortedview', filterByFormula: `drawno = '${fi}'` })
      .firstPage();
    const formattedEntryformAttachments = entryformattachments.map(e => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedEntryformAttachments);
  }

  try {
    const entryformattachments = await table.select().firstPage();
    const formattedEntryformAttachments = entryformattachments.map(e => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedEntryformAttachments);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
