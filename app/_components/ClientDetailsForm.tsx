"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { BadgeCheck } from "lucide-react";
import { updateCustomer } from "../_lib/Api/endpoints/bvnValidation";
import { useClientData } from "../_lib/Api/endpoints/fetchClientDetail";
import {
  MutationError,
  IndividualProfile,
  CooperateProfile,
} from "../_types/apiTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "./Spinner";

type UserType = "individual" | "cooperate";
type CustomerStatus = "accepted" | "rejected";

const ClientDetailsForm: React.FC = () => {
  const { data: session } = useSession();
  const params = useParams();
  const userId = params?.userId as string;
  const queryClient = useQueryClient();

  const {
    data: clientData,
    isLoading: clientLoading,
    isError: clientError,
  } = useClientData(userId);

  // Determine user type based on profile data
  const userType = React.useMemo<UserType | null>(() => {
    if (!clientData?.data) return null;

    const profile = clientData.data.profile;
    if ("businessName" in profile) {
      return "cooperate";
    }
    if ("firstName" in profile) {
      return "individual";
    }
    return null;
  }, [clientData]);

  const { mutate: acceptCustomer, isPending: isAccepting } = useMutation<
    void,
    MutationError,
    void,
    unknown
  >({
    mutationFn: async () => {
      if (!clientData?.data || !userType) {
        throw new Error("Client data or user type not found");
      }
      await updateCustomer({
        user_id: Number(userId),
        status: "approved",
        user_type: userType,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientData", userId] });
    },
    onError: (error) => {
      console.error("Error accepting customer:", error);
    },
  });

  const { mutate: rejectCustomer, isPending: isRejecting } = useMutation<
    void,
    MutationError,
    void,
    unknown
  >({
    mutationFn: async () => {
      if (!clientData?.data || !userType) {
        throw new Error("Client data or user type not found");
      }
      await updateCustomer({
        user_id: Number(userId),
        status: "rejected",
        user_type: userType,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientData", userId] });
    },
    onError: (error) => {
      console.error("Error rejecting customer:", error);
    },
  });

  if (clientLoading) {
    return (
      <>
        <Spinner />
        <div>Loading...</div>
      </>
    );
  }

  if (clientError) {
    return <div>Error loading client data</div>;
  }

  if (!userType) {
    return <div>Error: Unable to determine user type</div>;
  }

  const profile = clientData?.data?.profile;
  const isIndividual = userType === "individual";

  return (
    <div className="mt-4 border rounded-lg shadow-sm">
      {/* Header with validation status and buttons */}
      <div className="rounded-t-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-lg text-black font-semibold">
            {isIndividual ? "BVN Validated" : "RC Validated"}
          </div>
          <BadgeCheck className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => rejectCustomer()}
            disabled={isRejecting}
            className="px-4 py-1.5 text-sm text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>
          <button
            onClick={() => acceptCustomer()}
            disabled={isAccepting}
            className="px-4 py-1.5 text-sm text-green-600 bg-green-100 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>

      {/* Profile fields */}
      {profile && (
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          {isIndividual ? (
            // Individual profile fields
            <>
              <div>
                <label className="block text-sm text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  value={(profile as IndividualProfile).firstName}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">Last Name</label>
                <input
                  type="text"
                  value={(profile as IndividualProfile).lastName}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">D.O.B</label>
                <input
                  type="text"
                  value={(profile as IndividualProfile).dateOfBirth}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">B.V.N</label>
                <input
                  type="text"
                  value={
                    (profile as IndividualProfile).bvnVerified
                      ? "Verified"
                      : "Not Verified"
                  }
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
            </>
          ) : (
            // Corporate profile fields
            <>
              <div>
                <label className="block text-sm text-gray-500">
                  Business Name
                </label>
                <input
                  type="text"
                  value={(profile as CooperateProfile).businessName}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">RC Number</label>
                <input
                  type="text"
                  value={(profile as CooperateProfile).rc}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">
                  Date of Incorporation
                </label>
                <input
                  type="text"
                  value={(profile as CooperateProfile).dateOfIncorporation}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">
                  Business Type
                </label>
                <input
                  type="text"
                  value={(profile as CooperateProfile).natureOfBusiness}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientDetailsForm;
