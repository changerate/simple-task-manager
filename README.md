# Welcome to The Simple Task Manager ☑️

Demo: https://drive.google.com/file/d/1eUromCpqt-Zlpq_LHXZQGUcji4f2NLMJ/view?usp=sharing

## 🗒️ Overview 

This app was created with React Native and Expo Routes as a tech screening for an internship. 

The basic idea behind this app is that it allows users to keep track of tasks, see what they've completed, as well as delete tasks. 

The primary focus of this app is frontend development, user interaction, and state management. 

*The Basic Features:* 
- Add Task: Users can add a new task with a brief description.
- Mark Task as Complete: Users can mark tasks as complete, which visually distinguishes them from incomplete tasks.
- Delete Task: Users can delete a task from the list.
- Task List: Display all tasks in a list view, showing both complete and incomplete tasks.

## ⭐️ Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## 🗺️ Things I would change going forward 

If I were to make this a full fledged (but still simple) task manager, I would want to give the user the ability to hide completed tasks, as well as *edit existing tasks*.

I would also like to change the sorting algorithm. Right now, whenever a task is marked as complete or marked as open, the entire list is split into two arrays, sorted by date, then put back into the taskList. I think that this is very inefficient and needs a redo. 

For a full list of things that I would like to add to this app, checkout my developer notes: [devNotes.md](./devNotes.md).
