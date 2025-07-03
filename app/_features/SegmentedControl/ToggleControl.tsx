"use client";

import { useState } from "react";

function ToggleControl({
  changeToggle,
  isOn,
}: {
  changeToggle: () => void | Promise<void>;
  isOn: boolean;
}) {
  const [isChanging, setIsChanging] = useState(false);

  async function handleChangeToggle() {
    if (isChanging) return;
    try {
      await changeToggle();
      setIsChanging(true);
    } finally {
      setIsChanging(false);
    }
  }

  return (
    <button
      className={`bg-phthaloGreen bg-opacity-10 p-1 w-12 h-7 rounded-full ${
        isOn ? "bg-opacity-90" : "bg-opacity-[0.37]"
      } transition-all`}
      onClick={handleChangeToggle}
    >
      <div
        className={`w-[50%] h-[100%] rounded-full bg-white ${
          isOn ? "translate-x-[100%]" : "translate-x-0 "
        } transition-all`}
      ></div>
    </button>
  );
}

export default ToggleControl;
