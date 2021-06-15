/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */

import Swal from "sweetalert2";

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
