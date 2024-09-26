import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCurrentMovieRequest,
  getCurrentMovieSuccess,
} from "../slices/currentMovieSlice/currentMovieSlice";
import { AxiosError, AxiosResponse } from "axios";
import HttpService from "@/services/HttpService/HttpService";
import { Movie } from "@/types";

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
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      errorMessage = error.response?.data?.message || errorMessage;

      if (status === 404) {
        console.error("Movie not found");
        yield put(getCurrentMovieSuccess(null));
      }

      console.error(errorMessage);
    }

    yield put(getCurrentMovieSuccess(null));
  }
}

function* currentMovieWatcher() {
  yield takeLatest(getCurrentMovieRequest.type, getCurrentMovieSaga);
}

export default currentMovieWatcher;
