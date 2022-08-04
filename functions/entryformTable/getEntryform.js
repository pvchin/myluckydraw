const { table } = require('./airtable-entryform');
const formattedReturn = require('../formattedReturn');

module.exports = async event => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const entryform = await table.find(id);
    const formattedEntryform = { id: entryform.id, ...entryform.fields };
    if (entryform.error) {
      return {
        statusCode: 404,
        body: `No Entry Form with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedEntryform);
  }

  if (fi) {
    const entryform = await table
      .select({ view: 'sortedview', filterByFormula: `IGid = '${fi}'` })
      .firstPage();
    const formattedEntryform = entryform.map(rec => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedEntryform);
  }

  try {
    const entryform = await table.select({ view: 'sortedview' }).firstPage();
    const formattedEntryform = entryform.map(rec => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedEntryform);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
