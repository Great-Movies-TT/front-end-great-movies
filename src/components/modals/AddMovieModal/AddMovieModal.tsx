import { Typography } from "@mui/material";
import BaseModal from "@/components/modals/BaseModal/BaseModal";
import { useAppDispatch } from "@/hooks";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice";
import { BaseModalSize, ServiceModalName } from "@/enums";

export default function AddMovieModal({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.AddMovie));
  };

  return (
    <BaseModal width={BaseModalSize.Medium} onClose={handleClose} index={1000}>
      <Typography>Add movie</Typography>
    </BaseModal>
  );
}
