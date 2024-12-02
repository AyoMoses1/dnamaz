"use client";
import { useState } from "react";
import { Copy, Ellipsis, File, User, Building2 } from "lucide-react";
import avatar from "@/public/avatar.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useClientData } from "../_lib/Api/endpoints/fetchClientDetail";
import { IndividualProfile, CooperateProfile } from "../_types/apiTypes";
import Spinner from "./Spinner";

const ClientInfo: React.FC = () => {
  const { userId } = useParams();
  const {
    data: clientData,
    isLoading,
    error,
  } = useClientData(userId as string);

  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Spinner />
        <div className="w-[360px] mr-4 border-r p-4 text-red-600">
          Error loading client data
        </div>
      </>
    );
  }

  if (!clientData?.data) {
    return (
      <div className="w-[360px] mr-4 border-r p-4 text-red-700">
        No client data found
      </div>
    );
  }

  const { profile } = clientData.data;

  const handleDocumentClick = (doc: any) => {
    setSelectedDocument(doc);
  };

  const closeModal = () => {
    setSelectedDocument(null);
  };

  // Type guard to check if profile is corporate
  const isCooperateProfile = (
    profile: CooperateProfile | IndividualProfile
  ): profile is CooperateProfile => {
    return "businessName" in profile;
  };

  return (
    <div className="w-[360px] mr-4 border-r p-4">
      <div className="bg-[#d9edd9] rounded-lg p-4 mb-6 relative w-full h-28">
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center absolute top-16 left-4 border-2 border-white">
            <Image quality={80} src={avatar} alt="avatar" />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-black text-sm">
              {isCooperateProfile(profile) ? profile.rc : profile.clientNumber}
            </span>
            <Copy className="w-4 h-4 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-6 mb-4">
        <h2 className="text-lg font-semibold text-black">
          {isCooperateProfile(profile)
            ? profile.businessName
            : `${profile.firstName} ${profile.lastName}`}
        </h2>
        <p className="text-green-500 text-sm mt-1">
          ID: {isCooperateProfile(profile) ? profile.rc : profile.clientNumber}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          Email:{" "}
          {isCooperateProfile(profile)
            ? profile.companyEmail
            : profile.nextOfKin?.email || "N/A"}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          Phone:{" "}
          {isCooperateProfile(profile) ? profile.phone : profile.phoneNumber}
        </p>
      </div>

      <div className="flex items-center mt-4">
        <div className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-[#E8F3E8] text-green-600">
          {isCooperateProfile(profile) ? (
            <>
              <Building2 className="w-4 h-4 mr-1 text-green-600" /> Corporate
            </>
          ) : (
            <>
              <User className="w-4 h-4 mr-1 text-green-600" /> Individual
            </>
          )}
        </div>
        {!isCooperateProfile(profile) && (
          <span className="border bg-gray-50 px-2 py-1 w-24 rounded-md text-sm text-black ml-2">
            {profile.nationality}
          </span>
        )}
      </div>

      <hr className="my-6" />

      <div className="mb-6">
        <h3 className="text-sm text-black font-medium mb-2">Address</h3>
        <p className="text-sm text-gray-600">
          {isCooperateProfile(profile)
            ? profile.primaryBusinessAddress
            : profile.houseAddress}
        </p>
      </div>

      {/* Documents section */}
      {isCooperateProfile(profile)
        ? profile.cooperateDocuments &&
          profile.cooperateDocuments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm text-black font-medium mb-2">
                Company Documents
              </h3>
              <div className="space-y-3">
                {profile.cooperateDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-md w-full bg-gray-100 h-10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <File className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {doc.typeOfId
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    </div>
                    <Ellipsis
                      className="w-4 h-4 mr-3 text-black cursor-pointer"
                      onClick={() => handleDocumentClick(doc)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        : profile.userDocument &&
          profile.userDocument.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm text-black font-medium mb-2">Documents</h3>
              <div className="space-y-3">
                {profile.userDocument.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-md w-full bg-gray-100 h-10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <File className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {doc.typeOfId
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c: any) => c.toUpperCase())}
                      </span>
                    </div>
                    <Ellipsis
                      className="w-4 h-4 mr-3 text-black cursor-pointer"
                      onClick={() => handleDocumentClick(doc)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      {isCooperateProfile(profile) && profile.cooperateRepresentative && (
        <div>
          <h3 className="text-sm text-black font-medium mb-2">
            Company Representative
          </h3>
          <p className="text-sm text-gray-600">
            {profile.cooperateRepresentative.fullName}
          </p>
          <p className="text-sm text-gray-600">
            {profile.cooperateRepresentative.designation}
          </p>
        </div>
      )}

      {/* Next of Kin section (only for individual) */}
      {!isCooperateProfile(profile) && profile.nextOfKin && (
        <div>
          <h3 className="text-sm text-black font-medium mb-2">Next of Kin</h3>
          <p className="text-sm text-gray-600">
            {`${profile.nextOfKin.firstName} ${profile.nextOfKin.lastName}`}
          </p>
        </div>
      )}

      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-50 p-8 rounded-lg w-1/2 max-w-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Document Details
            </h2>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800">
                <strong>Document Type:</strong>{" "}
                <span className="text-gray-600">
                  {selectedDocument.typeOfId
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c: any) => c.toUpperCase())}
                </span>
              </p>
              <p className="text-lg font-medium text-gray-800">
                <strong>Document Name:</strong>{" "}
                <span className="text-gray-600">
                  {selectedDocument.document}
                </span>
              </p>
              <p className="text-lg font-medium text-gray-800">
                <strong>Document Type:</strong>{" "}
                <span className="text-gray-600">
                  {selectedDocument.documentType}
                </span>
              </p>
              {selectedDocument.idNumber && (
                <p className="text-lg font-medium text-gray-800">
                  <strong>ID Number:</strong>{" "}
                  <span className="text-gray-600">
                    {selectedDocument.idNumber}
                  </span>
                </p>
              )}
              {selectedDocument.issueDate && (
                <p className="text-lg font-medium text-gray-800">
                  <strong>Issue Date:</strong>{" "}
                  <span className="text-gray-600">
                    {new Date(selectedDocument.issueDate).toLocaleDateString()}
                  </span>
                </p>
              )}
              {selectedDocument.expiryDate && (
                <p className="text-lg font-medium text-gray-800">
                  <strong>Expiry Date:</strong>{" "}
                  <span className="text-gray-600">
                    {new Date(selectedDocument.expiryDate).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
            <button
              className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientInfo;
