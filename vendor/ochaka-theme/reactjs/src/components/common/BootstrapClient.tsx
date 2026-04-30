import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Only run this in the browser
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm");
    }
  }, []);

  return null; // This component only loads scripts
}
