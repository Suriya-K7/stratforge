import React from "react";

const Home = React.lazy(() => import("./Home"));
const Launch = React.lazy(() => import("./Launch"));
const History = React.lazy(() => import("./History"));
const Rocket = React.lazy(() => import("./Rocket"));
const RocketDetails = React.lazy(() => import("./RocketDetails"));
const PageNotFound = React.lazy(() => import("./PageNotFound"));

export { Home, History, Launch, Rocket, RocketDetails, PageNotFound };
