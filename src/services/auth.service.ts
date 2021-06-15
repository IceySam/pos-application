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
    token: localStorage.getItem("token") || "",
  });

  //   login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = async (items: any) => {
    try {
      const res = await axios.post("/login", items, {
        headers: { "Content-Type": "application/json" },
      });
      const { token, name, salesId } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("salesId", salesId);
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
