import { useAuth } from "@/lib/auth/context";
import { User } from "@/lib/storage/models";
import { getUser } from "@/lib/storage/user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LobbyUserProfileSection() {
    const { loading, user } = useAuth();
    const [userDetails, setUserDetails] = useState<User>();

    useEffect(() => {
        (async () => {
            if (!loading && user !== undefined) {
                const { result, error } = await getUser(user.uid);
                if (error) {
                    return console.log(error);
                }
                setUserDetails(result as User);
            }
        })();
    }, [loading, user]);

    if (!loading && user === undefined) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <div className="bg-gray-500 rounded-full w-[150px] h-[150px]"></div>
            <div className="flex flex-col gap-2">
                <div>
                    <p className="font-medium">Name</p>
                    <p>{user?.displayName}</p>
                </div>
                <div>
                    <p className="font-medium">Email</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p className="font-medium">Native Language</p>
                    <p className="capitalize">{userDetails?.nativeLanguage}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Link
                    href="/changepassword"
                    className="py-2 px-4 w-max font-medium bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset hover:bg-rosetta-orange hover:shadow-inset2"
                >
                    Change Password
                </Link>
                <Link
                    href="/onboarding?editProfile=1"
                    className="py-2 px-4 w-max font-medium bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset hover:bg-rosetta-orange hover:shadow-inset2"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
}
