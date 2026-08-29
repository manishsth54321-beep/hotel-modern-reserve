import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  BedDouble,
  LogOut,
  Users,
  MapPin,
  Calendar,
  Search,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Home,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router";

function seedData(mutation: ReturnType<typeof useMutation<typeof api.rooms.seed>>) {
  return mutation();
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const rooms = useQuery(api.rooms.list, {});
  const reservations = user
    ? useQuery(api.reservations.listByUser, { userId: user._id })
    : undefined;
  const createReservation = useMutation(api.reservations.create);
  const cancelReservation = useMutation(api.reservations.cancel);
  const seedRooms = useMutation(api.rooms.seed);

  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingForm, setBookingForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    guestName: user?.name ?? "",
    guestEmail: user?.email ?? "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredRooms =
    rooms?.filter((room) => {
      const matchesType = filterType === "all" || room.type === filterType;
      const matchesSearch =
        !searchTerm ||
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch && room.available;
    }) ?? [];

  const roomTypes = [...new Set((rooms ?? []).map((r) => r.type))];

  const calculateNights = () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 0;
    const start = new Date(bookingForm.checkIn);
    const end = new Date(bookingForm.checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleBook = async () => {
    if (!selectedRoom || !user) return;
    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    if (new Date(bookingForm.checkOut) <= new Date(bookingForm.checkIn)) {
      toast.error("Check-out must be after check-in.");
      return;
    }
    if (!bookingForm.guestName || !bookingForm.guestEmail) {
      toast.error("Please fill in guest details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const nights = calculateNights();
      const totalPrice = nights * selectedRoom.price;
      await createReservation({
        userId: user._id,
        roomId: selectedRoom._id,
        guestName: bookingForm.guestName,
        guestEmail: bookingForm.guestEmail,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        guests: parseInt(bookingForm.guests),
        totalPrice,
        specialRequests: bookingForm.specialRequests || undefined,
      });
      toast.success("Reservation confirmed! 🎉");
      setBookingOpen(false);
      setSelectedRoom(null);
      setBookingForm({
        checkIn: "",
        checkOut: "",
        guests: "1",
        guestName: user?.name ?? "",
        guestEmail: user?.email ?? "",
        specialRequests: "",
      });
    } catch {
      toast.error("Failed to create reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (reservationId: string) => {
    try {
      await cancelReservation({ reservationId: reservationId as any });
      toast.success("Reservation cancelled.");
    } catch {
      toast.error("Failed to cancel reservation.");
    }
  };

  const openBooking = (room: any) => {
    setSelectedRoom(room);
    setBookingOpen(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const result = await seedRooms();
      if (result === "seeded") {
        toast.success("Sample rooms added successfully!");
      } else {
        toast.info("Rooms already exist in the database.");
      }
    } catch {
      toast.error("Failed to seed rooms.");
    } finally {
      setSeeding(false);
    }
  };

  const nights = calculateNights();
  const totalPrice = nights * (selectedRoom?.price ?? 0);

  const activeCount =
    reservations?.filter(
      (r) => r.status === "confirmed" || r.status === "pending",
    ).length ?? 0;

  const statusColors: Record<string, string> = {
    confirmed:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending:
      "bg-amber-50 text-amber-700 border-amber-200",
    cancelled:
      "bg-red-50 text-red-700 border-red-200",
    completed:
      "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <BedDouble className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight text-foreground">
                  Luxe Haven
                </span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {user?.name ?? "Guest"}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5"
                onClick={handleSignOut}
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {activeCount > 0
              ? `You have ${activeCount} active reservation${activeCount > 1 ? "s" : ""}.`
              : "Find your perfect room and book your stay."}
          </p>
        </motion.div>

        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="bg-white border border-border/60 rounded-xl p-1 h-auto">
            <TabsTrigger
              value="rooms"
              className="cursor-pointer gap-2 rounded-lg px-5 py-2.5 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Home className="w-4 h-4" />
              Browse Rooms
            </TabsTrigger>
            <TabsTrigger
              value="reservations"
              className="cursor-pointer gap-2 rounded-lg px-5 py-2.5 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Calendar className="w-4 h-4" />
              My Reservations
              {activeCount > 0 && (
                <span className="ml-1 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {activeCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-border/60 rounded-xl"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  className="cursor-pointer rounded-xl"
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                {roomTypes.map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "default" : "outline"}
                    size="sm"
                    className="cursor-pointer rounded-xl"
                    onClick={() => setFilterType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Room Grid */}
            {!rooms || rooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No rooms yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Load sample room data to get started with your hotel reservation system.
                </p>
                <Button
                  onClick={handleSeed}
                  disabled={seeding}
                  className="cursor-pointer rounded-xl px-6"
                >
                  {seeding ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Load Sample Rooms
                </Button>
              </motion.div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Filter className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No rooms match your filters.</p>
                <p className="text-sm mt-1">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, i) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group overflow-hidden border-border/60 bg-white rounded-2xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 h-full flex flex-col">
                      <div className="relative h-52 overflow-hidden">
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
                        <div className="absolute top-3 right-3">
                          <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Available
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-foreground mb-1">
                          {room.name}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Up to {room.capacity}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Floor {room.floor}
                          </span>
                          <span>{room.size}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                          {room.amenities.slice(0, 4).map((a: string) => (
                            <span
                              key={a}
                              className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                            >
                              {a}
                            </span>
                          ))}
                          {room.amenities.length > 4 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{room.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <div>
                            <span className="text-xl font-bold text-foreground">
                              ${room.price}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              / night
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="cursor-pointer bg-primary hover:bg-primary/90 rounded-xl px-5"
                            onClick={() => openBooking(room)}
                          >
                            Book
                            <ArrowRight className="ml-1 w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-4">
            {!reservations ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No reservations yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Browse our rooms and make your first booking.
                </p>
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-xl"                    onClick={() => {
                      const el = document.querySelector('[value="rooms"]');
                      if (el instanceof HTMLElement) el.click();
                    }}
                >
                  Browse Rooms
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((res, i) => (
                  <motion.div
                    key={res._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="border-border/60 bg-white rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {res.room && (
                            <div className="md:w-48 h-40 md:h-auto shrink-0">
                              <img
                                src={res.room.imageUrl}
                                alt={res.room.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-foreground">
                                  {res.room?.name ?? "Room"}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Booking ID: {res._id.slice(-8)}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs capitalize ${statusColors[res.status]}`}
                              >
                                {res.status === "confirmed" && (
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                )}
                                {res.status === "cancelled" && (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {res.status === "pending" && (
                                  <Clock className="w-3 h-3 mr-1" />
                                )}
                                {res.status}
                              </Badge>
                            </div>
                            <Separator className="mb-3" />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs mb-0.5">
                                  Check-in
                                </p>
                                <p className="font-medium text-foreground">
                                  {new Date(res.checkIn).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs mb-0.5">
                                  Check-out
                                </p>
                                <p className="font-medium text-foreground">
                                  {new Date(res.checkOut).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs mb-0.5">
                                  Guests
                                </p>
                                <p className="font-medium text-foreground">{res.guests}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs mb-0.5">
                                  Total
                                </p>
                                <p className="font-bold text-foreground">
                                  ${res.totalPrice}
                                </p>
                              </div>
                            </div>
                            {(res.status === "confirmed" || res.status === "pending") && (
                              <div className="mt-4 flex justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="cursor-pointer text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl"
                                  onClick={() => handleCancel(res._id)}
                                >
                                  <X className="w-3.5 h-3.5 mr-1" />
                                  Cancel Reservation
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Book {selectedRoom?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedRoom?.type} · Up to {selectedRoom?.capacity} guests · ${selectedRoom?.price}/night
            </DialogDescription>
          </DialogHeader>

          {selectedRoom && (
            <div className="space-y-5 mt-2">
              <div className="relative h-40 rounded-xl overflow-hidden">
                <img
                  src={selectedRoom.imageUrl}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Check-in</Label>
                  <Input
                    type="date"
                    value={bookingForm.checkIn}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, checkIn: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Check-out</Label>
                  <Input
                    type="date"
                    value={bookingForm.checkOut}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, checkOut: e.target.value })
                    }
                    min={bookingForm.checkIn || new Date().toISOString().split("T")[0]}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Guests</Label>
                  <Select
                    value={bookingForm.guests}
                    onValueChange={(v) =>
                      setBookingForm({ ...bookingForm, guests: v })
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: selectedRoom.capacity }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1} {i === 0 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Nights</Label>
                  <Input
                    readOnly
                    value={nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "—"}
                    className="rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={bookingForm.guestName}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, guestName: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={bookingForm.guestEmail}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, guestEmail: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Special Requests <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    placeholder="Late check-in, extra pillows, dietary needs..."
                    value={bookingForm.specialRequests}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        specialRequests: e.target.value,
                      })
                    }
                    rows={2}
                    className="rounded-xl resize-none"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Price</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${totalPrice > 0 ? totalPrice : "—"}
                  </p>
                </div>
                <Button
                  onClick={handleBook}
                  disabled={
                    isSubmitting ||
                    nights === 0 ||
                    !bookingForm.guestName ||
                    !bookingForm.guestEmail
                  }
                  className="cursor-pointer rounded-xl px-8"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  )}
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
