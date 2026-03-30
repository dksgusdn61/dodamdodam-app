import { useState, useCallback } from "react";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { userApi } from "@entities/user/api";
import { userQueryKeys } from "@entities/user/api/queryKeys";
import { authApi } from "@entities/auth/api";
import { fileApi } from "@entities/file/api";
import { toast } from "@shared/ui";
import type { User } from "@entities/user/types";
import { hasProfileChanges, getOriginalValues } from "../utils/hasProfileChanges";

const fetchMe = async (): Promise<User> => {
  const { data } = await userApi.getMe();
  return data.data;
};

const buildUpdatedUser = (
  prev: User,
  form: { name: string; phone: string; profileImage: string | null },
  student: { grade: string; room: string; number: string } | null,
  teacher: { position: string } | null,
): User => ({
  ...prev,
  ...form,
  student: student
    ? { grade: Number(student.grade), room: Number(student.room), number: Number(student.number) }
    : prev.student,
  teacher: teacher ?? prev.teacher,
});

export const useEditProfile = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { data: user } = useSuspenseQuery({
    queryKey: userQueryKeys.me,
    queryFn: fetchMe,
  });

  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [profileImageUri, setProfileImageUri] = useState<string | null>(user.profileImage);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(user.profileImage);
  const [grade, setGrade] = useState(user.student?.grade.toString() ?? "");
  const [room, setRoom] = useState(user.student?.room.toString() ?? "");
  const [number, setNumber] = useState(user.student?.number.toString() ?? "");
  const [position, setPosition] = useState(user.teacher?.position ?? "");
  const [sendingCode, setSendingCode] = useState(false);

  const isStudent = user.roles?.includes("STUDENT") ?? false;
  const isTeacher = user.roles?.includes("TEACHER") ?? false;
  const isPhoneChanged = phone !== (user.phone ?? "");

  const uploadMutation = useMutation({
    mutationFn: async (asset: ImagePicker.ImagePickerAsset) => {
      const { data } = await fileApi.upload(
        asset.uri,
        asset.fileName ?? "profile.jpg",
        asset.mimeType ?? "image/jpeg",
      );
      return data.data;
    },
    onSuccess: (result) => setUploadedImageUrl(result.url),
    onError: () => toast.error("이미지 업로드에 실패했어요", { position: "top" }),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const orig = getOriginalValues(user);
      const requests: Promise<unknown>[] = [];

      if (name !== orig.name || phone !== orig.phone || uploadedImageUrl !== orig.profileImage) {
        requests.push(userApi.updateMe({
          name: name !== orig.name ? name : null,
          phone: phone !== orig.phone ? phone : null,
          profileImage: uploadedImageUrl !== orig.profileImage ? uploadedImageUrl : null,
        }));
      }
      if (isStudent && (grade !== orig.grade || room !== orig.room || number !== orig.number)) {
        requests.push(userApi.updateStudent({ grade: Number(grade), room: Number(room), number: Number(number) }));
      }
      if (isTeacher && position !== orig.position) {
        requests.push(userApi.updateTeacher({ position }));
      }

      await Promise.all(requests);
    },
    onSuccess: () => {
      queryClient.setQueryData<User>(userQueryKeys.me, (prev) => {
        if (!prev) return prev;
        return buildUpdatedUser(
          prev,
          { name, phone, profileImage: uploadedImageUrl || null },
          isStudent ? { grade, room, number } : null,
          isTeacher ? { position } : null,
        );
      });
      toast.success("수정되었어요", { position: "top" });
      onSuccess();
    },
    onError: () => toast.error("수정에 실패했어요", { position: "top" }),
  });

  const pickFromAlbum = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImageUri(result.assets[0].uri);
      uploadMutation.mutate(result.assets[0]);
    }
  }, [uploadMutation]);

  const resetToDefault = useCallback(() => {
    setProfileImageUri(null);
    setUploadedImageUrl("");
  }, []);

  const sendVerificationCode = useCallback(async () => {
    if (sendingCode) return;
    setSendingCode(true);
    try {
      await authApi.requestPhoneVerification(phone);
      toast.success("인증코드가 전송되었어요.", { position: "top" });
      return true;
    } catch {
      toast.error("인증코드 전송에 실패했어요.", { position: "top" });
      return false;
    } finally {
      setSendingCode(false);
    }
  }, [sendingCode, phone]);

  const submitUpdate = useCallback(() => updateMutation.mutate(), [updateMutation]);

  return {
    isStudent,
    isTeacher,
    isPhoneChanged,
    profileImageUri,
    name, setName,
    phone, setPhone,
    grade, setGrade,
    room, setRoom,
    number, setNumber,
    position, setPosition,
    pickFromAlbum,
    resetToDefault,
    sendVerificationCode,
    submitUpdate,
    isSaving: uploadMutation.isPending || updateMutation.isPending,
    isSendingCode: sendingCode,
    hasChanges: hasProfileChanges(user, { name, phone, uploadedImageUrl, grade, room, number, position }, isStudent, isTeacher),
  };
};