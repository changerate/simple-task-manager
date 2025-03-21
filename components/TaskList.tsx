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
import Task from './ListItem';
import { useEffect, useState, useRef } from 'react';




interface TaskItemProps {
    name: string;
    status: '1' | '2';
    id: number;
    bgColor: string
}




export default function TaskList() {

    // Lists and Data
    // ===========================================

    const bgColorOpenTask = "#E4EFFF";
    const bgColorDoneTask = "#F1F6EB";

    const [taskList, setTaskList] = useState<TaskItemProps[]>([
        {
            name: 'This is your first task! Try marking it as complete or swiping to delete it.',
            status: '1',
            id: 1,
            bgColor: bgColorOpenTask,
        }
    ]);

    const textInputRef = useRef<TextInput>(null); // Create a ref for the TextInput


    // Debugging
    useEffect(() => {
        console.log("Updated Open task list: ", taskList);
    }, [taskList]);



    /**
     * Add a task to the list by updating the taskList state and
     * assigning the current time as the ID.
     * Check for tasks that are blank (either just spaces or not defined).
     * @param text 
     */
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
            const newTask: TaskItemProps = {
                name: text,
                status: '1',
                id: Date.now(),
                bgColor: bgColorOpenTask,
            };

            // add new task to list
            setTaskList([newTask, ...taskList]);

            // Clear the TextInput using the ref
            if (textInputRef.current) {
                textInputRef.current.clear();
            }
        }
    };



    /**
     * This function handles the click abstraction from the ListItem component.
     * The purpose is to abstract the TaskItemProps away and only provide access to the types of clicks.
     * @param task (type TaskProps)
     * @param typeOfClick 
     */
    const handleTaskClick = (task: TaskItemProps, typeOfClick: string) => {
        console.log("Task clicked!");

        if (typeOfClick == 'checkedBox') {
            setTaskList((prevTaskList) => {
                const updatedTaskList = prevTaskList.map((eachTask) =>
                    eachTask.id === task.id
                        ? { ...eachTask, 
                            status: task.status === '1' ? '2' as '1' | '2' : '1' as '1' | '2',
                            bgColor: task.status === '1' ? bgColorDoneTask : bgColorOpenTask,
                        }
                        : eachTask
                );

                const allOpenTasksArray = updatedTaskList
                    .filter((eachTask) => eachTask.status === '1')
                    .sort((a, b) => b.id - a.id);
                const allDoneTasksArray = updatedTaskList
                    .filter((eachTask) => eachTask.status === '2')
                    .sort((a, b) => b.id - a.id);

                console.log(allOpenTasksArray);
                console.log(allDoneTasksArray);

                const sortedTaskList = [...allOpenTasksArray, ...allDoneTasksArray];

                return sortedTaskList;
            });
        }

        else if (typeOfClick == 'delete') {
            setTaskList((prevTaskList) => prevTaskList.filter((eachTask) => eachTask.id !== task.id))
        }

        else { console.log(typeOfClick, " this click type has not been handled correctly yet!") };
    }



    /**
     * Render each item in the flatlist by passing the properties to the ListItem component.
     * @param param0 
     * @returns 
     */
    const renderItem = ({ item }: { item: TaskItemProps }) => {
        return (
            <Task
                listItem={item}
                onClick={handleTaskClick}
            />
        );
    };




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
                    ref={textInputRef}
                    placeholderTextColor="black"
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
        backgroundColor: '#F9F9F9',
        maxWidth: Platform.select({ web: 600 }),
        width: Platform.select({ web: 500 }),
        marginHorizontal: Platform.select({ web: 'auto' })
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