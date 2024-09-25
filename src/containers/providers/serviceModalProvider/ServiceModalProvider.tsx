import React, { Suspense, useEffect } from "react";
import { ServiceModalName } from "@/enums";
import { selectServiceModals } from "@/redux/selectors/serviceModalSelector";

const AddMovie = React.lazy(
  () => import("@/components/modals/AddMovieModal/AddMovieModal")
);

const EditMovie = React.lazy(
  () => import("@/components/modals/AddMovieModal/AddMovieModal")
);

const AddMovieLeave = React.lazy(
  () => import("@/components/modals/AddMovieLeaveModal/AddMovieLeaveModal")
);

const ServiceModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalKeys = Object.keys(selectServiceModals());

  useEffect(() => {
    const modalOverflow = document.body.style.overflow;

    document.body.style.overflow = modalKeys?.length ? "hidden" : modalOverflow;

    return () => {
      document.body.style.overflow = modalOverflow;
    };
  }, [modalKeys]);

  const getModalComponent = (key: ServiceModalName) => {
    switch (key) {
      case ServiceModalName.AddMovie:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <AddMovie />
          </Suspense>
        );

      case ServiceModalName.EditMovie:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <EditMovie />
          </Suspense>
        );

      case ServiceModalName.AddMovieLeave:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <AddMovieLeave />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {children}
      {modalKeys.map((key: any) => (
        <React.Fragment key={key}>{getModalComponent(key)}</React.Fragment>
      ))}
    </>
  );
};

export default ServiceModalProvider;
