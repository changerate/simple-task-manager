import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { underDampedSpringCalculations } from 'react-native-reanimated/lib/typescript/animation/springUtils';



export default function AboutMeWindow(
    { showWindow, setShowWindow }:
        { showWindow: boolean, setShowWindow: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <View
            style={[
                styles.container,
                { display: showWindow ? 'flex' : 'none' },
            ]}
            pointerEvents={showWindow ? 'auto' : 'none'}>
            <View style={styles.backgroundLayer}></View>

            {showWindow &&
                <View style={styles.aboutMeWindow}>
                    <View style={styles.exitContainer}>
                        <Text
                            style={styles.exit}
                            onPress={() => setShowWindow(false)}>
                            Exit
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontWeight: 600, }}>About Me</Text>
                        <Text></Text>
                        <Text>I'm Carlos Vargas.</Text>
                        <Text></Text>
                        <Text style={{ textAlign: 'center', }}>A computer science student at Cal Poly Pomona focusing on embedded systems, front and backend development, and project management.</Text>
                    </View>
                </View>
            }
        </View>
    )
}


// ====================================================================================================
// Styles 
// ====================================================================================================

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        paddingHorizontal: 'auto',
    },
    exitContainer: {
        height: 30,
        marginBottom: 40,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutMeWindow: {
        height: 400,
        width: 250,
        marginHorizontal: 'auto',
        marginTop: 100,
        padding: 20,

        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        borderColor: '#E2E2E2',
        borderWidth: 3,

        // iOS Shadow
        shadowColor: '#4C4C4C', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
        shadowOpacity: 0.41, // Opacity of the shadow
        shadowRadius: 25, // Blur radius of the shadow

        // Android Shadow
        elevation: 5, // Elevation for Android
    },
    exit: {
        paddingVertical: 6,
    },
    backgroundLayer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        paddingHorizontal: 'auto',
        backgroundColor: '#888',
        // backgroundColor: 'red',
        opacity: 0.3,
    },
});