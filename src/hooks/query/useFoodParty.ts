import { useMutation } from '@tanstack/react-query';
import { createFoodParty } from 'services/foodParty';

export const useCreateFoodParty = () => {
  return useMutation({ mutationFn: createFoodParty });
};
