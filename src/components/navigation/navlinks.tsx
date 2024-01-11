import { HomeIcon, CalendarDaysIcon, ClipboardDocumentListIcon, UserIcon } from "react-native-heroicons/solid";

export const NAVLINKS = [
    {
        path: "/",
        title: "Home",
        icon: HomeIcon,
    },
    {
        path: "/schedules",
        title: "Schedules",
        icon: CalendarDaysIcon,
    },
    {
        path: "/activities",
        title: "Activities",
        icon: ClipboardDocumentListIcon,
    },
    {
        path: "/account",
        title: "Account",
        icon: UserIcon,
    },
]