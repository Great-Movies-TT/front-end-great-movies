import BaseModal from "@/components/modals/BaseModal/BaseModal";
import { useAppDispatch } from "@/hooks";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { AddMovieForm } from "../AddMovieModal/components";

const AddEventModal = () => {
  const dispatch = useAppDispatch();

  // const payload = selectServiceModalPayload(ServiceModalName.EditEvent);
  // const { id } = payload || {};

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchEventById(id));
  //   }
  // }, [id, dispatch]);

  const handleOnClose = () => {
    dispatch(removeServiceModal(ServiceModalName.AddMovie));
  };

  return (
    <BaseModal
      title={"Add Movie"}
      onClose={handleOnClose}
      index={1000}
      width="752px"
    >
      <AddMovieForm movieId={"1"} />
    </BaseModal>
  );
};

export default AddEventModal;
