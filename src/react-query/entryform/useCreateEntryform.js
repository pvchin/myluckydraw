import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryform_url } from '../../utils/constants';
import { useCustomToast} from "../../helpers/useCustomToast"

async function addEntryform(data) {
  await fetch(entryform_url, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
  });
}

export function useAddEntryform(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => addEntryform(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('entryform');
      // toast({
      //   title: 'New Entry Form being added!',
      //   status: 'success',
      // });
    },
  });

  return mutate;
}
