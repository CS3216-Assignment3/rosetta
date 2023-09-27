import { useAuth } from "@/lib/auth/context";
import { User } from "@/lib/storage/models";
import { getUser } from "@/lib/storage/user";
import { useEffect, useState } from "react";

export default function LobbyUserProfileSection() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState<User>();

    useEffect(() => {
        (async () => {
            if (user !== undefined) {
                const { result, error } = await getUser(user.uid);
                if (error) {
                    return console.log(error);
                }
                setUserDetails(result as User);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <div className="bg-gray-500 rounded-full w-[150px] h-[150px]"></div>
            <div className="flex flex-col gap-2">
                <p>
                    <span className="font-medium">Name</span>{" "}
                    {user?.displayName}
                </p>
                <p>
                    <span className="font-medium">Email</span> {user?.email}
                </p>
                <button className="py-2 px-4 w-max font-medium bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset hover:bg-rosetta-orange hover:shadow-inset2">
                    Change Password
                </button>
                <p>
                    <span className="font-medium">Native Language</span>{" "}
                    {userDetails?.nativeLanguage}
                </p>
                <p>
                    <span className="font-medium">Current Language</span>{" "}
                    {userDetails?.currentLanguage}
                </p>
                <p>
                    <span className="font-medium">Current Proficiency</span>{" "}
                    {userDetails?.currentProficiency}
                </p>
                <p>
                    <span className="font-medium">Topic Preferences</span>{" "}
                    {userDetails?.topicPreferences}
                </p>
            </div>
        </div>
    );
}
