
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

 const App = () => {
  // States
  const [ standard, setStandard ] = useState(true);
  const [ inputs, setInputs ] = useState({
    height: null, weight: null, height_in: null
  });
  const [ bmi, setBmi ] = useState(0);

  // Methods
  const switchType = (name) => {
    if(name === 'metric') {
      setStandard(false)
    } else {
      setStandard(true)
    }
    setInputs({
      height: null, weight: null, height_in: null
    })
  }

  const changeInput = (e, name) => {
    setInputs({
      ...inputs, [name]: e
    })
  }

  

  // Destructuring
  const { height, weight, height_in } = inputs;

  const calculateBmi = () => {
    let calculated = 0;
    if(standard) {
      const h_in = parseFloat(height_in);
      const h = parseFloat(height) * 12;
      const total = h + h_in;
      console.log(h , h_in, 'check value', weight, weight / (total * total), total)
      calculated = (weight / (total * total))
      calculated = calculated * 703;
      console.log(calculated, 'calculated')
    } else {
      const h = height / 100;
      calculated = weight / (h * h);
    }
     
    console.log(calculated, 'bmi')
    setBmi(calculated)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{...styles.mainContainer, 
    backgroundColor: standard ? '#43464b' : '#c1c3c4', }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => switchType('standard')} style={standard ? styles.activeTabStyle : styles.tabStyle}>
          <Text style={standard ? styles.activeTextStyle : styles.textStyle}>
            Standard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => switchType('metric')} style={!standard ? styles.activeTabStyle : styles.tabStyle}>
          <Text style={!standard ? styles.activeTextStyle : styles.textStyle}>
            Metric
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <TextInput keyboardType='number-pad' name='weight' value={weight} onChangeText={(e) => changeInput(e, 'weight')} placeholder={'Your Weight in' + (!standard ? '  KG' : '  lb')} style={styles.inputStyle} />
        </View>
        <View style={styles.inputField}>
          <TextInput keyboardType='number-pad' name='height' value={height} onChangeText={(e) => changeInput(e, 'height')} placeholder={'Your Height in' + (!standard ? '  Cm' : '  Feet')} style={styles.inputStyle} />
        </View>
        {standard && (
           <View style={styles.inputField}>
           <TextInput keyboardType='number-pad' name='height_in' value={height_in} onChangeText={(e) => changeInput(e, 'height_in')} placeholder={'Your Height in' + (!standard ? '  Cm' : '  In')} style={styles.inputStyle} />
         </View>
        )}
       
        <TouchableOpacity style={styles.btnStyle} onPress={calculateBmi}>
          <Text style={styles.activeTextStyle}>
            Calculate !
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 15, alignItems: 'center' }}>
      {bmi > 0 && (
      <Text style={{ textAlign: 'center', fontSize: 25, color: '#43464b' }}>
        Your Bmi is {"\n"} {bmi.toFixed(2)}
      </Text>
    )}
    </View>
    </View>
    
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  tab: {
    flexDirection: 'row'
  },
  tabStyle: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 6,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    marginVertical: 10
  },
  activeTabStyle: {
    flex: 1,
    backgroundColor: '#43464b',
    elevation: 6,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    marginVertical: 10
  },
  textStyle: {
    fontSize: 15,
    color: 'black'
  },
  activeTextStyle: {
    color: 'white',
    fontSize: 18
  },
  inputContainer: {
    marginHorizontal: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 15,
    flex: 1
  },
  inputField: {
  marginVertical: 13
  },
  inputStyle: {
    borderBottomColor: 'blue',
    borderBottomWidth: 0.5,
  },
  btnStyle: {
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: '#43464b',
    elevation: 10
  }
});

export default App