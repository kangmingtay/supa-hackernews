import { Box, HStack, VStack, Text, Divider } from 'native-base';
import React from 'react';

const Story = ({ data }) => {
    const age = (datetime) => {
        const timeDiff = new Date() - Date.parse(datetime)
        const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365))
        const days = Math.floor(timeDiff % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24))
        const hrs = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / 36e5)
        return (years !== 0) ? `${years} yrs` : (days !== 0) ? `${days} days ${hrs} hrs` : `${hrs} hrs`
    }
    return (
        <>
            <Box
                py={4}
                px={3}
                rounded='md'
                alignSelf='center'
                width={375}
                maxWidth='100%'
            >
                <HStack justifyContent='space-between'>
                    <Box justifyContent='space-between'>
                        <VStack space={2}>
                            <Text fontSize='md'>
                                {data.title}
                            </Text>
                            <Text fontSize='sm'>
                                {data.by} • {age(data.time)} • {data.score} points • {data.descendants} comments
                            </Text>
                        </VStack>
                    </Box>
                </HStack>
            </Box>
            <Divider my={1} width={375}/>
        </>
    )
}

export default Story;