import { useState, useCallback, useMemo } from "react";
import type { StudentMember } from "./useNightStudyForm";


export const useStudentSelection = (initial: StudentMember[]) => {
  const [members, setMembers] = useState<StudentMember[]>(initial);
  const [search, setSearch] = useState("");

  const ids = useMemo(() => new Set(members.map((s) => s.id)), [members]);

  const toggle = useCallback((student: StudentMember) => {
    setMembers((prev) =>
      prev.some((s) => s.id === student.id)
        ? prev.filter((s) => s.id !== student.id)
        : [...prev, student],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setMembers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const reset = useCallback((next: StudentMember[]) => {
    setMembers(next);
    setSearch("");
  }, []);

  return { members, ids, search, setSearch, toggle, remove, reset };
};