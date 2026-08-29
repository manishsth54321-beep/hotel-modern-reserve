import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
    }).index("email", ["email"]),

    rooms: defineTable({
      name: v.string(),
      type: v.string(),
      price: v.number(),
      capacity: v.number(),
      description: v.string(),
      amenities: v.array(v.string()),
      imageUrl: v.string(),
      available: v.boolean(),
      floor: v.number(),
      size: v.string(),
    }).index("by_type", ["type"])
      .index("by_available", ["available"]),

    reservations: defineTable({
      userId: v.string(),
      roomId: v.id("rooms"),
      guestName: v.string(),
      guestEmail: v.string(),
      checkIn: v.string(),
      checkOut: v.string(),
      guests: v.number(),
      totalPrice: v.number(),
      status: v.union(
        v.literal("confirmed"),
        v.literal("pending"),
        v.literal("cancelled"),
        v.literal("completed"),
      ),
      specialRequests: v.optional(v.string()),
      createdAt: v.number(),
    }).index("by_user", ["userId"])
      .index("by_room", ["roomId"])
      .index("by_status", ["status"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
