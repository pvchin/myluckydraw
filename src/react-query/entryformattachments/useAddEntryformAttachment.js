import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryformattachments_url } from '../../utils/constants';
import { useCustomToast } from '../../helpers/useCustomToast';

async function addEntryformAttachment(data) {
  await fetch(entryformattachments_url, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
  });
}

export function useAddEntryformAttachment(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  
  const { mutate } = useMutation(data => addEntryformAttachment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('entryformattachments');
      toast({
        title: 'Entryform Attachment record being added!',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        title: 'Entryform attchment add record error',
        status: 'warning',
      });
    },
  });

  return mutate;
}
