import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { entryform_url } from '../../utils/constants';
import { filterByFormId } from './utils';

import axios from 'axios';
import { queryKeys } from '../constants';

async function getEntryform(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${entryform_url}`);
  return data;
}

export function useEntryform() {
  const [filter, setFilter] = useState('all');
  const [formId, setFormId] = useState('');

  const selectFn = useCallback(
    unfiltered => filterByFormId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: entryform = fallback } = useQuery(
    [queryKeys.entryform],
    () => getEntryform(formId),
    {
      select: filter !== 'all' ? selectFn : undefined,
    }
  );

  return { entryform, filter, setFilter, setFormId };
}
