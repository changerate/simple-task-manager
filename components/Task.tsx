import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';


// ======================================================================================
// This abstracted component can take click interactions. 
// The click interactions can be applied to it's button (checkmark like), 
// as well as the swipe button for deletion. 
// In the future I would like to add the click ability for editing names.
// 
// I wrote this component specifically for the tech screening internship.
// Carlos Vargas, March 17th, 2025
// ======================================================================================




interface ListItem {
    name: string;
    status: string;
    id: number;
}

interface ListItemProps {
    listItem: ListItem;
    bgColor: string;
    onClick: ( ListItem: ListItem, typeOfClick: string ) => void;
}

export default function Task(props: ListItemProps){
    const { name, status, id } = props.listItem;
    const { bgColor } = props;
    const { onClick } = props;


    /**
     * Filter the list into two arrays, once for Open tasks and once for Done tasks.
     * Sort each array by id (affectively sorting by time).
     * Append the arrays together and assign the result to the taskList.
     * @param clickedTask of ListItem
     */
    const handleCheckmarkClick = (clickedTask: ListItem) => {
        if (Platform.OS === 'ios') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
        };

        onClick(clickedTask, "checkedBox");
    };


    /**
     * This handles the swipe from right to left that gives the user the ability to delete tasks.
     * @param prog 
     * @param drag 
     * @returns 
     */
    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        return (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleListItemDeletion}
            >
                <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
        );
    }



    const handleListItemDeletion = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Heavy
            );
        }

        onClick({name, status, id}, "delete");
    }



    // ====================================================================================================
    // List Component
    // ====================================================================================================
    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable
                rightThreshold={40}
                renderRightActions={RightAction}>
                <View style={status === "Done" ? styles.doneTask : styles.openTask}>
                    <TouchableOpacity
                        style={status === "Done" ? styles.doneButton : styles.openButton}
                        onPress={() => handleCheckmarkClick({ name, status, id })}
                    ></TouchableOpacity>
                    <Text style={status === "Done" ? styles.doneText : styles.openText}>{name}</Text>
                </View>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
    );
}




// ====================================================================================================
// Styles 
// ====================================================================================================
const styles = StyleSheet.create({
    openTask: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 20,
        paddingRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        
        borderRadius: 15,
        // backgroundColor: '#E4EFFF',
        
        // iOS Shadow
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
        shadowOpacity: 0.13, // Opacity of the shadow
        shadowRadius: 3,

        // Android Shadow
        elevation: 5, // Elevation for Android        
    },
    doneTask: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 20,
        paddingRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,

        borderRadius: 15,
        backgroundColor: '#F1F6EB',

        // iOS Shadow
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
        shadowOpacity: 0.03, // Opacity of the shadow
        shadowRadius: 4,

        // Android Shadow
        elevation: 5, // Elevation for Android

    },
    openText: {
        paddingHorizontal: 12,
        fontSize: 15,
        color: 'black',
    },
    doneText: {
        paddingHorizontal: 12,
        fontSize: 15,
        color: '#969696'
    },
    openButton: {
        borderRadius: 40,
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    doneButton: {
        borderRadius: 40,
        height: 30,
        width: 30,
        backgroundColor: '#CDDEB9',
        borderColor: 'white',
        borderWidth: 1,
    },
    deleteButton: {
        justifyContent: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 18,
        marginVertical: 8,
        marginRight: 20,
        color: 'white',
        fontWeight: 500,
        borderRadius: 16,
    },
});