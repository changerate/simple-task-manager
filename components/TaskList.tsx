import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import Task from './Task';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

type TaskType = {
    name: string;
    status: string;
    id: number;
}


export default function TaskList() {
    // Lists and Data
    // ===========================================
    const [taskList, setTaskList] = useState<TaskType[]>([]);

    const textInputRef = useRef<TextInput>(null); // Create a ref for the TextInput


    // Debugging
    useEffect(() => {
        console.log("Updated Open task list: ", taskList);
    }, [taskList]);



    // Add a task to the list by updating the taskList state
    // ===========================================
    const handleAddTask = (text: string) => {
        if (text.trim() === '' || text === undefined) {
            console.log("Error, task name cannot be empty.")
            // Clear the TextInput using the ref
            if (textInputRef.current) {
                textInputRef.current.clear();
            }
        }
        else {
            // initialize new task
            const newTask = {
                name: text,
                status: 'Open',
                id: Date.now()
            };

            // add new task to list
            setTaskList([newTask, ...taskList]);

            // Clear the TextInput using the ref
            if (textInputRef.current) {
                textInputRef.current.clear();
            }
        }
    };



    // Render each item in the flatlist by passing the propertiesto the Task component
    // ===========================================
    const renderItem = ({ item }: { item: { name: string; status: string; id: number } }) => {
        return (
            <Task
                name={item.name}
                status={item.status}
                id={item.id}
                taskList={taskList}
                setTaskList={setTaskList}
            />
        )
    }




    // ====================================================================================================
    // List component
    // ====================================================================================================

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor="black"
                    ref={textInputRef}
                    placeholder="Add a new task"
                    onChangeText={(text) => { name: text }}
                    onSubmitEditing={(event) => handleAddTask(event.nativeEvent.text)}
                />
            </KeyboardAvoidingView>
            <FlatList
                style={styles.flatList}
                data={taskList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {/* The touchable opacity is simply to make it more convienent to reach the text input */}
            <TouchableOpacity
                style={styles.addTaskButton}
                onPress={() => {
                    textInputRef.current?.focus(); // Focus the TextInput
                }}
            >
                <Text style={styles.addTaskButtonText}>New</Text>
            </TouchableOpacity>
        </View>
    );
}




// ====================================================================================================
// Styles 
// ====================================================================================================


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        // paddingVertical: 20,
    },
    keyboardView: {
        flex: 1,
        // flexDirection: 'row',
        position: 'absolute',
        top: 20,
        // marginHorizontal: 20,
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        // backgroundColor: 'red',
        borderRadius: 60,
        zIndex: 10,
    },
    textInput: {
        // flex: 1,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        color: 'black',
        backgroundColor: 'white',
    },
    flatList: {
        flex: 1,
        paddingTop: 80,
        width: '100%',
        // backgroundColor: 'red',
    },
    addTaskButton: {
        position: 'absolute',
        flex: 1,
        bottom: 15,
        right: 15,
        height: 65,
        width: 65,
        backgroundColor: '#6DA580',
        borderRadius: '50%',
        justifyContent: 'center',

        // iOS Shadow
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 4, // Blur radius of the shadow

        // Android Shadow
        elevation: 5, // Elevation for Android
    },
    addTaskButtonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});