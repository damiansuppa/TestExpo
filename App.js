import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  Switch,
  Button,
  ActivityIndicator,
} from 'react-native';
import pokemonList from './pokemonList';


const App = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState(pokemonList);

  const handleSearchChange = text => {
    setSearch(text);

    if (text === '') {
      setPokemons(pokemonList);
    }

    const filter = pokemonList.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase()),
    );

    setPokemons(filter);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainerStyle}>
        <Image
          source={require('./assets/pokeapi_256.png')}
          style={styles.image}
        />
        <View style={styles.container}>
          <Text>desacticar busqueda</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    </View>
    <View style={{flexDirection: "row"}}>    
      <View>
      <TextInput
          style={styles.input}
          onChangeText={handleSearchChange}
          value={search}
          placeholder="Ingresa el nombre del pokemon"
        /></View>
      <View>
        <Button
        title="Left button"
        onPress={() => Alert.alert('adsads')}
        /></View>
        <ActivityIndicator/>
      </View>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.pokemonListContainer}>
          {pokemons.length > 0 ? (
            pokemons.map(pokemon => (
              <View key={pokemon.name} style={styles.pokemonItem}>
                <Image
                  source={{ uri: pokemon.url }}
                  style={styles.pokemonImage}
                />
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
              </View>
            ))
          ) : (
            <>
              <Text style={styles.error}>
                No se pudo encontrar ningun Pokemon con el nombre:{' '}
              </Text>
              <Text style={styles.nombre}>{search}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flexGrow: 1 },
  contentContainerStyle: {
    paddingVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: '100%',
    marginVertical: 20,
  },
  image: {
    marginVertical: 10,
  },
  pokemonListContainer: {
    width: '100%',
  },
  pokemonImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#c71e1e',
    backgroundColor: 'yellow',
  },
  pokemonItem: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pokemonName: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
  },
  nombre: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default App;