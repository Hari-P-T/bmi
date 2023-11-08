import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [interpretation, setInterpretation] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const weightKg = parseFloat(weight);
      const heightCm = parseFloat(height);
      const heightM = heightCm / 100;
      const calculatedBMI = (weightKg / (heightM * heightM)).toFixed(2);

      setBMI(calculatedBMI);

      if (calculatedBMI < 18.5) {
        setInterpretation('Underweight');
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
        setInterpretation('Normal Weight');
      } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
        setInterpretation('Overweight');
      } else {
        setInterpretation('Obese');
      }
    } else {
      setBMI(null);
      setInterpretation('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BMI Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />
      <Button title="Calculate BMI" onPress={calculateBMI} />
      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>BMI: {bmi}</Text>
          <Text style={styles.interpretation}>Interpretation: {interpretation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  interpretation: {
    fontSize: 18,
  },
});
