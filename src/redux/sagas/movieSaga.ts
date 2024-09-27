import { call, put, takeLatest } from "redux-saga/effects";
import HttpService from "@/services/HttpService/HttpService";
import { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type {
  AddMovie,
  Movie,
  MovieSeachPayload,
  TotalCountPayload,
  UpdateMovie,
} from "@/types";
import {
  addMovieFailure,
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
import { itemsPerPage } from "@/constants";

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
      console.error(error);
      yield put(getMoviesFailure(error.message));
    } else {
      console.error("An unknown error occurred.");
      yield put(getMoviesFailure("An unknown error occurred."));
    }
  }
}

function* getTotalCountSaga(action: PayloadAction<TotalCountPayload>) {
  const { genre, minRating } = action.payload;

  const params: { [key: string]: any } = {};
  if (genre) params.genre = genre;
  if (minRating !== null && minRating !== undefined)
    params.minRating = minRating;

  try {
    const response: AxiosResponse<number> = yield call(
      HttpService.get,
      "/movies/count",
      params
    );

    yield put(getTotalCountSuccess(response.data));
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error);
      yield put(getMoviesFailure(error.message));
    } else {
      console.error("An unknown error occurred.");
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
          limit: itemsPerPage,
          genre: "",
          minRating: null,
        })
      );
    }
  } catch (error) {
    console.error(error);
    yield put(addMovieFailure("An unexpected error occurred."));
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
          limit: itemsPerPage,
          genre: "",
          minRating: null,
        })
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      yield put(deleteMovieFailure(error.message));
    } else {
      console.error("An unknown error occurred.");
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
          limit: itemsPerPage,
          genre: "",
          minRating: null,
        })
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      yield put(updateMovieFailure(error.message));
    }

    console.error(error);
    yield put(updateMovieFailure("An unexpected error occurred."));
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
