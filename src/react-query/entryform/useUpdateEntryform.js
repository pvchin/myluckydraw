import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryform_url } from '../../utils/constants';
import { useCustomToast } from '../../helpers/useCustomToast';

async function updateEntryform(data) {
  const { id, ...fields } = data;

  await fetch(entryform_url, {
    method: 'PUT',
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateEntryform(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => updateEntryform(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('entryform');
      toast({
        title: 'Entry form being updated!',
        status: 'success',
      });
    },
  });

  return mutate;
}
