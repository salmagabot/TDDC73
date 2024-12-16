import { Text, View, Button, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

export default function Index() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "seagreen", padding: 15 }}>
        <Text style={{ fontSize: 25, color: "white" }}>Lab1: React Native</Text>
      </View>

      <Image
         source={require('@/assets/images/circle.png')}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginTop: 30,
        }}
      />

<View style={{ alignItems: "center", marginTop: 30 }}>
      {/* First row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>

      {/* Second row */}
      <View style={[styles.row, { marginTop: 20 }]}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 30,
      }}
    >
      <Text style={{ fontSize: 20, color: "black", flex: 1 }}>Email</Text>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : styles.inputUnfocused,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Enter your email"
      />
    </View>
    </SafeAreaView>
  );

}
//styling
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  button: {
    margin: 20,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  input: {
    flex: 2,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    borderWidth: 2, // Border thickness
  },
  inputFocused: {
    borderColor: "pink", // Border color when focused
  },
  inputUnfocused: {
    borderColor: "gray", // Border color when not focused
  },
});

