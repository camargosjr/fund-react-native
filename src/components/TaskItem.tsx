import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

type task = {
  id: number;
  title: string;
  done: boolean;
}
interface TaskItemProps {
  index: number;
  item: task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }
  function handleCancelEditing() {
    setTitleEdit(item.title)
    setIsEditing(false)
  }
  function handleSubmitEditing() {
    editTask(item.id, titleEdit)
    setIsEditing(false)
  }
  useEffect(function () {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          //TODO - use style prop 
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={titleEdit}
            onChangeText={setTitleEdit}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />


        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {isEditing ? 
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{paddingHorizontal: 20}}
          >
            <Icon name="x" size={24} color="#B2B2B2"/>
          </TouchableOpacity>

        : <TouchableOpacity
            onPress={handleStartEditing}
            style={{paddingHorizontal: 20}}
          >
            <Image source={editIcon}/>
          </TouchableOpacity>
        }

        <View style={styles.iconsDivider}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 20 }}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}} />
        </TouchableOpacity>

      </View>

    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2ddaa',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },

  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196,196,196,0.24)',
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center"
  }

});