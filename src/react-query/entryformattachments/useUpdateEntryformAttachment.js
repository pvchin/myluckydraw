import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryformattachments_url } from '../../utils/constants';
import { useCustomToast } from '../../helpers/useCustomToast';

async function updateEntryformAttachment(data) {
  const { id, ...fields } = data;

  await fetch(entryformattachments_url, {
    method: 'PUT',
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateEntryformAttachment(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => updateEntryformAttachment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('entryformattachments');
      toast({
        title: 'Entryform attachments record being updated!',
        status: 'success',
      });
    },
  });

  return mutate;
}
