import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const CreateTripDetail=mutation({
  args: {
    tripId:v.string(),
    uid:v.id('UserTable'),
    tripDetail:v.any()
  },
  handler:async(ctx,args)=>{
    const result =await ctx.db.insert('TripDetailTable',{
      tripDetail:args.tripDetail,
      tripId:args.tripId,
      uid:args.uid
    });
  }

})
export const GetUserTrips = query({
  args: {
    uid: v.id("UserTable"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("TripDetailTable")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .collect();

    return result;
  },
});

export const GetTripById = query({
  args: {
    tripid: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("TripDetailTable")
      .filter((q) => q.eq(q.field("tripId"), args.tripid))
      .first();

    return result;
  },
});
 