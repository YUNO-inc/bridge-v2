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
            name: "Beef Burger",
            price: 2500,
            image:
              "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
            itemType: "shawarma",
          },
          {
            name: "Chicken Sharwarma Double",
            price: 2500,
            image:
              "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
            itemType: "shawarma",
          },
          {
            name: "Chicken and Beef Sharwarma",
            price: 2500,
            image:
              "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
            itemType: "shawarma",
          },
          // {
          //   name: "Cavedilol 3.125mg",
          //   price: 2500,
          //   image:
          //     "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
          //   itemType: "pharmacy",
          // },
          // {
          //   name: "Rosuvastatin 10mg",
          //   price: 2500,
          //   image:
          //     "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-4MnsP3q25l0NUkibuaUZVoliPTJifJ_y6nD-W1oHfmUCP5OqciSkdiaCNaSLhxQXL0vp2HImjfSKQvBYW062rF61yz6SSIQYK0Ls1a2i8SD3LlZx6HW5lTTUZkKi69to7HJs6=w125-h125-n-k-no",
          //   itemType: "pharmacy",
          // },
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
