"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { BadgeCheck, XCircle, CheckCircle2, XCircleIcon } from "lucide-react";
import { updateCustomer } from "../_lib/Api/endpoints/bvnValidation";
import { useClientData } from "../_lib/Api/endpoints/fetchClientDetail";
import {
  MutationError,
  IndividualProfile,
  CooperateProfile,
  UserType,
} from "../_types/apiTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "./Spinner";

// Utility function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
};

const ClientDetailsForm: React.FC = () => {
  const { data: session } = useSession();
  const params = useParams();
  const userId = params?.userId as string;
  const queryClient = useQueryClient();

  // Add state to track the current status
  const [status, setStatus] = React.useState<
    "pending" | "approved" | "rejected"
  >("pending");

  const {
    data: clientData,
    isLoading: clientLoading,
    isError: clientError,
  } = useClientData(userId);

  // Set initial status when client data loads
  React.useEffect(() => {
    if (clientData?.data?.status) {
      setStatus(clientData.data.status as "pending" | "approved" | "rejected");
    }
  }, [clientData]);

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
        activationStatus: "approved",
        user_type: userType,
      });
    },
    onSuccess: () => {
      setStatus("approved");
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
        activationStatus: "rejected",
        user_type: userType,
      });
    },
    onSuccess: () => {
      setStatus("rejected");
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
  const isVerified = isIndividual
    ? (profile as IndividualProfile).bvnVerified
    : true;

  const renderStatusBadge = () => {
    switch (status) {
      case "approved":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Approved</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 rounded-full">
            <XCircleIcon className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 border rounded-lg shadow-sm">
      {/* Header with validation status and buttons */}
      <div className="rounded-t-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-lg text-black font-semibold">
              {isIndividual ? "BVN Validated" : "RC Validated"}
            </div>
            {isVerified ? (
              <BadgeCheck className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
          {renderStatusBadge()}
        </div>
        {status === "pending" && (
          <div className="flex gap-3">
            <button
              onClick={() => rejectCustomer()}
              disabled={isRejecting || status !== "pending"}
              className="px-4 py-1.5 text-sm text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRejecting ? "Rejecting..." : "Reject"}
            </button>
            <button
              onClick={() => acceptCustomer()}
              disabled={isAccepting || status !== "pending" || !isVerified}
              className="px-4 py-1.5 text-sm text-green-600 bg-green-100 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </button>
          </div>
        )}
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
                  value={formatDate((profile as IndividualProfile).dateOfBirth)}
                  readOnly
                  className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">B.V.N</label>
                <input
                  type="text"
                  value={isVerified ? "Verified" : "Not Verified"}
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
                  value={formatDate(
                    (profile as CooperateProfile).dateOfIncorporation
                  )}
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
