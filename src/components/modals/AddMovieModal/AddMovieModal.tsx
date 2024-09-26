import BaseModal from "@/components/modals/BaseModal/BaseModal";
import { useAppDispatch } from "@/hooks";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { AddMovieForm } from "../AddMovieModal/components";
import { selectServiceModalPayload } from "@/redux/selectors/serviceModalSelector";
import { useEffect } from "react";
import { getCurrentMovieRequest } from "@/redux/slices/currentMovieSlice/currentMovieSlice";

const AddEventModal = () => {
  const dispatch = useAppDispatch();

  const payload = selectServiceModalPayload(ServiceModalName.EditMovie);
  const { movieId } = payload || {};

  useEffect(() => {
    if (movieId) {
      dispatch(getCurrentMovieRequest(movieId));
    }
  }, [movieId, dispatch]);

  const handleOnClose = () => {
    dispatch(
      removeServiceModal(
        movieId ? ServiceModalName.EditMovie : ServiceModalName.AddMovie
      )
    );
  };

  return (
    <BaseModal
      title={movieId ? "Edit Movie" : "Add Movie"}
      onClose={handleOnClose}
      index={1000}
      width="752px"
    >
      <AddMovieForm movieId={movieId} />
    </BaseModal>
  );
};

export default AddEventModal;
