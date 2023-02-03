import React, { useContext, useState } from "react";
import {
  CircleSpinnerOverlay,
  FerrisWheelSpinner,
} from "react-spinner-overlay";
import { TransactionContext } from "./ReactContext/TransactionContext";
export const Spinner = () => {
  const [loading, setLoading] = useState(false);
  const { congrat, isLoading } = useContext(TransactionContext);
  return (
    <div>
      {
        isLoading ? (
          <div
            style={{
              backgroundColor: "grey",
              bottom: "8rem",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "35%",
              height: "40%",
            }}
          >
            <p
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                color: "white",
              }}
            >
              Upper Left Text
            </p>
            <p
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                color: "white",
              }}
            >
              X
            </p>
            <CircleSpinnerOverlay
              size={90}
              overlayColor="rgba(0, 153, 255, 0.2)"
            />
            <p style={{ color: "white", marginTop: "1rem" }}>Loading</p>
          </div>
        ) : null
        // congrat && (
        //   <div
        //     style={{
        //       backgroundColor: "green",
        //       position: "fixed",
        //       width: "25rem",
        //       height: "20rem",
        //       left: "20rem",
        //       bottom: "12rem",
        //       borderRadius: "2rem",
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       padding: "1rem",
        //     }}
        //   >
        //     <p style={{ color: "white", marginTop: "1rem" }}>
        //       Congratulations!
        //     </p>
        //   </div>
        // )
      }
    </div>
  );
};
