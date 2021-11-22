import { AddIcon, Box } from 'native-base';
import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route, navigation }) => {

  const [flagImg, setFlagImg] = React.useState(false);

  const selectedProfile = route.params?.profileValues;
  // console.log('SELECTEDPROFILE: ', selectedProfile);

  const [phone, setPhone] = React.useState(selectedProfile ? selectedProfile.phone : '');
  const [description, setDescription] = React.useState(selectedProfile ? selectedProfile.description : '');
  const [resourcePath, setResourcePath] = React.useState(selectedProfile ? selectedProfile.uri : {});

  const optionFlag = () => {
    if (selectedProfile) {
      setFlagImg(res => true);
      console.log('flag is true');
    } else {
      setFlagImg(res => false);
      console.log('flag is false');
    }
  };

  const selectFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, res => {
      // console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res.assets[0].uri;
        // console.log('launchImageLibrary SOURCE', source);
        setResourcePath(prev => source);
        // setFlagImg(data => false);
      }
    });
  };

  const handleSave = async () => {
    const profileId = 1;
    const newProfile = {
      id: profileId,
      phone: phone,
      description: description,
      uri: resourcePath,
    };
    let storeStringData = JSON.stringify(newProfile);

    try {
      await AsyncStorage.setItem('@profileUser', storeStringData);
    } catch (err) {
      console.log('Error in setItem: ', err);
    }

    navigation.goBack();
  };

  useEffect(() => { optionFlag(); });

  return (
    <ScrollView>

      {
        flagImg === true ?
        <Box position="relative" w="100%" h={200}>
          <Image source={{ uri: resourcePath }} style={styles.image} />
          <TouchableOpacity onPress={selectFile} style={styles.button}  >
            <AddIcon size="4" color="white" />
          </TouchableOpacity>
        </Box> :
        <Box position="relative" w="100%" h={200}>
          <Image source={{ uri: resourcePath.uri }} style={styles.image} />
          <TouchableOpacity onPress={selectFile} style={styles.button}  >
            <AddIcon size="4" color="white" />
          </TouchableOpacity>
        </Box>
      }

      {/* <Text style={styles.title}>{route.params.name}</Text> */}
      <Text style={styles.title}>Osvaldo</Text>

      <Text style={styles.caption}>Phone</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Phone number"
        keyboardType="numeric"
      />

      <Text style={styles.caption}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Something about you"
      />

      <Button onPress={handleSave} title="Update">
          Update
      </Button>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'cover',
    width: 140,
    height: 140,
    borderRadius: 999,
    alignSelf: 'center',
    backgroundColor: '#d2d2d2',
  },
  caption: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    marginLeft: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    padding: 10,
  },
  button: {
    position: 'absolute',
    width: 35,
    height: 35,
    left: '50%',
    bottom: 25,
    marginLeft: 30,
    borderRadius: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
});

export default Profile;
