import { View, TextInput, StyleSheet, Text, Image, Button, Animated, Easing } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef } from 'react';

export default function CardInputScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardProvider, setCardProvider] = useState('visa');
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const getCardProvider = (number: string): string => {
    if (/^4/.test(number)) return 'visa';
    if (/^(34|37)/.test(number)) return 'amex';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^6011/.test(number)) return 'discover';
    if (/^9792/.test(number)) return 'troy';
    return 'visa'; // default type
  };

  const handleCardNumberChange = (number: string) => {
    const provider = getCardProvider(number);
    setCardProvider(provider);
    setCardNumber(number);
  };

  const formatCardNumber = () => {
    const number = cardNumber.replace(/\D/g, '');
    let formattedNumber = '';
    
    if (cardProvider === 'amex') {
      for (let i = 0; i < 15; i++) {
        if (i === 4 || i === 10) {
          formattedNumber += ' ';
        }
        formattedNumber += i < number.length ? number[i] : '#';
      }
    } else {
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedNumber += ' ';
        }
        formattedNumber += i < number.length ? number[i] : '#';
      }
    }

    return formattedNumber;
  };


  const maxLength = cardProvider === 'amex' ? 15 : 16;

  const formatCardHolder = () => {
    // If no name is entered, return placeholder
    return cardHolder || 'FULL NAME';
  };

  const formatExpirationDate = () => {
    const month = selectedMonth || 'MM';
    const year = selectedYear ? selectedYear.slice(-2) : 'YY'; // Extract last 2 digits of the year
    return `${month}/${year}`;
  };

  const formatCVV = () => {
    // If no name is entered, return placeholder
    return cvv || 'CVV';
  };

  const getCardLogo = () => {
    switch (cardProvider) {
      case 'amex':
        return require('../../assets/images/amex.png');
      case 'mastercard':
        return require('../../assets/images/mastercard.png');
      case 'discover':
        return require('../../assets/images/discover.png');
      case 'troy':
        return require('../../assets/images/troy.png');
      default:
        return require('../../assets/images/visa.png');
    }
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setIsFlipped(true);
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setIsFlipped(false);
  };

  const interpolateFlip = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const scaleX = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1], 
  });

  const flipStyle = {
    transform: [{ rotateY: interpolateFlip }, { scaleX: scaleX },],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageWrapper, flipStyle]}>
        {!isFlipped ? (
          <>
            <Image source={require('../../assets/images/25.jpeg')} style={styles.cardImage} />
            <Image source={require('../../assets/images/chip.png')} style={styles.chip} />
            {/* Card Number */}
            <Text style={styles.cardNumber}>{formatCardNumber()}</Text>
            {/* Card Holder */}
            <Text style={styles.cardHolderTitle}>Card Holder</Text>
            <Text style={styles.cardHolderName}>{formatCardHolder()}</Text>
            {/* Expiration Date */}
            <Text style={styles.expirationTitle}>Expires</Text>
            <Text style={styles.expirationDate}>{formatExpirationDate()}</Text>
            {/* Logo */}
            <Image source={getCardLogo()} style={styles.cardLogo} />
          </>
        ) : (
          <>
          <Image source={require('../../assets/images/25.jpeg')} style={styles.cardImage} />
          <View style={styles.whiteStripe}>
            <Text style={styles.cvvText}>{formatCVV()}</Text>
          </View>
          <View style={styles.magnetStripe}></View>
          </>
        )}
      </Animated.View>

      {/* Card Number input */}
      <View style={styles.whiteContainer}>
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder={'1234 5678 9012 3456'}
        value={cardNumber}
        maxLength={maxLength}
        onChangeText={handleCardNumberChange}
      />

      {/* Card Holder Input */}
      <Text style={styles.label}>Card Holder</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={cardHolder}
        onChangeText={setCardHolder}
      />

      {/* Expiration date input */}
      <Text style={styles.label}>Expiration Date</Text>
      <View style={styles.expirationContainer}>
        {/* Month Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            dropdownIconColor="#ccc"
            mode="dropdown"
          >
            {selectedMonth === '' && <Picker.Item label="Month" value="" enabled={false} />}
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, '0');
              return <Picker.Item key={month} label={month} value={month} />;
            })}
          </Picker>
        </View>

        {/* Year Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            dropdownIconColor="#ccc"
            mode="dropdown"
          >
            {selectedYear === '' && <Picker.Item label="Year" value="" enabled={false} />}
            {Array.from({ length: 11 }, (_, i) => {
              const year = (2024 + i).toString();
              return <Picker.Item key={year} label={year} value={year} />;
            })}
          </Picker>
        </View>
      </View>

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="123"
        keyboardType="numeric"
        maxLength={3}
        secureTextEntry
        onFocus={flipToBack}
        onBlur={flipToFront}
        value={cvv}
        onChangeText={setCvv}
      />

      <Button
        title="Submit"
        color="#c90808"
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfbfbf',
  },

  whiteContainer: {
    backgroundColor: '#fff', // Vit bakgrund
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 30,
    paddingTop: 120,
    width: '100%',
    marginTop: -120, // Flyttar upp sektionen
    flex: 1,
  },

  //card image
  imageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    marginLeft: 20,
    marginTop: 70,
    width: '90%',
    height: 230,
    position: 'relative',
    zIndex: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chip: {
    position: 'absolute',
    top: 20, 
    left: 20, 
    width: 55, 
    height: 45, 
    resizeMode: 'contain',
  },

  //Logo
  cardLogo: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 50,
    width: 80,
    resizeMode: 'contain',
  },

  //Card number
  cardNumber: {
    position: 'absolute',
    top: '50%', 
    left: 20,
    transform: [{ translateY: -10 }], // Center text vertically
    fontSize: 24,
    letterSpacing: 4,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Card holder
  cardHolderTitle: {
    position: 'absolute',
    bottom: 60, 
    left: 20,
    fontSize: 14,
    color: '#c7c5c5',
    fontWeight: 'normal',
  },
  cardHolderName: {
    position: 'absolute',
    bottom: 40, 
    left: 20,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  //Expiration date
  expirationTitle: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    fontSize: 16,
    color: '#c7c5c5',
    fontWeight: 'normal',
  },
  expirationDate: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Back card styles
  cardBack: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  magnetStripe: {
    position: 'absolute',
    top: '14%', 
    left: 0,
    width: '100%',
    height: 43, 
    backgroundColor: '#171717', 
    justifyContent: 'center',
  },
  whiteStripe: {
    position: 'absolute',
    top: '50%', 
    left: 20,
    width: '90%',
    height: 40, 
    backgroundColor: '#fff',
    borderTopWidth: 2, 
    borderTopColor: '#ccc', 
    justifyContent: 'center',
    paddingRight: 15, 
    alignItems: 'flex-end', 
  },
  cvvText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'normal',
  },

  //Input fields
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  //Expiration date drop down menus
  expirationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
},
  picker: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    fontSize: 3,
  },
});
