import Swal from "sweetalert2";
import { reactive, ref } from "vue";
import axios from "@/api";
import { useError } from "./cart.service";
import { ReceiptDetails } from "@/types";
import useAuth from "./auth.service";

/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formatDate = (
  value: string,
  formatting: Record<string, unknown> = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-NG", formatting).format(new Date(value));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSwal = () => {
  const confirm = async (desc = "") => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: `${desc}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    return res.value;
  };
  const popop = async (status = "Processed!", msg = "Successful") => {
    Swal.fire(`${status}`, `${msg}`, "success");
  };
  return { confirm, popop };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCompanyInfo = () => {
  const company_name = ref("Happiness Eatery Station");
  const company_email = ref("xxxxxx");
  const company_address = ref("xxxxx");
  const company_phone = ref(+2340000000000);

  const { setError, unSetError } = useError();
  const { user } = useAuth();

  const receiptDetails = reactive<ReceiptDetails>({
    name: user.name,
    company_name: company_name.value,
    company_email: company_email.value,
    company_address: company_address.value,
    company_phone: company_phone.value,
  });

  const setCompanyDetails = async () => {
    try {
      const res = await axios.get("/company-details", {
        headers: { "Content-Type": "application/json" },
      });
      const { company_name, company_email, company_address, company_phone } =
        res.data;
      company_name.value = company_name;
      company_email.value = company_email;
      company_address.value = company_address;
      company_phone.value = company_phone;
      unSetError();
      return res;
    } catch (error) {
      setError("Oops!! Connection error");
      return error;
    }
  };

  return {
    company_name,
    company_email,
    company_address,
    company_phone,
    setCompanyDetails,
    receiptDetails,
  };
};
