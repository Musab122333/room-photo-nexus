import { Link } from "react-router-dom";
import { Calendar, Users, Camera, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Room {
  id: string;
  name: string;
  description: string;
  date: string;
  coverImage: string;
  photoCount: number;
  memberCount: number;
  isOwner: boolean;
  createdBy: string;
}

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link to={`/room/${room.id}`}>
      <Card className="room-card group">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Camera className="w-12 h-12 text-primary/60" />
          </div>
          
          {/* Owner Badge */}
          {room.isOwner && (
            <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Owner
            </div>
          )}

          {/* Photo Count Badge */}
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Camera className="w-3 h-3" />
            {room.photoCount}
          </div>
        </div>

        <CardContent className="p-6">
          {/* Room Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {room.name}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2">
              {room.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(room.date)}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {room.memberCount}
                </div>
              </div>
            </div>

            {/* Created By */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Created by {room.createdBy}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RoomCard;