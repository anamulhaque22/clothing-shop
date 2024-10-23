"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (mounted && resolvedTheme === "dark") {
    return (
      <Image
        width={100}
        height={100}
        src="/images/euphoria-white.png"
        alt="Admin Logo"
        priority={true}
      />
    );
  }

  if (mounted && resolvedTheme === "light") {
    return (
      <Image
        width={100}
        height={100}
        className="!text-text dark:!stroke-white dark:!fill-white"
        src="/images/euphoria.png"
        alt="Admin Logo"
        priority={true}
      />
    );
  }
}
