import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TaskList from '@/components/TaskList';
import AboutMePopupButton from '@/components/AboutMePopupButton';
import AboutMeWindow from '@/components/AboutMeWindow';
import { useState } from 'react';



export default function App() {
    const [ showWindow, setShowWindow ] = useState(false); // only used for the About Me window

    return (
        <SafeAreaProvider style={styles.safeAreaProvider}>
            <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                <TaskList />
                <AboutMePopupButton setShowWindow={setShowWindow} />
                <AboutMeWindow showWindow={showWindow} setShowWindow={setShowWindow} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: 'red'
    },
    safeAreaProvider: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
});