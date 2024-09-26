import { call, put, takeLatest } from "redux-saga/effects";
import HttpService from "@/services/HttpService/HttpService";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, type AxiosResponse } from "axios";
import { AddMovie, Movie, MovieSeachPayload, UpdateMovie } from "@/types";
import {
  addMovieRequest,
  addMovieSuccess,
  deleteMovieFailure,
  deleteMovieRequest,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesRequest,
  getMoviesSuccess,
  getTotalCountRequest,
  getTotalCountSuccess,
  updateMovieFailure,
  updateMovieRequest,
  updateMovieSuccess,
} from "../slices/movieSlice/movieSlice";
import { ServiceModalName } from "@/enums";
import { removeServiceModal } from "../slices/serviceModalSlice";

interface ErrorResponse {
  flag?: string[];
  message?: string;
}

function* getMoviesSaga({
  payload: { page, limit, genre, minRating },
}: PayloadAction<MovieSeachPayload>) {
  try {
    const response: AxiosResponse<Movie[]> = yield call(
      HttpService.get,
      `/movies?page=${page}&limit=${limit}${genre ? `&genre=${genre}` : ""}${
        minRating ? `&minRating=${minRating}` : ""
      }`
    );

    yield put(getMoviesSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(getMoviesFailure(error.message));
    } else {
      yield put(getMoviesFailure("An unknown error occurred."));
    }
  }
}

function* getTotalCountSaga() {
  try {
    const response: AxiosResponse<number> = yield call(
      HttpService.get,
      "/movies/count"
    );
    yield put(getTotalCountSuccess(response.data));
  } catch (error: any) {
    if (error instanceof Error) {
      yield put(getMoviesFailure(error.message));
    } else {
      yield put(getMoviesFailure("An unknown error occurred."));
    }
  }
}

function* addMovieSaga({ payload }: PayloadAction<AddMovie>) {
  try {
    const response: AxiosResponse<Movie> = yield call(
      HttpService.post,
      "/movies",
      payload
    );

    if (response.status === 201) {
      yield put(addMovieSuccess());
      yield put(removeServiceModal(ServiceModalName.AddMovie));
      yield put(
        getMoviesRequest({
          page: 1,
          limit: 8,
          genre: "",
          minRating: null,
        })
      );
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      errorMessage = error.response?.data?.message || errorMessage;

      const data = error.response?.data as ErrorResponse;
      const errorFlag = data?.flag;

      console.error(errorFlag, status, errorMessage);
    }
  }
}

function* deleteMovieSaga({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(
      HttpService.delete,
      `/movies/${payload}`
    );

    if (response.status === 200) {
      yield put(deleteMovieSuccess());
      yield put(
        getMoviesRequest({
          page: 1,
          limit: 8,
          genre: "",
          minRating: null,
        })
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(deleteMovieFailure(error.message));
    } else {
      yield put(deleteMovieFailure("An unknown error occurred."));
    }
  }
}

function* updateMovieSaga({
  payload: { movieId, movie },
}: PayloadAction<{ movieId: string; movie: UpdateMovie }>) {
  try {
    const response: AxiosResponse<Movie> = yield call(
      HttpService.patch,
      `/movies/${movieId}`,
      movie
    );

    if (response.status === 200) {
      yield put(updateMovieSuccess());
      yield put(removeServiceModal(ServiceModalName.EditMovie));
      yield put(
        getMoviesRequest({
          page: 1,
          limit: 8,
          genre: "",
          minRating: null,
        })
      );
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      errorMessage = error.response?.data?.message || errorMessage;

      console.error(status, errorMessage);

      if (status === 404) {
        console.error("Movie not found");
        yield put(updateMovieFailure("Movie not found"));
      }

      console.error(errorMessage);
      yield put(updateMovieFailure(errorMessage));
    }
  }
}

function* moviesWatcher() {
  yield takeLatest(getMoviesRequest.type, getMoviesSaga);
  yield takeLatest(getTotalCountRequest.type, getTotalCountSaga);
  yield takeLatest(addMovieRequest.type, addMovieSaga);
  yield takeLatest(deleteMovieRequest.type, deleteMovieSaga);
  yield takeLatest(updateMovieRequest.type, updateMovieSaga);
}

export default moviesWatcher;
