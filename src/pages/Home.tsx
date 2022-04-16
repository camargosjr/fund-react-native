import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const found = tasks.find(task => task.title === newTaskTitle)
    if (found){
      Alert.alert("Task já cadastrada")
      return;
    } 
    const task={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks,task])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    
    const upadatedTasks = tasks.map(function(task){
      if (task.id == id){
        task.done = true
      }
      return task;
    });
    setTasks(upadatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert("Remover Item","Tem certeza que deseja remover esse item?",[
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: ()=> {
          const updateTasks = tasks.filter(function(task){
            return task.id != id;
          });
      
          setTasks(updateTasks)
        }
      }
    ]);
   
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updateTasks = tasks.map(function(task){
      if (task.id == taskId){
        task.title = taskNewTitle
      } 
      return task;
    });

    setTasks(updateTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask = {handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})