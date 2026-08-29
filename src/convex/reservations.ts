import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const reservations = await ctx.db
      .query("reservations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    const enriched = await Promise.all(
      reservations.map(async (res) => {
        const room = await ctx.db.get(res.roomId);
        return { ...res, room };
      }),
    );
    return enriched;
  },
});

export const get = query({
  args: { reservationId: v.id("reservations") },
  handler: async (ctx, args) => {
    const reservation = await ctx.db.get(args.reservationId);
    if (!reservation) return null;
    const room = await ctx.db.get(reservation.roomId);
    return { ...reservation, room };
  },
});

export const checkAvailability = query({
  args: {
    roomId: v.id("rooms"),
    checkIn: v.string(),
    checkOut: v.string(),
  },
  handler: async (ctx, args) => {
    const reservations = await ctx.db
      .query("reservations")
      .withIndex("by_room", (q) => q.eq("roomId", args.roomId))
      .collect();

    const active = reservations.filter(
      (r) => r.status === "confirmed" || r.status === "pending",
    );

    for (const res of active) {
      if (args.checkIn < res.checkOut && args.checkOut > res.checkIn) {
        return false;
      }
    }
    return true;
  },
});

export const create = mutation({
  args: {
    userId: v.string(),
    roomId: v.id("rooms"),
    guestName: v.string(),
    guestEmail: v.string(),
    checkIn: v.string(),
    checkOut: v.string(),
    guests: v.number(),
    totalPrice: v.number(),
    specialRequests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("reservations", {
      ...args,
      status: "confirmed",
      createdAt: Date.now(),
    });
    return id;
  },
});

export const cancel = mutation({
  args: { reservationId: v.id("reservations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reservationId, { status: "cancelled" });
  },
});

export const listAll = query({
  handler: async (ctx) => {
    const reservations = await ctx.db.query("reservations").order("desc").collect();
    const enriched = await Promise.all(
      reservations.map(async (res) => {
        const room = await ctx.db.get(res.roomId);
        return { ...res, room };
      }),
    );
    return enriched;
  },
});
