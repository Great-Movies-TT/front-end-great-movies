import { all } from "redux-saga/effects";
import moviesWatcher from "./movieSaga";
import currentMovieWatcher from "./currentMovieSaga";

export default function* rootSaga() {
  yield all([moviesWatcher(), currentMovieWatcher()]);
}
