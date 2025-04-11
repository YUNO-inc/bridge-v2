"use client";

import { DEFAULT_COORDS } from "@/app/_interfaces/interfaces";
import { CreateBusinessAction } from "@/app/_lib/actions/business/actions";

function CreateBiz({ name = "" }) {
  async function createBiz() {
    try {
      await CreateBusinessAction({
        name: "Premium Shawarma",
        address: {
          name: "9, Esuola Str, Ago.",
          type: "Point",
          coordinates: DEFAULT_COORDS,
        },
        profileImg:
          "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
      });
      console.log("BIZ created");
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={createBiz}>CREATE BIZ: {name}</button>;
}

export default CreateBiz;
