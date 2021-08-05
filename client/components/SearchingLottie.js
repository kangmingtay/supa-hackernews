import React, { useState } from 'react'
import LottieView from 'lottie-react-native';

const makeExample = (name, getJson, width) => ({ name, getJson, width });
const loader = makeExample('Lottie Logo', () => require('../assets/searching.json'))

const SearchingLottie = () => {
    const [anim, setAnim] = useState(null)
    return (
        <LottieView
            ref={setAnim}
            autoPlay={true}
            style={[loader.width && { width: loader.width }, false && styles.lottieViewInvse]}
            source={loader.getJson()}
            progress={1}
            loop={true}
            enableMergePathsAndroidForKitKatAndAbove
        />
    )
}

export default SearchingLottie;