export function filterByFormId(entryform, id) {
  // eslint-disable-next-line array-callback-return
  return entryform
    .filter(item => item.id === id)
    .map(r => {
      return { ...r };
    });
}
