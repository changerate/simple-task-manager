import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TaskList from '@/components/TaskList';



export default function App() {
    return (
        <SafeAreaProvider style={styles.safeArea}>
            <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                <TaskList />
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
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
});