import { useSnackbar } from "notistack";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Display a toast message
   * @param {string} message - The message to display in the toast
   * @param {("default"|"error"|"success"|"warning"|"info")} variant - The variant of the toast
   */
  const showToast = (message, variant = "default") => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
  };

  return showToast;
}
