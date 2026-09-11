"use client";
import useToast from "@/hooks/useToast";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthConfirmEmailService } from "@/services/api/services/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmEmail() {
  const shwoToat = useToast();
  const fetchConfirmEmail = useAuthConfirmEmailService();
  const router = useRouter();

  useEffect(() => {
    const confirm = async () => {
      const params = new URLSearchParams(window.location.search);
      const hash = params.get("hash");

      if (hash) {
        const { status } = await fetchConfirmEmail({
          hash,
        });

        if (status === HTTP_CODES.NO_CONTENT) {
          shwoToat("Email confirmed successfully", "success");
          router.replace("/my-profile");
        } else {
          shwoToat("Email confirmation failed", "error");
          router.replace("/");
        }
      }
    };

    confirm();
  }, [fetchConfirmEmail, router, shwoToat]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
}
