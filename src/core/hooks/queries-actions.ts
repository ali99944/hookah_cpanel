import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useAxios } from "../lib/axios";
// import { ApiError } from "axios";

export type TApiError = {
  data: string;
  response: {
    data: {
      data: string;
      message: string;
      statusCode: number;
    };
    status: number;
    message: string;
  };
};

// type TApiSuccess<T> = {
//   guest_cart_token: string;
//   data: T;
//   success: boolean;
//   message: string;
// };

// Hook options types
interface QueryProps<TData> {
  key: QueryKey;
  url: string;
  options?: Omit<
    UseQueryOptions<TData, Error>,
    "queryKey" | "queryFn"
  >;
  headers?: Record<string, string | undefined>;
  onErrorCallback?: (error: ApiError) => void;
}

// Hook options types
interface MutationProps<TData = unknown, TVariables = void> {
  method: "post" | "put" | "delete" | "patch";
  url: string;
  onSuccessMessage?: string;
  key?: QueryKey;
  options?: UseMutationOptions<TData, ApiError, TVariables>;
  headers?: object;
  contentType?: "application/json" | "multipart/form-data";
  onErrorCallback?: (error: ApiError) => void;
  onSuccessCallback?: (data: TData) => void;
}

// GET Query Hook
export function useGetQuery<TData = unknown>({
  key,
  url,
  options = {},
  headers = {},
}: QueryProps<TData>): UseQueryResult<TData, Error> {
  const axios = useAxios();

  const queryOptions: UseQueryOptions<TData, Error> = {
    queryKey: key,
    queryFn: async () => {
      const response = await axios.get<TData>(url, {
        headers
      });
      return response.data;
    },
    ...options,
  };

  return useQuery<TData>(queryOptions);
}

export interface ApiError {
  response: {
    data: {
      error: {
        code: string
        message: string
        errors: Record<string, Array<string>>
      }
    };
    statusCode: number;
    message: string;
  }
}

function useCustomMutation<TData, TVariables>(
  mutationFn: (values: TVariables) => Promise<TData>,
  {
    key,
    onSuccessCallback,
    onErrorCallback,
    options,
  }: MutationProps<TData, TVariables>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onSuccess: async (data) => {
      if (key) {
        await queryClient.invalidateQueries({ queryKey: key });
      }

      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },

    onError: (error: ApiError) => {
      onErrorCallback?.(error);
    },
    ...options,
  });

  return mutation;
}



// Mutation Hook
export function useMutationAction<TData = unknown, TVariables = unknown>(
  props: MutationProps<TData, TVariables>
) {
  const axios = useAxios(props.contentType);

  return useCustomMutation<TData, TVariables>(
    async (values: TVariables): Promise<TData> => {
      const response = await axios[props.method]<TData>(
        props.url,
        values,
        { headers: props.headers }
      );

      return response.data;
    },
    props
  );
}
