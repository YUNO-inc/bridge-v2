"use client";

import { GetSingleBusinessAction } from "@/app/_lib/actions/business/actions";
import { CreateItemsAction } from "@/app/_lib/actions/item/actions";

function CreateItem({ name = "", businessSlug = "" }) {
  async function createItem() {
    try {
      const business = await GetSingleBusinessAction({ slug: businessSlug });
      if (!business) return;
      const businessId = business.id;
      const newItems = await CreateItemsAction({
        items: [
          {
            name,
            price: 2500,
            image:
              "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
            itemType: "shawarma",
          },
          {
            name: "Jollof Rice",
            price: 2500,
            image:
              "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
            itemType: "food",
          },
          {
            name: "Cavedilol",
            price: 2500,
            image:
              "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
            itemType: "pharmacy",
          },
        ],
        businessId,
      });
      console.log("ITEM created", newItems);
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={createItem}>CREATE Item: {name}</button>;
}

export default CreateItem;
