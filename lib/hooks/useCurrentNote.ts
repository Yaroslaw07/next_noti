import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const useCurrentNote = () => {
  const { note, status } = useSelector((state: RootState) => state.currentNote);

  return { note, status };
};

export default useCurrentNote;
