const formattedReturn = require('./formattedReturn');
const getEntryform = require('./entryformTable/getEntryform');
const createEntryform = require('./entryformTable/createEntryform');
const deleteEntryform = require('./entryformTable/deleteEntryform');
const updateEntryform = require('./entryformTable/updateEntryform');
exports.handler = async event => {
  if (event.httpMethod === 'GET') {
    return await getEntryform(event);
  } else if (event.httpMethod === 'POST') {
    return await createEntryform(event);
  } else if (event.httpMethod === 'PUT') {
    return await updateEntryform(event);
  } else if (event.httpMethod === 'DELETE') {
    return await deleteEntryform(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
