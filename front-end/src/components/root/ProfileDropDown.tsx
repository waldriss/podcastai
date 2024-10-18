import React, { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { useChangeProfileImage } from "@/lib/api/react-query/mutations";
import { useToast } from "@/hooks/use-toast";

const ProfileDropDown = () => {
  const { signOut } = useAuth();
  const imageRef = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();
  const { mutateAsync: changeProfileImage } = useChangeProfileImage(getToken);
  const { toast } = useToast();
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      await changeProfileImage({ imageUrl });
      toast({
        title: "Profile Image uploaded successfully",
      });
    } catch (error) {
      toast({ title: "Error Uploading Profile Image", variant: "destructive" });
    }
  };

  return (
    <>
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        ref={imageRef}
        onChange={(e) => uploadImage(e)}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 30 29"
            fill="none"
          >
            <path
              d="M15 5.86276L15 5.87449L15 5.86276ZM15 14.0706L15 14.0824L15 14.0706ZM15 22.2785L15 22.2902L15 22.2785ZM15 7.03531C14.6685 7.03531 14.3505 6.91178 14.1161 6.69188C13.8817 6.47198 13.75 6.17374 13.75 5.86276C13.75 5.55178 13.8817 5.25354 14.1161 5.03364C14.3505 4.81375 14.6685 4.69021 15 4.69021C15.3315 4.69021 15.6495 4.81375 15.8839 5.03364C16.1183 5.25354 16.25 5.55178 16.25 5.86276C16.25 6.17374 16.1183 6.47198 15.8839 6.69188C15.6495 6.91178 15.3315 7.03531 15 7.03531V7.03531ZM15 15.2432C14.6685 15.2432 14.3505 15.1196 14.1161 14.8997C13.8817 14.6799 13.75 14.3816 13.75 14.0706C13.75 13.7596 13.8817 13.4614 14.1161 13.2415C14.3505 13.0216 14.6685 12.8981 15 12.8981C15.3315 12.8981 15.6495 13.0216 15.8839 13.2415C16.1183 13.4614 16.25 13.7596 16.25 14.0706C16.25 14.3816 16.1183 14.6799 15.8839 14.8997C15.6495 15.1196 15.3315 15.2432 15 15.2432V15.2432ZM15 23.451C14.6685 23.451 14.3505 23.3275 14.1161 23.1076C13.8817 22.8877 13.75 22.5895 13.75 22.2785C13.75 21.9675 13.8817 21.6693 14.1161 21.4494C14.3505 21.2295 14.6685 21.1059 15 21.1059C15.3315 21.1059 15.6495 21.2295 15.8839 21.4494C16.1183 21.6693 16.25 21.9675 16.25 22.2785C16.25 22.5895 16.1183 22.8877 15.8839 23.1076C15.6495 23.3275 15.3315 23.451 15 23.451V23.451Z"
              stroke="#f97535"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black-3 z-40 mr-5 border-none text-white-1  py-2">
          <DropdownMenuLabel className="px-6">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-black-2 " />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => imageRef?.current?.click()}
              className="hover:backdrop-brightness-150 px-6 cursor-pointer"
            >
              Upload Profile Image
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="hover:backdrop-brightness-150 px-6 cursor-pointer"
            >
              {" "}
              Log Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropDown;
