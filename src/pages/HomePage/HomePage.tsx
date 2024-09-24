import { ServiceModalName } from "../../enums";
import { useAppDispatch } from "../../hooks";
import { addServiceModal } from "../../redux/slices/serviceModalSlice";

function HomePage() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() =>
        dispatch(addServiceModal({ type: ServiceModalName.AddMovie }))
      }
    >
      This is HomePage
    </button>
  );
}

export default HomePage;
