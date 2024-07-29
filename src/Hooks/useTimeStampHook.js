import { useState, useEffect } from "react";

const useTimeStampHook = () => {
  const [timeStamp, setTimeStamp] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    setTimeStamp(formattedDate);
  }, []);
  return timeStamp;
};

export default useTimeStampHook;
