const formattedReturn = require('./formattedReturn');
const getEntryformAttachments = require('./entryformattachmentsTable/getEntryformattachments');
const createEntryformAttachment = require('./entryformattachmentsTable/createEntryformattachment');
const deleteEntryformAttachment = require('./entryformattachmentsTable/deleteEntryformattachment');
const updateEntryformAttachment = require('./entryformattachmentsTable/updateEntryformattachment');

exports.handler = async event => {
  if (event.httpMethod === 'GET') {
    return await getEntryformAttachments(event);
  } else if (event.httpMethod === 'POST') {
    return await createEntryformAttachment(event);
  } else if (event.httpMethod === 'PUT') {
    return await updateEntryformAttachment(event);
  } else if (event.httpMethod === 'DELETE') {
    return await deleteEntryformAttachment(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
