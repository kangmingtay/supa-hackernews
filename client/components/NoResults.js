import { Image, Text, VStack } from 'native-base'
import React from 'react'

const NoResults = () => {
    return (
        <>
        <VStack space={2} alignItems='center'>
            <Image size='md' source={require('../assets/no-results.png')} alt="Can't find any stories"/>
            <Text>No stories found</Text>
        </VStack>
        </>
    )
}

export default NoResults;
