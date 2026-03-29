import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { authApi } from "@entities/auth/api";
import { Dialog } from "./Dialog";
import { FilledTextField } from "../textfield";
import { FilledButton } from "../buttons";
import { TextButton } from "../buttons";
import { toast } from "../toast";

interface VerifyCodeDialogProps {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
  setDimClickHandler: (handler: () => void) => void;
  phone: string;
  onVerified: () => void;
}

export const VerifyCodeDialog = ({
  isOpen,
  close,
  exit,
  setDimClickHandler,
  phone,
  onVerified,
}: VerifyCodeDialogProps) => {
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleCodeChange = useCallback((text: string) => {
    setCode(text.replace(/[^0-9]/g, "").slice(0, 6));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (verifying) return;
    setVerifying(true);
    try {
      await authApi.confirmPhoneVerification(phone, code);
      onVerified();
    } catch {
      toast.error("인증코드가 올바르지 않아요.", { position: "top" });
    } finally {
      setVerifying(false);
    }
  }, [phone, code, verifying, onVerified]);

  return (
    <Dialog
      open={isOpen}
      title="인증코드 입력"
      description="전송된 인증코드를 입력해주세요"
      closeOnDimmerClick
      onClose={close}
      onExited={exit}
      setDimClickHandler={setDimClickHandler}
    >
      <View style={styles.content}>
        <FilledTextField
          type="text"
          placeholder="인증코드 6자리"
          value={code}
          onChangeText={handleCodeChange}
          keyboardType="number-pad"
        />
        <View style={styles.buttons}>
          <TextButton size="large" onPress={close}>
            취소
          </TextButton>
          <FilledButton
            size="large"
            disabled={code.length !== 6}
            isLoading={verifying}
            onPress={handleConfirm}
          >
            확인
          </FilledButton>
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    gap: 16,
    marginTop: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
