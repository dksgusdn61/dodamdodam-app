import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useBridgeUi, Errors } from "@b1nd/aid-kit/bridge-kit/app";
import { FilledButton } from "@shared/ui";
import { typo } from "@shared/tokens";

export const QrScan = () => {
  const { setResult } = useBridgeUi();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = useCallback(({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setResult({ value: data });
  }, [scanned, setResult]);

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={[typo("Body1", "Medium"), styles.message]}>
          카메라 권한이 필요해요.
        </Text>
        {permission?.canAskAgain ? (
          <FilledButton size="large" onPress={requestPermission}>
            권한 허용하기
          </FilledButton>
        ) : (
          <Text style={[typo("Body2", "Regular"), styles.subMessage]}>
            설정에서 카메라 권한을 허용해주세요.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
      </View>
      <Text style={[typo("Body1", "Medium"), styles.guide]}>
        QR 코드를 화면 중앙에 맞춰주세요
      </Text>
    </View>
  );
};

const SCAN_SIZE = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
  },
  guide: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    color: "#fff",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  message: {
    color: "#333",
    textAlign: "center",
  },
  subMessage: {
    color: "#999",
    textAlign: "center",
  },
});
