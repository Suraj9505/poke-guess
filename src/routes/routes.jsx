import React from "react";

import Home from "../assets/views/home";

import DefaultLayouts from "../assets/components/layouts/default-layouts";

export const DefaultRoutes = [
  {
    path: "/",
    // element: <DefaultLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
