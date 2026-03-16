import { useState, useCallback } from "react";

export const useAgreement = () => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const allChecked = privacyChecked && termsChecked;

  const toggleAll = useCallback(() => {
    const next = !(privacyChecked && termsChecked);
    setPrivacyChecked(next);
    setTermsChecked(next);
  }, [privacyChecked, termsChecked]);

  const togglePrivacy = useCallback(() => setPrivacyChecked((v) => !v), []);
  const toggleTerms = useCallback(() => setTermsChecked((v) => !v), []);

  return {
    privacyChecked,
    termsChecked,
    allChecked,
    toggleAll,
    togglePrivacy,
    toggleTerms,
  };
};
