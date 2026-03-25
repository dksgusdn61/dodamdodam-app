import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";

export interface UploadFileResponse {
  url: string;
  originalFilename: string;
  contentType: string;
  size: number;
}

export const fileApi = {
  upload: (uri: string, fileName: string, mimeType: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: fileName,
      type: mimeType,
    } as unknown as Blob);

    return basicApiHandler.post<ApiResponse<UploadFileResponse>>(
      "/file/upload",
      formData,
      {
        params: { allowType: "IMAGE" },
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },
};