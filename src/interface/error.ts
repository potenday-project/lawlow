import { ComponentType } from "react";

import { AxiosError } from "axios";

import { LawLowResponse } from "@/api/_http";

export interface CommonErrorProps {
  statusCode: Pick<LawLowResponse, "statusCode">["statusCode"];
  errorMessage: Pick<LawLowResponse, "errorMessage">["errorMessage"];
  onReset?: () => void;
}

export interface CustomError extends Error {
  name: "Error";
}

export type ErrorBoundaryState =
  | {
      error: null;
    }
  | {
      error: CustomError;
    }
  | {
      error: AxiosError<LawLowResponse>;
    };

export interface ErrorFallbackProps {
  error: CustomError | AxiosError<LawLowResponse>;
  resetErrorBoundary: () => void;
}

export interface ErrorBoundaryProps {
  fallbackComponent: ComponentType<ErrorFallbackProps>;
}
