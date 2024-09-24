import { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider as Provider,
} from "react-router-dom";
import { ROUTES } from "@/enums";
import App from "@/App";
import HomePage from "@/pages/HomePage/HomePage";
import MovieDetailsPage from "@/pages/MovieDetailsPage/MovieDetailsPage";
import FavoritesPage from "@/pages/FavoritesPage/FavoritesPage";

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

export default function RouterProvider() {
  return <Provider router={router} />;
}
