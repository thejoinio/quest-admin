import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IAdminSingleUserResponse, IResponse } from '@/services/definitions/adminInterface';
import { useAdminUserActions } from '@/services/hooks/useAdminHomeManagement';


interface _props {
  usersData: IResponse<IAdminSingleUserResponse> | undefined;
  user_id: string;
}

export default function AdminAction({ user_id }: _props) {
  const [action, setAction] = useState<string>();
  const { mutate: handleAdminAction, isPending } = useAdminUserActions(user_id);

  return (
    <section className='bg-[#1E1E1E] rounded-[12px] py-[25px] px-[15px] space-y-[24px]'>
      <h3>Admin Action</h3>

      <Select // defaultValue='ban-user'
        value={action}
        onValueChange={(value) => {
          setAction(value);
        }}
      >
        <SelectTrigger className="w-full" style={{ background: "transparent", height: "43px" }}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent className='border-none'>
          <SelectItem value="ban user">Ban user</SelectItem>
          <SelectItem value="delete">Delete user</SelectItem>
          <SelectItem value="kol">Upgrade User to KOL or Ambassador</SelectItem>
          <SelectItem value="regular">Downgrade to regular user</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size={"lg"} variant={"outline-gradient"} className="w-full"
        onClick={() => {
          handleAdminAction(
            { user_id, payload: { action: action || '' } },
            {
              onSuccess: () => {
                setAction(undefined);
              }
            }
          )
        }}
        disabled={isPending || !action}
      >
        Submit
      </Button>
    </section>
  )
}
