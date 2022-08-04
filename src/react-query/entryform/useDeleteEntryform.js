import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryform_url } from '../../utils/constants';
import { useCustomToast } from '../../helpers/useCustomToast';

async function deleteEntryform(id) {
  await fetch(entryform_url, {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteEntryform(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => deleteEntryform(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('entryform');
      toast({
        title: 'Entry Form being deleted!',
        status: 'warning',
      });
    },
  });

  return mutate;
}
