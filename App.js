
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
  
  const switchType = (name) => {              //Method to select STANDARD or METRIC
    if(name === 'metric') {
      setStandard(false)
    } else {
      setStandard(true)
    }
    setInputs({
      height: null, weight: null, height_in: null
    })

    setBmi(0)
  }

  const changeInput = (e, name) => {          //Method to Set input values
    setInputs({
      ...inputs, [name]: e
    })

  }
  const bmiResult = () =>
  {
    if(bmi>0 && bmi<=18.5 )
    {
      return (
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#43464b' }}>
        Your Bmi is  {bmi.toFixed(2)} {"\n"}  You fall in the interval of "Underweight"
      </Text>
      )
    }

    else if (bmi>18.5 && bmi<=24.9 )
    {
      return (
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#43464b' }}>
        Your Bmi is {bmi.toFixed(2)} {"\n"}  You fall in the interval of "Normal weight"
      </Text>
      )
    }

    else if (bmi>24.9 && bmi<=29.9)
    {
      return (
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#43464b' }}>
        Your Bmi is {bmi.toFixed(2)} {"\n"} You fall in the interval of "Overweight"
      </Text>
      )
    }
    else if (bmi>29.9)
    {
      return (
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#43464b' }}>
        Your Bmi is  {bmi.toFixed(2)} {"\n"} You fall in the interval of "Obese"
      </Text>
      )
  }
}

  

  // Destructuring
  const { height, weight, height_in } = inputs;

  const calculateBmi = () => {                  //Method to calulate BMI 
    let calculated = 0;
    if(standard) 
    {
      
      const h_in = parseFloat(height_in);
      const h = parseFloat(height) * 12;
      const total = h + h_in;
      console.log(h , h_in, 'check value', weight, weight / (total * total), total)
      calculated = (weight / (total * total))
      calculated = calculated * 703;
      console.log(calculated, 'calculated')
    } 
    else 
    {
      const h = height / 100;
      calculated = weight / (h * h);
    }
     
    console.log(calculated, 'bmi')
    setBmi(calculated)
  }

  return (                              //Designing the views
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{...styles.mainContainer, 
    backgroundColor: standard ? '#43464b' : '#c1c3c4', }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
      <View style={styles.tab}>
                                      {/* Designing the standard tab button and applying styles*/}
        <TouchableOpacity onPress={() => switchType('standard')} style={standard ? styles.activeTabStyle : styles.tabStyle}>
          <Text style={standard ? styles.activeTextStyle : styles.textStyle}>
            Standard
          </Text>
        </TouchableOpacity>
                                      {/* Designing the Metric tab button and applying styles*/}
        <TouchableOpacity onPress={() => switchType('metric')} style={!standard ? styles.activeTabStyle : styles.tabStyle}>
          <Text style={!standard ? styles.activeTextStyle : styles.textStyle}>
            Metric
          </Text>
        </TouchableOpacity>
      </View>
                                        {/* Designing the input fields and applying styles*/}
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
                                        {/*Calculate button*/} 
        <TouchableOpacity style={styles.btnStyle} onPress={calculateBmi}>
          <Text style={styles.activeTextStyle}>
            Calculate !
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 15, alignItems: 'center' }}>
      {bmi > 0 && (
      bmiResult()
    )}
    
    </View>
    </View>
    
    </View>
    </SafeAreaView>
  );
}
//Styles that are used in conjunction with views

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