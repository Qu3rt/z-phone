import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export function useActiveInput() {
  const [activeInputId, setActiveInputId] = useState(null);

  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.matches("input, textarea")) {
        setActiveInputId(e.target.id || e.target.name || "unnamed-input");
        axios.post("/setKeepInput", {
          keepInput: false,
        });
      }
    };

    const handleBlur = () => {
      setActiveInputId(null);
      axios.post("/setKeepInput", {
        keepInput: true,
      });
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  return { activeInputId };
}
