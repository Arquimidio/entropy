export enum PresenceSocketOperation {
    Event = 0,
    Hello = 1,
    Initialize = 2,
    Hearbeat = 3
}

export interface PresenceData {
    kv: {};
    spotify?: SpotifyData;
    discord_user: DiscordUser;
    activities: Activity[];
    discord_status: string;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
  }
  
  interface SpotifyData {
    track_id: string;
    timestamps: Timestamps;
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
  }
  
  interface Timestamps {
    start: number;
    end: number;
  }
  
  interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    bot: boolean;
    clan: null;
    global_name: string;
    avatar_decoration_data: null;
    display_name: string;
    public_flags: number;
  }
  
  interface Activity {
    id: string;
    name: string;
    type: number;
    state?: string;
    emoji?: Emoji;
    created_at: number;
    flags?: number; 
    session_id?: string; 
    details?: string;
    timestamps?: Timestamps;
    assets?: {
      large_image?: string;
      large_text?: string;
    };
    sync_id?: string;
    party?: {
      id: string;
    };
  }
  
  interface Emoji {
    id: string;
    name: string;
    animated: boolean;
  }
  