import { useRef } from "react";
import { Animated } from "react-native";


const useAnimation = () => {

    const opacity = useRef( new Animated.Value(0)).current;
    const position = useRef( new Animated.Value(0)).current;

    const fadeIn = ( duration: number = 300 ) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: duration,
                useNativeDriver: true
            }
        ).start();

    }

    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }
        ).start();
    }

    const startMovigPosition = ( initPosition: number, duration: number = 300 ) => {

        position.setValue(initPosition);

        Animated.timing(
            position,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }
        ).start();
    }

    return {
        opacity,
        position,
        fadeIn,
        fadeOut,
        startMovigPosition
        
    }
}

export default useAnimation