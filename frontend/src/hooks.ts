import { useSelector, useDispatch } from "react-redux";
// store
import { RootState, AppDispatch } from "./store";

// app selector
export const useAppSelector = useSelector.withTypes<RootState>();
// app dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
