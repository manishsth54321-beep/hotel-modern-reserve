// @ts-nocheck
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    layout: "title",
    title: "Luxe Haven",
    subtitle: "Hotel Reservation System",
    meta: "BCA 6th Semester Project",
    author: "Manish Byanju",
    year: "2026",
  },
  {
    id: 2,
    layout: "section",
    number: "01",
    title: "Introduction",
    content:
      "The hotel industry is rapidly moving towards digital solutions. Traditional manual booking systems are inefficient, error-prone, and fail to meet modern customer expectations.\n\nLuxe Haven is a full-stack web-based hotel reservation system that allows guests to browse rooms, make bookings, and manage reservations — all from a modern, responsive interface.",
  },
  {
    id: 3,
    layout: "two-column",
    number: "02",
    title: "Problem Statement",
    left: {
      heading: "The Problem",
      points: [
        "Manual reservation processes lead to double bookings",
        "No real-time room availability tracking",
        "Difficult for customers to browse and compare rooms",
        "Paper-based records are hard to manage and search",
        "No centralized system for guest information",
      ],
    },
    right: {
      heading: "Our Solution",
      points: [
        "Real-time room availability with live database",
        "Online booking with instant confirmation",
        "Room comparison with filters and search",
        "Digital records with search and management",
        "Guest dashboard with booking history",
      ],
    },
  },
  {
    id: 4,
    layout: "bullets",
    number: "03",
    title: "Objectives",
    points: [
      "Build a responsive web application for hotel room reservations",
      "Implement real-time room availability and booking system",
      "Provide user authentication and personalized dashboards",
      "Enable room browsing with filters by type, price, and capacity",
      "Create an admin-friendly backend for data management",
      "Apply modern UI/UX design principles with a premium aesthetic",
    ],
  },
  {
    id: 5,
    layout: "techstack",
    number: "04",
    title: "Technology Stack",
    categories: [
      {
        label: "Frontend",
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
      },
      {
        label: "Backend",
        items: ["Convex (Serverless)", "Convex Auth", "Real-time DB"],
      },
      {
        label: "UI Components",
        items: ["shadcn/ui", "Radix UI", "Lucide Icons", "React Router"],
      },
      {
        label: "Tools",
        items: ["Git & GitHub", "VS Code", "Freebuff Platform", "Bun / npm"],
      },
    ],
  },
  {
    id: 6,
    layout: "architecture",
    number: "05",
    title: "System Architecture",
    layers: [
      { label: "User Interface", desc: "React + TypeScript + Tailwind CSS", color: "#3b82f6" },
      { label: "Routing & Auth", desc: "React Router + Convex Auth (OTP / Anonymous)", color: "#8b5cf6" },
      { label: "State Management", desc: "Convex React Hooks (Reactive Queries & Mutations)", color: "#ec4899" },
      { label: "Backend / API", desc: "Convex Serverless Functions (Queries + Mutations)", color: "#f59e0b" },
      { label: "Database", desc: "Convex Cloud Database (Real-time NoSQL)", color: "#10b981" },
    ],
  },
  {
    id: 7,
    layout: "database",
    number: "06",
    title: "Database Schema",
    tables: [
      {
        name: "users",
        fields: [
          "name (string)",
          "email (string)",
          "image (string)",
          "role (admin | user | member)",
          "isAnonymous (boolean)",
        ],
        note: "Managed by Convex Auth",
      },
      {
        name: "rooms",
        fields: [
          "name, type, price, capacity",
          "description, amenities[]",
          "imageUrl, available",
          "floor, size",
        ],
        note: "Indexed by type & availability",
      },
      {
        name: "reservations",
        fields: [
          "userId, roomId, guestName",
          "guestEmail, checkIn, checkOut",
          "guests, totalPrice, status",
          "specialRequests, createdAt",
        ],
        note: "Indexed by user, room & status",
      },
    ],
  },
  {
    id: 8,
    layout: "features",
    number: "07",
    title: "Key Features",
    featureGroups: [
      {
        category: "Landing Page",
        features: ["Hero section with cinematic imagery", "Room showcase with pricing", "Amenities grid", "Guest testimonials", "Call-to-action booking flow"],
      },
      {
        category: "Dashboard",
        features: ["Room browsing with search & filters", "Booking dialog with date picker", "Real-time price calculation", "My Reservations tab", "Cancel reservation support"],
      },
      {
        category: "Backend",
        features: ["Real-time reactive queries", "Serverless mutations", "Room availability checking", "User authentication (OTP)", "Data seeding for demo"],
      },
    ],
  },
  {
    id: 9,
    layout: "screenshots",
    number: "08",
    title: "Project Screenshots",
    descriptions: [
      { label: "Landing Page", desc: "Hero section with luxury hotel imagery, navigation, and booking CTA" },
      { label: "Room Showcase", desc: "Featured rooms with pricing, capacity, and amenities" },
      { label: "Dashboard", desc: "Authenticated workspace with room browsing and reservation tabs" },
      { label: "Booking Dialog", desc: "Date selection, guest details, and price calculation" },
    ],
  },
  {
    id: 10,
    layout: "code",
    number: "09",
    title: "Key Code — Reservation Schema",
    code: `// Convex Schema Definition
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
}).index("by_type", ["type"]),

reservations: defineTable({
  userId: v.string(),
  roomId: v.id("rooms"),
  guestName: v.string(),
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
}).index("by_user", ["userId"])`,
  },
  {
    id: 11,
    layout: "future",
    number: "10",
    title: "Future Enhancements",
    points: [
      "Payment Gateway Integration — Online payment via Stripe / eSewa / Khalti",
      "Email Confirmations — Automated booking confirmation emails via Resend",
      "Admin Panel — Room management, reservation oversight, analytics dashboard",
      "Room Image Gallery — Multiple images per room with carousel view",
      "Guest Reviews & Ratings — Post-stay review system",
      "Mobile App — React Native version for iOS and Android",
    ],
  },
  {
    id: 12,
    layout: "conclusion",
    number: "11",
    title: "Conclusion",
    content:
      "Luxe Haven demonstrates a modern full-stack web application using cutting-edge technologies. The project showcases:\n\n✅ Real-time serverless architecture with Convex\n✅ Modern React with TypeScript for type safety\n✅ Responsive, accessible UI with Tailwind CSS\n✅ Complete CRUD operations for hotel reservations\n✅ User authentication and data management\n\nThis project provides a solid foundation for understanding modern web development practices and can be extended with payment integration and mobile support.",
  },
  {
    id: 13,
    layout: "thankyou",
    title: "Thank You",
    subtitle: "Questions & Discussion",
    author: "Manish Byanju",
    course: "BCA 6th Semester",
    year: "2026",
  },
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setCurrent((p) => Math.min(p + 1, total - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        setCurrent((p) => Math.max(p - 1, 0));
      }
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [total]);

  const slide = slides[current] as any;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans select-none">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Slide number */}
      <div className="fixed bottom-6 right-8 z-50 text-white/30 text-sm font-mono">
        {current + 1} / {total}
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-6 left-8 z-50 text-white/20 text-xs">
        ← → Navigate &nbsp;|&nbsp; F Fullscreen
      </div>

      {/* Slide content */}
      <div className="min-h-screen flex items-center justify-center p-8 sm:p-16">
        <div className="w-full max-w-5xl">
          {slide.layout === "title" && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm text-white/60">{slide.meta}</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                  {slide.title}
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-white/50 font-light mb-8">{slide.subtitle}</p>
              <div className="text-white/30 text-sm">
                {slide.author} &nbsp;·&nbsp; {slide.year}
              </div>
            </div>
          )}

          {slide.layout === "section" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">{slide.title}</h2>
              <div className="text-lg text-white/60 leading-relaxed whitespace-pre-line max-w-3xl">
                {slide.content}
              </div>
            </div>
          )}

          {slide.layout === "two-column" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { data: slide.left, border: "border-red-500/30", bg: "bg-red-500/5" },
                  { data: slide.right, border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
                ].map((col) => (
                  <div key={col.data.heading} className={`${col.bg} border ${col.border} rounded-2xl p-6`}>
                    <h3 className="text-xl font-semibold mb-4">{col.data.heading}</h3>
                    <ul className="space-y-2.5">
                      {col.data.points.map((p) => (
                        <li key={p} className="text-sm text-white/60 flex gap-2">
                          <span className="text-amber-400 mt-0.5">→</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "bullets" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {slide.points.map((p, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <span className="text-amber-400 font-mono text-sm mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/70 leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "techstack" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {slide.categories.map((cat) => (
                  <div key={cat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                      {cat.label}
                    </h3>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item} className="text-sm text-white/60 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "architecture" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="space-y-3 max-w-2xl mx-auto">
                {slide.layers.map((layer, i) => (
                  <div key={layer.label} className="flex items-center gap-4">
                    <div
                      className="w-full rounded-xl p-4 border flex items-center justify-between"
                      style={{
                        backgroundColor: `${layer.color}10`,
                        borderColor: `${layer.color}30`,
                      }}
                    >
                      <div>
                        <span className="font-semibold text-sm">{layer.label}</span>
                        <span className="text-white/40 text-sm ml-3">{layer.desc}</span>
                      </div>
                    </div>
                    {i < slide.layers.length - 1 && (
                      <div className="absolute -mt-8 ml-8 text-white/20">↓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "database" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {slide.tables.map((table) => (
                  <div
                    key={table.name}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <div className="bg-amber-400/10 border-b border-amber-400/20 px-5 py-3">
                      <h3 className="font-mono font-bold text-amber-400">{table.name}</h3>
                    </div>
                    <div className="p-5">
                      <ul className="space-y-1.5 mb-4">
                        {table.fields.map((f) => (
                          <li key={f} className="text-xs text-white/60 font-mono">
                            {f}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-white/30 italic">{table.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "features" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {slide.featureGroups.map((group) => (
                  <div key={group.category} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
                      {group.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {group.features.map((f) => (
                        <li key={f} className="text-sm text-white/60 flex gap-2">
                          <span className="text-emerald-400 shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "screenshots" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {slide.descriptions.map((d) => (
                  <div
                    key={d.label}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[140px]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-3">
                      <span className="text-amber-400 text-lg">📸</span>
                    </div>
                    <h4 className="font-semibold mb-1">{d.label}</h4>
                    <p className="text-xs text-white/40">{d.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/30 text-sm mt-6 italic">
                *(Show live demo or paste screenshots here)*
              </p>
            </div>
          )}

          {slide.layout === "code" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-emerald-300/80 font-mono leading-relaxed whitespace-pre">
                  {slide.code}
                </pre>
              </div>
            </div>
          )}

          {slide.layout === "future" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-10">{slide.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {slide.points.map((p, i) => (
                  <div key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    <span className="text-amber-400 mt-0.5 shrink-0">🚀</span>
                    <span className="text-sm text-white/60 leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === "conclusion" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amber-400 font-mono text-sm">{slide.number}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>
              <div className="text-lg text-white/60 leading-relaxed whitespace-pre-line max-w-3xl">
                {slide.content}
              </div>
            </div>
          )}

          {slide.layout === "thankyou" && (
            <div className="text-center">
              <h1 className="text-6xl sm:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                  {slide.title}
                </span>
              </h1>
              <p className="text-2xl text-white/40 mb-10">{slide.subtitle}</p>
              <div className="inline-flex flex-col gap-1 text-white/30 text-sm">
                <span>{slide.author}</span>
                <span>{slide.course} · {slide.year}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-lg text-sm transition cursor-pointer"
        >
          ← Prev
        </button>
        <button
          onClick={() => setCurrent(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-lg text-sm transition cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
