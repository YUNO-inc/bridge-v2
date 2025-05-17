export const adminPipeline = [
  {
    $facet: {
      // Facet 1: match active orders
      activeOrders: [
        { $match: { status: "active" } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "businesses",
            localField: "farthestPurchase",
            foreignField: "_id",
            as: "farthestPurchase",
          },
        },
        {
          $unwind: "$farthestPurchase",
        },
        {
          $addFields: {
            id: "$_id",
          },
        },
      ],
      // Facet 2: compute totals over all orders
      totals: [
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalDeliveriesMade: {
              $sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] },
            },
            totalItemsDelivered: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "delivered"] },
                  { $size: "$items" },
                  0,
                ],
              },
            },
            totalDeliveredItemPrice: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "delivered"] },
                  "$totalItemPrice",
                  0,
                ],
              },
            },
            totalDeliveryPrice: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "delivered"] },
                  "$totalDeliveryPrice",
                  0,
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalOrders: 1,
            totalDeliveriesMade: 1,
            totalItemsDelivered: 1,
            totalDeliveredItemPrice: 1,
            totalDeliveryPrice: 1,
            // Compute average, avoid division by zero
            averageDeliveredItemPrice: {
              $cond: [
                { $eq: ["$totalItemsDelivered", 0] },
                0,
                {
                  $divide: ["$totalDeliveredItemPrice", "$totalItemsDelivered"],
                },
              ],
            },
          },
        },
      ],
    },
  },
  // After $facet we have fields { activeOrders: [...], totals: [ { ... } ] }
  // Unwind the totals array to extract its fields
  {
    $project: {
      activeOrders: 1,
      totals: { $arrayElemAt: ["$totals", 0] },
    },
  },
  // Final projection shaping the output document
  {
    $project: {
      _id: 0,
      activeOrders: 1,
      totalOrders: "$totals.totalOrders",
      totalDeliveriesMade: "$totals.totalDeliveriesMade",
      totalItemsDelivered: "$totals.totalItemsDelivered",
      totalDeliveredItemPrice: "$totals.totalDeliveredItemPrice",
      totalDeliveryPrice: "$totals.totalDeliveryPrice",
      averageDeliveredItemPrice: "$totals.averageDeliveredItemPrice",
    },
  },
];
