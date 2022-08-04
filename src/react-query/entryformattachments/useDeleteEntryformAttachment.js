import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryformattachments_url } from '../../utils/constants';
import { useCustomToast } from '../../helpers/useCustomToast';

async function deleteEntryformAttachment(id) {
  await fetch(entryformattachments_url, {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteEntryformAttachment(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => deleteEntryformAttachment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('entryformattachments');
      //   toast({
      //     title: "Expense attachment record being deleted!",
      //     status: "warning",
      //   });
    },
  });

  return mutate;
}
