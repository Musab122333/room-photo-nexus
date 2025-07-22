import { useState } from "react";
import { Plus, Calendar, Users, Camera, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoomCard from "./RoomCard";
import CreateRoomModal from "./CreateRoomModal";

// Mock data for rooms
const mockRooms = [
  {
    id: "1",
    name: "Sarah's Wedding",
    description: "Beautiful ceremony and reception photos",
    date: "2024-03-15",
    coverImage: "/api/placeholder/400/300",
    photoCount: 142,
    memberCount: 28,
    isOwner: false,
    createdBy: "Sarah Johnson"
  },
  {
    id: "2", 
    name: "Family Vacation 2024",
    description: "Our amazing trip to the mountains",
    date: "2024-02-20",
    coverImage: "/api/placeholder/400/300",
    photoCount: 89,
    memberCount: 6,
    isOwner: true,
    createdBy: "You"
  },
  {
    id: "3",
    name: "Company Retreat",
    description: "Team building and fun activities",
    date: "2024-01-10",
    coverImage: "/api/placeholder/400/300",
    photoCount: 67,
    memberCount: 15,
    isOwner: false,
    createdBy: "Mike Chen"
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockRooms.filter(room =>
      room.name.toLowerCase().includes(query.toLowerCase()) ||
      room.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="hero-gradient border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Manage your photo galleries and discover new memories
            </p>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filter Button */}
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {/* Create Room Button */}
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="gap-2 hover-lift"
                size="lg"
              >
                <Plus className="h-4 w-4" />
                Create Room
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">298</div>
              <p className="text-xs text-muted-foreground">
                +12 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rooms</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockRooms.length}</div>
              <p className="text-xs text-muted-foreground">
                2 created by you
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Detected</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                Photos with your face
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rooms Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Rooms</h2>
          
          {filteredRooms.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No rooms found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search" : "Create your first room to get started"}
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                Create Room
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onRoomCreated={(room) => {
          setFilteredRooms([room, ...filteredRooms]);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default Dashboard;