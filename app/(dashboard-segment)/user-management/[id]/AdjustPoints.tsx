import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IAdminSingleUserResponse,
  IResponse,
} from "@/services/definitions/adminInterface";
import { useAdminUpdateUserPoint } from "@/services/hooks/useAdminHomeManagement";

interface _props {
  usersData: IResponse<IAdminSingleUserResponse> | undefined;
  user_id: string;
}

export default function AdjustPoints({ user_id, usersData }: _props) {
  const [newPoint, setNewPoint] = useState<number>();
  const { mutate: handleAdjustPoints, isPending } =
    useAdminUpdateUserPoint(user_id);

  return (
    <section className="bg-[#1E1E1E] rounded-[12px] py-[25px] px-[15px] space-y-[24px]">
      <h3>Adjust Points</h3>

      <Input
        type="number"
        inputMode="numeric"
        // placeholder={`+50 user current points = ${usersData?.data?.userPoint.totalPoints || 0}`}
        placeholder={`${usersData?.data?.userPoint.totalPoints || "+50"}`}
        value={newPoint}
        onChange={(e) => {
          const value = Number(e.target.value);
          // console.log(value);
          if (value < 0) {
            setNewPoint(0);
          } else {
            setNewPoint(value);
          }
        }}
        className="h-[43px]"
      />

      <Button
        type="button"
        size={"lg"}
        variant={"gradient"}
        className="w-full"
        onClick={() =>
          handleAdjustPoints(
            { user_id, payload: { points: newPoint || 0 } },
            {
              onSuccess: () => {
                setNewPoint(undefined);
              }
            }
          )
        }
        disabled={isPending}
      >
        Save
      </Button>
    </section>
  );
}
