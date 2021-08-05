import { Icon, Input, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const SearchBar = ({setInput}) => {
    return(
        <VStack width="100%">
            <Input
                placeholder="Search"
                variant="filled"
                width="90%"
                bg="gray.100"
                borderRadius={10}
                alignSelf='center'
                py={2}
                px={2}
                mt={2}
                _web={{
                    _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                    }}
                InputLeftElement={
                    <Icon size='sm' ml={2} size={5} color="gray.400" as={<Ionicons name="ios-search" />} />
                }
                onSubmitEditing={setInput}
                returnKeyType='search'
            />
        </VStack>
    )
}

export default SearchBar;