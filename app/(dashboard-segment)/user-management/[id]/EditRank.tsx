import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { IRankFilter } from '@/services/endpoints/dashboard/admin';
import { IAdminSingleUserResponse, IResponse } from '@/services/definitions/adminInterface';
import { useAdminUserEditRank } from '@/services/hooks/useAdminHomeManagement';


interface _props {
  usersData: IResponse<IAdminSingleUserResponse> | undefined;
  user_id: string;
}

export default function EditRank({ usersData, user_id }: _props) {
  // const [rank, setRank] = useState<IRankFilter | undefined>(usersData?.data?.userPoint?.current_tier as IRankFilter || undefined);
  const { mutate: editUserRank, isPending } = useAdminUserEditRank(user_id);

  return (
    <section className='bg-[#1E1E1E] rounded-[12px] py-[25px] px-[15px] space-y-[24px]'>
      <h3>Edit Rank</h3>

      <Select // defaultValue={usersData?.data?.userPoint?.current_tier}
        value={`${usersData?.data?.userPoint?.currentRank}`.trim().toLowerCase()}
        onValueChange={(value) => {
          editUserRank({ user_id, payload: { rank: value.trim() } });

          // setRank(value.trim() as IRankFilter);
        }}
      >
        <SelectTrigger className="w-full" style={{ background: "transparent", height: "43px" }}>
          <SelectValue placeholder="Update Rank" />
        </SelectTrigger>

        <SelectContent className='border-none'>
          {/* <SelectItem value=" ">All</SelectItem> */}
          <SelectItem value="water">Water</SelectItem>
          <SelectItem value="earth">Earth</SelectItem>
          <SelectItem value="air">Air</SelectItem>
          <SelectItem value="fire">Fire</SelectItem>
          <SelectItem value="metal">Metal</SelectItem>
          <SelectItem value="ice">Ice</SelectItem>
          <SelectItem value="lightning">Lightning</SelectItem>
          <SelectItem value="spirit">Spirit</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size={"lg"} variant={"outline"} className="w-full border-none"
        disabled={isPending}
      >
        Save
      </Button>
    </section>
  )
}
