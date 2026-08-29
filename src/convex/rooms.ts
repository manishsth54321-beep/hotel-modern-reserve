import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    type: v.optional(v.string()),
    availableOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let rooms;
    if (args.type) {
      rooms = await ctx.db
        .query("rooms")
        .withIndex("by_type", (q) => q.eq("type", args.type!))
        .collect();
    } else if (args.availableOnly) {
      rooms = await ctx.db
        .query("rooms")
        .withIndex("by_available", (q) => q.eq("available", true))
        .collect();
    } else {
      rooms = await ctx.db.query("rooms").collect();
    }
    return rooms;
  },
});

export const get = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.roomId);
  },
});

export const getRoomTypes = query({
  handler: async (ctx) => {
    const rooms = await ctx.db.query("rooms").collect();
    const types = [...new Set(rooms.map((r) => r.type))];
    return types;
  },
});

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("rooms").first();
    if (existing) return "already_seeded";

    const rooms = [
      {
        name: "Deluxe King Room",
        type: "Deluxe",
        price: 120,
        capacity: 2,
        description: "Elegant room featuring a plush king-size bed, marble bathroom, and panoramic city views. Perfect for couples seeking a romantic getaway.",
        amenities: ["Free Wi-Fi", "Mini Bar", "Room Service", "City View", "Air Conditioning", "Smart TV"],
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
        available: true,
        floor: 5,
        size: "35 m²",
      },
      {
        name: "Premium Ocean Suite",
        type: "Suite",
        price: 280,
        capacity: 3,
        description: "Spacious suite with separate living area, private balcony overlooking the ocean, and luxury bathroom with rain shower and soaking tub.",
        amenities: ["Free Wi-Fi", "Ocean View", "Balcony", "Living Room", "Mini Bar", "Room Service", "Jacuzzi", "Smart TV"],
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        available: true,
        floor: 12,
        size: "65 m²",
      },
      {
        name: "Executive Twin Room",
        type: "Executive",
        price: 150,
        capacity: 2,
        description: "Modern twin room with two queen beds, ergonomic workspace, and premium amenities ideal for business travelers.",
        amenities: ["Free Wi-Fi", "Work Desk", "Mini Bar", "Air Conditioning", "Room Service", "Smart TV", "Coffee Maker"],
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
        available: true,
        floor: 8,
        size: "40 m²",
      },
      {
        name: "Royal Penthouse",
        type: "Penthouse",
        price: 550,
        capacity: 4,
        description: "The crown jewel of Luxe Haven — a breathtaking penthouse with 360° skyline views, private terrace, butler service, and opulent furnishings.",
        amenities: ["Free Wi-Fi", "Private Terrace", "Butler Service", "Penthouse View", "Jacuzzi", "Smart TV", "Dining Area", "Premium Mini Bar"],
        imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        available: true,
        floor: 20,
        size: "120 m²",
      },
      {
        name: "Garden View Standard",
        type: "Standard",
        price: 85,
        capacity: 2,
        description: "Comfortable and affordable room with lush garden views, featuring all essential amenities for a pleasant stay.",
        amenities: ["Free Wi-Fi", "Garden View", "Air Conditioning", "Coffee Maker", "Smart TV"],
        imageUrl: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&q=80",
        available: true,
        floor: 2,
        size: "28 m²",
      },
      {
        name: "Family Connecting Rooms",
        type: "Family",
        price: 220,
        capacity: 5,
        description: "Two interconnected rooms designed for families, with a shared living space, kid-friendly amenities, and plenty of room to spread out.",
        amenities: ["Free Wi-Fi", "Connecting Rooms", "Living Area", "Mini Bar", "Room Service", "Smart TV", "Kid-Friendly"],
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
        available: true,
        floor: 6,
        size: "70 m²",
      },
    ];

    for (const room of rooms) {
      await ctx.db.insert("rooms", room);
    }
    return "seeded";
  },
});
