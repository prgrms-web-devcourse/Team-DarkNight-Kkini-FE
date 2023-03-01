import { Box } from '@chakra-ui/react';
import SearchRestaurantContent from 'components/SearchRestaurant/SearchRestaurantContent';

import DraggableDrawer from './index';

const CreateCommunityDrawer = () => {
  return (
    <DraggableDrawer>
      <Box pos='relative' h='100%'>
        <SearchRestaurantContent />
      </Box>
    </DraggableDrawer>
  );
};

export default CreateCommunityDrawer;
