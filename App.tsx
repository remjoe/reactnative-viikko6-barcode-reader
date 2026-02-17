import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { setStatusBarTranslucent } from 'expo-status-bar';

export default function App() {
  const [permission, requestPermissions] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [barcode, setBarcode] = useState<BarcodeScanningResult | null>(null);

  if (!permission) {
    return (
      <View />
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need permission to view your camera</Text>
        <Button onPress={requestPermissions}>Grant permission</Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera} facing={facing} 
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8']
        }}
        onBarcodeScanned={newBarcode => setBarcode(newBarcode)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{!barcode ? 'Please read a barcode' : barcode.data}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1
  },
  textContainer: {
    position: 'absolute',
    bottom: 60,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 15,
    left: '50%',
    transform: [{translateX:-100}]
  },
  text: {
    textAlign: 'center'
  }
});