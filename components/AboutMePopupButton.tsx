import { Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function AboutMePopupButton(
    { setShowWindow }:
        { setShowWindow: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <TouchableOpacity
            style={styles.popUpButton}
            onPress={() => setShowWindow(true)}>
            <Text style={{ color: '#000', opacity: 0.3, fontSize: 19, fontFamily: 'Times New Roman', fontWeight: 'bold' }}>i</Text>
        </TouchableOpacity>
    )
}


// ====================================================================================================
// Styles 
// ====================================================================================================
const styles = StyleSheet.create({
    popUpButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 40,
        left: 20,
        height: 30,
        width: 30,
        // backgroundColor: 'red',
        backgroundColor: '#ECECEC',

        borderRadius: '50%',
        borderColor: '#BFBFBF',
        borderWidth: 3,

        // iOS Shadow
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
        shadowOpacity: 0.15, // Opacity of the shadow
        shadowRadius: 13, // Blur radius of the shadow

        // Android Shadow
        elevation: 5, // Elevation for Android
    },
    AboutMeWindow: {

    },
});