import { ShieldExclamationIcon, CreditCardIcon, Cog8ToothIcon, QuestionMarkCircleIcon  } from "react-native-heroicons/outline";

// Security, Account details, Payments, Help,

export const ACCOUNT_LINKS = [
    {
        path: "/account/manage",
        title: "Manage Details",
        icon: Cog8ToothIcon,
    },
    {
        path: "/account/security",
        title: "Security",
        isExternal: false,
        icon: ShieldExclamationIcon,
    },
    {
        path: "/account/payments",
        title: "Payments",
        isExternal: false,
        icon: CreditCardIcon,
    },
    {
        path: "https://wastify-manager.vercel.app/",
        title: "Help",
        isExternal: true,

        icon: QuestionMarkCircleIcon,
    },
   
]