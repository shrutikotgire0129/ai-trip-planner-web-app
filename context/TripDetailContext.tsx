import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";

export type TripContextType = {
  tripDetailInfo: TripInfo | null;
  setTripDetailInfo: Dispatch<SetStateAction<TripInfo | null>>;
};

export const TripDetailContext = createContext<TripContextType | undefined>(undefined);