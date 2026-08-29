import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from "react-router";
import {
  Wifi,
  UtensilsCrossed,
  Waves,
  Sparkles,
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Calendar,
  Users,
  BedDouble,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const features = [
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Complimentary ultra-fast internet throughout the property." },
  { icon: UtensilsCrossed, title: "Fine Dining", desc: "World-class restaurants with award-winning chefs." },
  { icon: Waves, title: "Infinity Pool", desc: "Heated rooftop pool with panoramic skyline views." },
  { icon: Sparkles, title: "Luxury Spa", desc: "Full-service spa with rejuvenating treatments." },
  { icon: ShieldCheck, title: "24/7 Security", desc: "Round-the-clock security for your peace of mind." },
  { icon: BedDouble, title: "Premium Linens", desc: "Egyptian cotton sheets and hypoallergenic pillows." },
];

const testimonials = [
  { name: "Sarah Mitchell", role: "Travel Blogger", rating: 5, text: "An absolutely stunning hotel. The attention to detail in every corner made our anniversary trip unforgettable. The Ocean Suite was breathtaking." },
  { name: "James Rodriguez", role: "Business Executive", rating: 5, text: "Best hotel I've stayed at for business. The executive rooms are perfectly designed for productivity, and the staff anticipated every need." },
  { name: "Priya Sharma", role: "Wedding Planner", rating: 5, text: "Luxe Haven hosted our client's wedding and it was magical. The venue, the service, the food — everything was absolutely perfect." },
];

function NavBar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BedDouble className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Luxe Haven
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#rooms" className="hover:text-foreground transition-colors">Rooms</a>
            <a href="#amenities" className="hover:text-foreground transition-colors">Amenities</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="cursor-pointer text-sm font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="cursor-pointer text-sm font-medium bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85"
          alt="Luxury hotel exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
              Rated #1 Hotel in the Region
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Where Luxury
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
              Meets Serenity
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Experience unparalleled elegance at Luxe Haven. Premium rooms, world-class amenities,
            and unforgettable moments await your arrival.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10"
        >
          <Link to="/auth">
            <Button
              size="lg"
              className="cursor-pointer bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-xl shadow-2xl shadow-black/20"
            >
              Start Your Reservation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { label: "Luxury Rooms", value: "120+" },
            { label: "Happy Guests", value: "10K+" },
            { label: "Years of Service", value: "15+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="amenities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-semibold tracking-widest uppercase text-accent"
          >
            World-Class Amenities
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Everything You Need & More
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            From the moment you arrive, every detail has been thoughtfully curated
            to ensure an extraordinary stay.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="group h-full border-border/60 bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomsSection() {
  const rooms = useQuery(api.rooms.list, { availableOnly: true });

  const roomData = rooms?.slice(0, 3) ?? [];
  const placeholderRooms = [
    {
      name: "Deluxe King Room",
      type: "Deluxe",
      price: 120,
      capacity: 2,
      imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
      amenities: ["Free Wi-Fi", "Mini Bar", "Room Service"],
    },
    {
      name: "Premium Ocean Suite",
      type: "Suite",
      price: 280,
      capacity: 3,
      imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
      amenities: ["Ocean View", "Balcony", "Jacuzzi"],
    },
    {
      name: "Royal Penthouse",
      type: "Penthouse",
      price: 550,
      capacity: 4,
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      amenities: ["Terrace", "Butler Service", "Penthouse View"],
    },
  ];

  const displayRooms = roomData.length > 0 ? roomData : placeholderRooms;

  return (
    <section id="rooms" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-semibold tracking-widest uppercase text-accent"
          >
            Our Rooms & Suites
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Curated for Comfort
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Each room is a masterpiece of design and comfort, tailored to make
            your stay truly exceptional.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="group overflow-hidden border-border/60 bg-white rounded-2xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {room.type}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{room.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Up to {room.capacity}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div>
                      <span className="text-2xl font-bold text-foreground">${room.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">/ night</span>
                    </div>
                    <Link to="/auth">
                      <Button
                        size="sm"
                        className="cursor-pointer bg-primary hover:bg-primary/90 rounded-xl px-5"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          className="text-center mt-12"
        >
          <Link to="/auth">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer rounded-xl border-border/70 px-8 font-medium"
            >
              View All Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-semibold tracking-widest uppercase text-accent"
          >
            Guest Experiences
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Loved by Travelers Worldwide
          </motion.h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full border-border/60 bg-white rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Ready for an Unforgettable Stay?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 text-white/60 text-lg leading-relaxed"
          >
            Join thousands of guests who have made Luxe Haven their home away from home.
            Your perfect escape is just one click away.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/auth">
              <Button
                size="lg"
                className="cursor-pointer bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-xl"
              >
                Book Your Room
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+1234567890">
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white/60 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <BedDouble className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Luxe Haven</span>
            </div>
            <p className="text-sm leading-relaxed">
              A premium hotel experience crafted for the discerning traveler.
              Since 2011.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Suites</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Guest Reviews</a></li>
              <li><Link to="/auth" className="hover:text-white transition-colors">Make a Reservation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                123 Luxury Avenue, Metro City
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +1 (234) 567-890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                reservations@luxehaven.com
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-2.5 text-sm">
              <li>Front Desk: 24/7</li>
              <li>Restaurant: 6 AM – 11 PM</li>
              <li>Spa: 9 AM – 9 PM</li>
              <li>Pool: 6 AM – 10 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs">
          <p>© 2026 Luxe Haven Hotels. All rights reserved. BCA 6th Semester Project.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <RoomsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </motion.div>
  );
}
