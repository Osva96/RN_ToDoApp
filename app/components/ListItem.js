import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const ListItem = ({ note, onDelete, onNoteSelect }) => {

  return (
    <TouchableHighlight onPress={() => onNoteSelect(note)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{note.title}</Text>
        <Button
          title="Delete"
          color="#cf361e"
          onPress={() => onDelete(note.id)}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(67,84,96,0.15)',
  },
  itemText: {
    fontSize: 18,
  },
});

export default ListItem;
