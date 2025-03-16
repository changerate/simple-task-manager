import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React from 'react';


type TaskType = {
    status: string;
    name: string;
    id: number;
}

export default function Task({
    name,
    status,
    id,
    taskList,
    setTaskList,
}: {
    name: string;
    status: string;
    id: number;
    taskList: TaskType[];
    setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) {

        
        
    /**
     * Filter the list into two arrays, once for Open tasks and once for Done tasks.
     * Sort each array by id (affectively sorting by time).
     * Append the arrays together and assign the result to the taskList.
     * @param clickedTask of TaskType
     */
    const handleTaskClick = (clickedTask: TaskType) => {
        if (Platform.OS === 'ios') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
        };

        setTaskList((prevTaskList) => {
            const updatedTaskList = prevTaskList.map((eachTask) =>
                eachTask.id === clickedTask.id
                    ? { ...eachTask, status: clickedTask.status === 'Open' ? 'Done' : 'Open' }
                    : eachTask
            );

            const allOpenTasksArray = updatedTaskList
                .filter((eachTask) => eachTask.status === 'Open')
                .sort((a, b) => b.id - a.id);
            const allDoneTasksArray = updatedTaskList
                .filter((eachTask) => eachTask.status === 'Done')
                .sort((a, b) => b.id - a.id);

            console.log(allOpenTasksArray);
            console.log(allDoneTasksArray);

            const sortedTaskList = [...allOpenTasksArray, ...allDoneTasksArray];

            return sortedTaskList;
        });
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
                onPress={handleTaskDeletion}
            >
                <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
        );
    }



    const handleTaskDeletion = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Heavy
            );
        }

        setTaskList((prevTaskList) => prevTaskList.filter((eachTask) => eachTask.id !== id))
    }



    // ====================================================================================================
    // Task Component
    // ====================================================================================================
    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable
                rightThreshold={40}
                renderRightActions={RightAction}>
                <View style={status === "Done" ? styles.doneTask : styles.openTask}>
                    <TouchableOpacity
                        style={status === "Done" ? styles.doneButton : styles.openButton}
                        onPress={() => handleTaskClick({ name, status, id })}
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
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 18,
        backgroundColor: '#E4EFFF',

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
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 18,
        backgroundColor: '#E8FCD2',

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
        borderColor: 'grey',
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