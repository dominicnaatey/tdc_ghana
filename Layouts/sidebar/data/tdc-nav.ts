import * as Icons from "../icons";

export const TDC_NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Overview",
            url: "/admin",
          },
        ],
      },
      {
        title: "News & Updates",
        url: "/admin/news",
        icon: Icons.FileText,
        items: [],
      },
      {
        title: "Housing Projects",
        url: "/admin/housing",
        icon: Icons.Home,
        items: [],
      },
      {
        title: "Land Plots",
        url: "/admin/land",
        icon: Icons.MapPin,
        items: [],
      },
      {
        title: "Inquiries",
        url: "/admin/inquiries",
        icon: Icons.Users,
        items: [],
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Icons.Settings,
        items: [],
      },
    ],
  },
];