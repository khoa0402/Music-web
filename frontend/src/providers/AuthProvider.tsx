import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useAuth } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) await checkAdminStatus();
      } catch (error: any) {
        updateApiToken(null);
        console.log("Error in AuthProvider", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="size-12 text-teal-400 animate-spin" />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthProvider;
