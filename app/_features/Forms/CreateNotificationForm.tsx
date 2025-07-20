"use client";

import { BellAlertIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function CreateNotificationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const disabled = !title || !description;

  return (
    <form className="max-w-[800px] w-full mx-auto flex flex-col gap-6">
      <div
        className={`flex flex-col bg-phthaloGreen/10 p-4 text-phthaloGreen-300 rounded-2xl ${
          disabled ? "focus-within:bg-red-500/10" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Title"
          className="bg-transparent outline-none text-2xl pb-2 border-b border-phthaloGreen border-opacity-10"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          placeholder="Description"
          className="bg-transparent outline-none pt-2 h-[150px]"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>
      <button
        className="self-end flex items-center gap-3 bg-blue-800/80 text-white py-2 px-3 rounded-full transition disabled:hover:bg-red-500/80 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        <BellAlertIcon className="w-4 h-4" />
        <span>Send Notification</span>
      </button>
    </form>
  );
}

export default CreateNotificationForm;
