import { useState } from "react";
import { useParams } from "react-router-dom";
import { Upload, Download, Users, Calendar, Share, Image, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";

// Mock room data
const mockRoom = {
  id: "1",
  name: "Sarah's Wedding",
  description: "Beautiful ceremony and reception photos from our special day",
  date: "2024-03-15",
  coverImage: "/api/placeholder/800/400",
  memberCount: 28,
  isOwner: false,
  createdBy: "Sarah Johnson"
};

// Mock photos
const mockPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i.toString(),
  url: `/api/placeholder/300/300`,
  uploadedBy: ["Sarah Johnson", "Mike Chen", "Emma Wilson", "David Lee"][i % 4],
  uploadDate: "2024-03-15",
  tags: []
}));

const RoomGallery = () => {
  const { roomId } = useParams();
  const [selectedTab, setSelectedTab] = useState("all");
  const [showUploadArea, setShowUploadArea] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Room Header */}
      <div className="hero-gradient border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Room Cover */}
              <div className="w-full lg:w-80 aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Image className="w-16 h-16 text-primary/60" />
              </div>

              {/* Room Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{mockRoom.name}</h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                  {mockRoom.description}
                </p>

                {/* Room Meta */}
                <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(mockRoom.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{mockRoom.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <span>{mockPhotos.length} photos</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setShowUploadArea(!showUploadArea)}
                    className="gap-2 hover-lift"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photos
                  </Button>
                  <Button variant="outline" className="gap-2 hover-lift">
                    <Download className="w-4 h-4" />
                    Download All
                  </Button>
                  <Button variant="outline" className="gap-2 hover-lift">
                    <Share className="w-4 h-4" />
                    Invite Others
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {showUploadArea && (
        <div className="bg-muted/30 border-b border-border animate-fade-in">
          <div className="container mx-auto px-6 py-8">
            <Card>
              <CardContent className="p-8">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Photos</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your photos here or click to browse
                  </p>
                  <Button>Choose Files</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-4">
              <Input placeholder="Search photos..." className="w-64" />
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <div className="photo-grid">
              {mockPhotos.map((photo) => (
                <div key={photo.id} className="photo-card group">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Image className="w-12 h-12 text-primary/60" />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-lg">
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium truncate mb-1">
                        By {photo.uploadedBy}
                      </p>
                      <p className="text-white/80 text-xs">
                        {new Date(photo.uploadDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="people">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Face detection coming soon</h3>
              <p className="text-muted-foreground">
                We're working on AI-powered face detection to organize photos by people
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Recently Added</h3>
              <div className="photo-grid">
                {mockPhotos.slice(0, 6).map((photo) => (
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
                          Just now
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomGallery;