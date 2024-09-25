import { all } from "redux-saga/effects";
import moviesWatcher from "./movieSaga";

export default function* rootSaga() {
  yield all([moviesWatcher()]);
}
