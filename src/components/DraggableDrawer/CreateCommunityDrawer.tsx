import { Box } from '@chakra-ui/react';

import SearchRestaurant from '../SearchRestaurant/index';
import CreateCommunityContent from './CreateCommunityContent';
import DraggableDrawer from './index';

const CreateCommunityDrawer = () => {
  return (
    <DraggableDrawer>
      <Box h='100%'>
        <SearchRestaurant />
        <CreateCommunityContent />
      </Box>
    </DraggableDrawer>
  );
};

export default CreateCommunityDrawer;
