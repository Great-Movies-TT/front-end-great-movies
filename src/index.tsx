import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./enums";

const App = React.lazy(() => import("./App"));
const FavoritesPage = React.lazy(
  () => import("./pages/FavoritesPage/FavoritesPage")
);
const MovieDetailsPage = React.lazy(
  () => import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.MOVIE_DETAILS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MovieDetailsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.FAVORITES,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FavoritesPage />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
