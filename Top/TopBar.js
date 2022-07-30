import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';


const MyComponent = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={styles.topbar}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Title" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
    topbar: {
        backgroundColor:'#88e8ed'

    },
})
export default MyComponent;