import { Box, HStack, VStack, Text, Divider, Badge } from 'native-base';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';

const Story = ({ data }) => {
    const age = (datetime) => {
        const timeDiff = new Date() - Date.parse(datetime)
        const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365))
        const days = Math.floor(timeDiff % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24))
        const hrs = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / 36e5)
        return (years !== 0) ? `${years} yrs` : (days !== 0) ? `${days} days` : `${hrs} hrs`
    }

    const _handlePressButtonAsync = async (url) => {
        try {
            await WebBrowser.openBrowserAsync(url);
        } catch (err) {
            await WebBrowser.dismissBrowser()
            console.log(err)
        }
        // console.log(res)
    }
    return (
        <>
            <Box
                py={4}
                px={3}
                rounded='md'
                alignSelf='center'
                width='95%'
                maxWidth='100%'
            >
                <HStack justifyContent='space-between'>
                    <Box justifyContent='space-between'>
                        <VStack space={2}>
                            <Text fontSize='md' onPress={() => _handlePressButtonAsync(data.url)}>
                                {data.title} 
                            </Text>    
                            <Text fontSize='sm'>
                                {data.by} • {age(data.time)} • {data.score} points • {data.descendants} comments
                            </Text>             
                            <Badge 
                                alignSelf='flex-start' 
                                bold 
                                rounded='md' 
                                bgColor='orange.300' 
                            >
                                <Text bold fontSize='sm' onPress={() => _handlePressButtonAsync(`https://news.ycombinator.com/item?id=${data.id}`)}>
                                    HN Link
                                </Text>
                            </Badge>
                        </VStack>
                    </Box>
                    
                </HStack>    
            </Box>
            <Divider alignSelf='center' my={1} size={2} width='90%'/>
        </>
    )
}

export default Story;