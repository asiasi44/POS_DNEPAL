//@ts-nocheck
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, getCurrentUser, logout } from "@/apiClient/loginApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      router.push("/admin");
      toast.success("Logged In Successfully!!!");
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      throw error;
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      router.push("/login");
      toast.success("Logged Out Successfully!!!");
    },
  });
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: getCurrentUser,
    retry: false,
  });
}
