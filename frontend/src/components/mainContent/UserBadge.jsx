import React from 'react'
import { Button, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const UserBadge = ({ user,handleFunction }) => {
  return (
      <Button rightIcon={<CloseIcon onClick={handleFunction} boxSize={2} />} colorScheme='purple' padding="0.7em" margin="0.3em" borderRadius="19px">
        <Text fontWeight="bold" fontSize="sm" backgroundColor="purple" color="white">{user.name}</Text>
      </Button>
  )
}

export default UserBadge