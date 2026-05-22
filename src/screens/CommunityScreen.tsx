import React, { useState } from 'react';
import { BadgeCheck, Heart, MessageCircle, Share2, Star, MapPin, PlayCircle } from 'lucide-react';

type Category = 'All' | 'Food & Drinks' | 'Homestays' | 'Tourist Spots';

interface Review {
  id: number;
  name: string;
  avatar: string;
  role: 'Local Insider' | 'Tour Guide' | 'Traveler';
  time: string;
  category: string;
  location: string;
  content: string;
  images?: string[];
  video?: string;
  likes: number;
  comments: number;
}

export function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<Category>('All');

  const categories: Category[] = ['All', 'Food & Drinks', 'Homestays', 'Tourist Spots'];

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Nguyen Lan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      role: 'Local Insider',
      time: '2 hours ago',
      category: 'Food & Drinks',
      location: 'Cafe Giảng, Hanoi',
      content: 'If you come to Hanoi, you cannot miss Egg Coffee at Cafe Giảng. The creamy egg foam mixed with strong Robusta coffee is an unforgettable experience. I have lived here for 20 years and still come here every weekend.',
      images: [
        'https://images.unsplash.com/photo-1534040385115-332cb8c66edd?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 342,
      comments: 45
    },
    {
      id: 2,
      name: 'Tran Minh',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      role: 'Tour Guide',
      time: '5 hours ago',
      category: 'Tourist Spots',
      location: 'Trang An, Ninh Binh',
      content: 'Just guided a lovely group through Trang An today. The weather was perfect! Pro tip: take route 3 for the best caves and temples. Arrive early at 7 AM to avoid the crowd and enjoy the misty mountains.',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      likes: 512,
      comments: 89
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      role: 'Traveler',
      time: '1 day ago',
      category: 'Homestays',
      location: 'Sapa Clay House, Lao Cai',
      content: 'Speechless. Waking up to the view of the Muong Hoa valley from my bed was magical. The host family cooked us authentic Hmong dishes for dinner. Highly recommend if you want to escape the city noise.',
      images: [
        'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 890,
      comments: 120
    },
    {
      id: 4,
      name: 'Hoang Nam',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      role: 'Tour Guide',
      time: '2 days ago',
      category: 'Food & Drinks',
      location: 'Bánh Mì Huỳnh Hoa, Ho Chi Minh',
      content: 'The line is always long, but it is worth it. This is considered the best Banh Mi in Saigon. A lot of meat, pate, and the bread is crispy. One loaf is enough for two people!',
      images: [
        'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 231,
      comments: 40
    },
    {
      id: 5,
      name: 'Mai Lee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      role: 'Local Insider',
      time: '3 days ago',
      category: 'Tourist Spots',
      location: 'Hoi An Ancient Town',
      content: 'Hoi An is most beautiful at night. Rent a bicycle and get lost in the small alleys. Grab a cup of Mót tea or sit by the river and release a lantern.',
      images: [
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 1240,
      comments: 211
    },
    {
      id: 6,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      role: 'Traveler',
      time: '4 days ago',
      category: 'Food & Drinks',
      location: 'Năm Đảnh Seafood, Da Nang',
      content: 'Navigating the maze of narrow alleys to find this place was an adventure in itself, but the seafood is incredibly fresh and cheap! The grilled scallops with scallion oil are a must-try. Be prepared for a very local, bustling vibe.',
      images: [
        'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 876,
      comments: 54
    },
    {
      id: 7,
      name: 'Dung Nguyen',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
      role: 'Tour Guide',
      time: '1 week ago',
      category: 'Tourist Spots',
      location: 'Ban Gioc Waterfall, Cao Bang',
      content: 'Took a small group to the majestic Ban Gioc Waterfall today. The dry season means the water is exceptionally clear and blue. We took the raft ride close to the falls — you will get wet but the view is breathtaking from that angle!',
      images: [
        'https://images.unsplash.com/photo-1526365922378-cbf376f9ef02?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1534040523277-2e118c7ea1b2?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 1542,
      comments: 130
    },
    {
      id: 8,
      name: 'Emma Wood',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      role: 'Traveler',
      time: '1 week ago',
      category: 'Homestays',
      location: 'The Kupid Hill, Dalat',
      content: 'A dreamy wooden cabin in the middle of pine forests. We spent the whole afternoon drinking hot chocolate and reading books by the large glass window. The perfect escape from the tropical heat of the south.',
      images: [
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800'
      ],
      likes: 654,
      comments: 42
    }
  ];

  const filteredReviews = reviews.filter(r => activeTab === 'All' || r.category === activeTab);

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 h-full overflow-y-auto">
      <div className="space-y-1">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          Community
        </h1>
        <p className="text-[var(--text-secondary)]">Insights from locals, guides & travelers.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              activeTab === cat 
                ? 'bg-[var(--accent)] text-white' 
                : 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border)] p-4 shadow-sm space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[var(--text-primary)]">{review.name}</span>
                    {review.role === 'Local Insider' && (
                      <div className="flex items-center gap-0.5 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                        <BadgeCheck className="w-3 h-3" /> Local Insider
                      </div>
                    )}
                    {review.role === 'Tour Guide' && (
                      <div className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                        <BadgeCheck className="w-3 h-3" /> Tour Guide
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">{review.time}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[var(--accent)]" /> {review.location}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{review.content}</p>

            {/* Media (Images/Video) */}
            {review.video && (
              <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-black relative">
                <video 
                  src={review.video} 
                  controls 
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1555561918-6228dc095e7c?auto=format&fit=crop&q=80&w=800"
                />
              </div>
            )}

            {review.images && review.images.length > 0 && (
              <div className={`grid gap-2 ${review.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {review.images.map((img, idx) => (
                  <div key={idx} className="w-full h-40 sm:h-56 rounded-2xl overflow-hidden bg-black">
                    <img src={img} alt="Review" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-2 border-t border-[var(--border)]">
              <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-semibold">{review.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">{review.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
