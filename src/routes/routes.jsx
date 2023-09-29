import React from "react";

import Home from "../views/home";
import Game from "../views/game";

import DefaultLayouts from "../components/layouts/default-layouts";

export const DefaultRoutes = [
  {
    path: "/",
    element: <DefaultLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
];
