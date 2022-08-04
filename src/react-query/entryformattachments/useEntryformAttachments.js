import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { entryformattachments_url } from '../../utils/constants';
import { filterById } from './utils';

import axios from 'axios';
import { queryKeys } from '../constants';

async function getEntryformAttachments(id) {
  const { data } = await axios.get(`${entryformattachments_url}?fi=${id}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useEntryformAttachments(empid) {
  const [filter, setFilter] = useState('all');
  const [attachmentId, setAttachmentId] = useState('');

  const selectFn = useCallback(
    unfiltered => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: entryformattachments = fallback } = useQuery(
    [queryKeys.entryformattachments, { attachmentId }],
    //queryKeys.expenses,
    () => getEntryformAttachments(attachmentId),
    {
      select: filter !== 'all' ? selectFn : undefined,
    }
  );

  return { entryformattachments, filter, setFilter, setAttachmentId };
}
