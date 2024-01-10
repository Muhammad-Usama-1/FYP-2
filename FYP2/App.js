import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
  };

  const renderCamera = () => {
    if (isCameraOpen) {
      return (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              cameraProps: {
                ratio: '16:9', // Adjust the ratio to fit your desired size
              },
            }}
          />
        </View>
      );
    }
    return null;
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    setScanned(false);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setScanned(false);
    setScannedData(null);
  };

  const submitScannedData = () => {
    if (scannedData) {
      // Perform any action with the scanned data
      alert(`Submitted: ${scannedData.type} - ${scannedData.data}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the BlockChain Scanner App!</Text>
      <Text style={styles.paragraph}>Scan your  QR for Payment.</Text>
      {renderCamera()}
      {!isCameraOpen && (
        <TouchableOpacity style={styles.button} onPress={openCamera} disabled={scanned}>
          <Text style={styles.buttonText}>Open Camera to Scan</Text>
        </TouchableOpacity>
      )}
      {isCameraOpen && (
        <>
          <TouchableOpacity style={styles.button} onPress={closeCamera} disabled={!isCameraOpen}>
            <Text style={styles.buttonText}>Close Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={submitScannedData}
            disabled={!scanned || !scannedData}
          >
            <Text style={styles.buttonText}>Submit Scanned Data</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    // flex: 1,
    width: "100%",
    height: 500,
    // justifyContent: "center",
    // alignItems : "center"
    // ...StyleSheet.absoluteFillObject
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
