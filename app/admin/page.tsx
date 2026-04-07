//@ts-nocheck
"use client";
import { useGetCurrentUser } from "@/lib/hooks/useLogin";

const AdminPage = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUser();
  if (isLoading) {
    <>is loading...</>;
  }
  if (isError) {
    <>is error...</>;
  }
  return <div>{currentUser?.name} --{">"} {currentUser?.role}</div>;
};

export default AdminPage;
