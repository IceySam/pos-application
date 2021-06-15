import axios from "@/api";
import router from "@/router";
import { reactive } from "vue";
import { useError } from "./cart.service";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAuth() {
  const { setError, unSetError } = useError();

  const user = reactive({
    id: null,
    name: localStorage.getItem("name") || "",
    salesId: localStorage.getItem("salesId") || "",
  });

  //   login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = async (items: any) => {
    try {
      const res = await axios.post("/login", items, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("salesId", res.data.salesId);
      unSetError();
      return res;
    } catch (error) {
      setError("Oops!! Connection error");
      return error;
    }
  };

  //   logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("salesId");
    router.push({ name: "Login" });
  };

  return { user, login, logout };
}
