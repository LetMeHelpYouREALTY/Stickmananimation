import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Newsletter Subscribers schema
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  consentGiven: boolean("consent_given").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  name: true,
  email: true,
  consentGiven: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// YouTube Videos schema
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  viewCount: integer("view_count").default(0),
  featured: boolean("featured").default(false),
  showreel: boolean("showreel").default(false),
  publishedAt: timestamp("published_at").notNull(),
});

export const insertVideoSchema = createInsertSchema(videos).pick({
  videoId: true,
  title: true,
  description: true,
  thumbnailUrl: true,
  category: true,
  duration: true,
  durationSeconds: true,
  viewCount: true,
  featured: true,
  showreel: true,
  publishedAt: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

// Original user schema (keeping for backwards compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
