import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import { removeNote } from '../store/noteSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const { notes } = useSelector(state => state.notes);
  const dispatch = useDispatch();
  var profileValues;

  const deleteNote = (noteId) => {
    dispatch(removeNote(noteId));
  };

  const goToNoteDetails = (note) => {
    navigation.navigate('Details', { note: note });
  };

  const showProfileData = async () => {
    try {
      const profileValue = await AsyncStorage.getItem('@profileUser');
      if (profileValue !== null) {
        profileValues = JSON.parse(profileValue);
        // console.log('Home profile: ', profileValues);
      } else {
        // console.log('Esta vacío.');
      }
      navigation.navigate('Profile', { profileValues });
    } catch (err) {
      console.log('Error in: ', err);
    }
  };

  // useEffect(() => { showProfileData(); });

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to Notes!</Text>

      {/* <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} /> */}

      <Button
        style={styles.buttonProfile}
        size="lg"
        onPress={() =>
          showProfileData()
        }
      >
        Go to profile
      </Button>

      <Button
        style={styles.buttonNote}
        size="lg"
        onPress={() =>
          navigation.navigate('Details')
        }
      >
        Add note
      </Button>
      <View style={styles.listContainer}>
        <FlatList
          data={notes}
          renderItem={({ item }) => <ListItem
            note={item}
            onNoteSelect={goToNoteDetails}
            onDelete={deleteNote}
          />}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
    marginBottom: 25,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
  },
  buttonProfile: {
    width: '95%',
    borderRadius: 15,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: 'darkblue',
  },
  buttonNote: {
    width: '95%',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'darkblue',
  },
});

export default Home;
