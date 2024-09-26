import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCurrentMovieRequest,
  getCurrentMovieSuccess,
} from "../slices/currentMovieSlice/currentMovieSlice";
import HttpService from "@/services/HttpService/HttpService";
import type { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

function* getCurrentMovieSaga({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<Movie> = yield call(
      HttpService.get,
      `/movies/${payload}`
    );

    if (response.status === 200) {
      yield put(getCurrentMovieSuccess(response.data));
    }
  } catch (error) {
    console.error(error);
    yield put(getCurrentMovieSuccess(null));
  }
}

function* currentMovieWatcher() {
  yield takeLatest(getCurrentMovieRequest.type, getCurrentMovieSaga);
}

export default currentMovieWatcher;
