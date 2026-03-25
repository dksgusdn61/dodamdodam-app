import type { User } from "@entities/user/types";

export interface ProfileFormValues {
  name: string;
  phone: string;
  uploadedImageUrl: string | null;
  grade: string;
  room: string;
  number: string;
  position: string;
}

export const getOriginalValues = (user: User) => ({
  name: user.name ?? "",
  phone: user.phone ?? "",
  profileImage: user.profileImage,
  grade: user.student?.grade.toString() ?? "",
  room: user.student?.room.toString() ?? "",
  number: user.student?.number.toString() ?? "",
  position: user.teacher?.position ?? "",
});

export const hasProfileChanges = (
  user: User,
  form: ProfileFormValues,
  isStudent: boolean,
  isTeacher: boolean,
): boolean => {
  const orig = getOriginalValues(user);

  if (form.name !== orig.name) return true;
  if (form.phone !== orig.phone) return true;
  if (form.uploadedImageUrl !== orig.profileImage) return true;

  if (isStudent) {
    if (form.grade !== orig.grade || form.room !== orig.room || form.number !== orig.number) return true;
  }

  if (isTeacher) {
    if (form.position !== orig.position) return true;
  }

  return false;
};
