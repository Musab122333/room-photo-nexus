import { useState } from "react";
import { Download, Calendar, Users, Sparkles, Filter, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";

// Mock data for AI-detected photos
const mockAIPhotos = [
  {
    id: "1",
    url: "/api/placeholder/300/300",
    roomName: "Sarah's Wedding",
    roomId: "1",
    uploadedBy: "Mike Johnson",
    date: "2024-03-15",
    confidence: 0.95
  },
  {
    id: "2", 
    url: "/api/placeholder/300/300",
    roomName: "Family Vacation",
    roomId: "2",
    uploadedBy: "Sarah Chen",
    date: "2024-02-20",
    confidence: 0.92
  },
  {
    id: "3",
    url: "/api/placeholder/300/300", 
    roomName: "Company Retreat",
    roomId: "3",
    uploadedBy: "Alex Kumar",
    date: "2024-01-10",
    confidence: 0.88
  },
  {
    id: "4",
    url: "/api/placeholder/300/300",
    roomName: "Sarah's Wedding", 
    roomId: "1",
    uploadedBy: "Emma Wilson",
    date: "2024-03-15",
    confidence: 0.91
  },
  {
    id: "5",
    url: "/api/placeholder/300/300",
    roomName: "Family Vacation",
    roomId: "2", 
    uploadedBy: "David Lee",
    date: "2024-02-20",
    confidence: 0.89
  },
  {
    id: "6",
    url: "/api/placeholder/300/300",
    roomName: "Birthday Party",
    roomId: "4",
    uploadedBy: "Lisa Wong",
    date: "2024-01-05",
    confidence: 0.93
  }
];

const AIGallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [filteredPhotos, setFilteredPhotos] = useState(mockAIPhotos);

  // Group photos by room
  const photosByRoom = filteredPhotos.reduce((acc, photo) => {
    if (!acc[photo.roomName]) {
      acc[photo.roomName] = [];
    }
    acc[photo.roomName].push(photo);
    return acc;
  }, {} as Record<string, typeof mockAIPhotos>);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockAIPhotos.filter(photo =>
      photo.roomName.toLowerCase().includes(query.toLowerCase()) ||
      photo.uploadedBy.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPhotos(filtered);
  };

  const downloadAllPhotos = () => {
    // TODO: Implement download functionality
    console.log("Downloading all AI-detected photos...");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} user={{ name: "John Doe" }} />
      
      {/* Header */}
      <div className="hero-gradient border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-fade-in">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Gallery</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">Your AI Gallery</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              We've automatically collected {mockAIPhotos.length} photos where you appear across all your rooms
            </p>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by room or person..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Button onClick={downloadAllPhotos} className="gap-2 hover-lift" size="lg">
                <Download className="h-4 w-4" />
                Download All ({filteredPhotos.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Photos Found</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredPhotos.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {Object.keys(photosByRoom).length} rooms
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(filteredPhotos.reduce((acc, p) => acc + p.confidence, 0) / filteredPhotos.length * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                AI detection accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rooms</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(photosByRoom).length}</div>
              <p className="text-xs text-muted-foreground">
                With your photos
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDate(Math.max(...filteredPhotos.map(p => new Date(p.date).getTime())).toString())}
              </div>
              <p className="text-xs text-muted-foreground">
                Most recent photo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Photo Gallery */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="rooms">By Room</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No photos found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? "Try adjusting your search" : "Upload more photos for AI to analyze"}
                </p>
              </div>
            ) : (
              <div className="photo-grid">
                {filteredPhotos.map((photo) => (
                  <div key={photo.id} className="photo-card group">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Image className="w-12 h-12 text-primary/60" />
                    </div>
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm font-medium truncate mb-1">
                          {photo.roomName}
                        </p>
                        <p className="text-white/80 text-xs">
                          By {photo.uploadedBy} • {Math.round(photo.confidence * 100)}% match
                        </p>
                      </div>
                    </div>

                    {/* Confidence Badge */}
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {Math.round(photo.confidence * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rooms" className="mt-8">
            <div className="space-y-8">
              {Object.entries(photosByRoom).map(([roomName, photos]) => (
                <div key={roomName} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{roomName}</h3>
                    <span className="text-muted-foreground text-sm">
                      {photos.length} photos
                    </span>
                  </div>
                  
                  <div className="photo-grid">
                    {photos.map((photo) => (
                      <div key={photo.id} className="photo-card group">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Image className="w-12 h-12 text-primary/60" />
                        </div>
                        
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-lg">
                          <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-sm font-medium truncate mb-1">
                              By {photo.uploadedBy}
                            </p>
                            <p className="text-white/80 text-xs">
                              {formatDate(photo.date)} • {Math.round(photo.confidence * 100)}% match
                            </p>
                          </div>
                        </div>

                        <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          {Math.round(photo.confidence * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIGallery;