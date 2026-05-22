import { Activity, Track } from './types';

export const mockTracks: Track[] = [
  // --- HANOI ---
  { 
    id: 't_hn_1', 
    title: 'Thu Cuối', 
    artist: 'Yanbi, Mr.T, Hằng Bingboong', 
    url: 'https://www.youtube.com/watch?v=L2G35kRzR_Q', 
    energyRange: [30, 100], 
    destination: 'Hanoi', 
    type: 'music' 
  },
  { 
    id: 't_hn_2', 
    title: 'Nồng Nàn Hà Nội', 
    artist: 'Nguyễn Đức Cường', 
    url: 'https://www.youtube.com/watch?v=uC06y_O98i8', 
    energyRange: [40, 100], 
    destination: 'Hanoi', 
    type: 'music' 
  },
  { 
    id: 't_hn_3', 
    title: 'Hà Nội Mùa Vắng Những Cơn Mưa', 
    artist: 'Mỹ Linh', 
    url: 'https://www.youtube.com/watch?v=hB9i8G2-4Hw', 
    energyRange: [0, 50], 
    destination: 'Hanoi', 
    type: 'music' 
  },
  { 
    id: 't_hn_4', 
    title: 'Podcast: Giang Ơi Radio - Sự Khác Biệt Giữa Hà Nội & Sài Gòn', 
    artist: 'Giang Ơi', 
    url: 'https://www.youtube.com/watch?v=ZfR6IicXm5E', 
    energyRange: [0, 100], 
    destination: 'Hanoi', 
    type: 'podcast' 
  },
  { 
    id: 't_hn_5', 
    title: 'Podcast: Have A Sip - Vì Sao Tôi Yêu Hà Nội', 
    artist: 'Vietcetera', 
    url: 'https://www.youtube.com/watch?v=u_fUjNlFqZ4', 
    energyRange: [0, 100], 
    destination: 'Hanoi', 
    type: 'podcast' 
  },

  // --- SAIGON ---
  { 
    id: 't_sg_1', 
    title: 'Sài Gòn Đau Lòng Quá', 
    artist: 'Hứa Kim Tuyền x Hoàng Duyên', 
    url: 'https://www.youtube.com/watch?v=gT8WOfO_9iI', 
    energyRange: [0, 60], 
    destination: 'Saigon', 
    type: 'music' 
  },
  { 
    id: 't_sg_2', 
    title: 'Sài Gòn Đẹp Lắm', 
    artist: 'Vy Oanh', 
    url: 'https://www.youtube.com/watch?v=2v-S_ZAtN_M', 
    energyRange: [50, 100], 
    destination: 'Saigon', 
    type: 'music' 
  },
  { 
    id: 't_sg_3', 
    title: 'Phố Thị', 
    artist: 'Chillies', 
    url: 'https://www.youtube.com/watch?v=zZofm49m_P8', 
    energyRange: [30, 80], 
    destination: 'Saigon', 
    type: 'music' 
  },
  { 
    id: 't_sg_4', 
    title: 'Podcast: Amateur Psychologist - Áp Lực Đô Thị Sài Gòn', 
    artist: 'Amateur Psychologist', 
    url: 'https://www.youtube.com/watch?v=8Vco_oY3TqE', 
    energyRange: [0, 100], 
    destination: 'Saigon', 
    type: 'podcast' 
  },
  { 
    id: 't_sg_5', 
    title: 'Podcast: Have A Sip - Trò Chuyện Cùng Đen Vâu', 
    artist: 'Vietcetera', 
    url: 'https://www.youtube.com/watch?v=vVkaGvId26Y', 
    energyRange: [0, 100], 
    destination: 'Saigon', 
    type: 'podcast' 
  },

  // --- DA LAT ---
  { 
    id: 't_dl_1', 
    title: 'Ai Đưa Em Về (Đà Lạt Lofi Session)', 
    artist: 'Chillies ft. Cầm', 
    url: 'https://www.youtube.com/watch?v=q6t8o0YyK6U', 
    energyRange: [0, 60], 
    destination: 'Da Lat', 
    type: 'music' 
  },
  { 
    id: 't_dl_2', 
    title: 'Tháng Tư Là Lời Nói Dối Của Em', 
    artist: 'Hà Anh Tuấn', 
    url: 'https://www.youtube.com/watch?v=PLmK8_shO_c', 
    energyRange: [0, 70], 
    destination: 'Da Lat', 
    type: 'music' 
  },
  { 
    id: 't_dl_3', 
    title: 'Mơ', 
    artist: 'Vũ.', 
    url: 'https://www.youtube.com/watch?v=0kby2pCsz3I', 
    energyRange: [0, 50], 
    destination: 'Da Lat', 
    type: 'music' 
  },
  { 
    id: 't_dl_4', 
    title: 'Podcast: Vì Sao Đà Lạt Gây Thương Nhớ?', 
    artist: 'Bản Đồ Cảm Xúc', 
    url: 'https://www.youtube.com/watch?v=AEnV6F8gW_M', 
    energyRange: [0, 100], 
    destination: 'Da Lat', 
    type: 'podcast' 
  },
  { 
    id: 't_dl_5', 
    title: 'Podcast: Chữa Lành Tại Đà Lạt Sương Mù', 
    artist: 'Sunhuyn Podcast', 
    url: 'https://www.youtube.com/watch?v=oUSaB2D26S4', 
    energyRange: [0, 100], 
    destination: 'Da Lat', 
    type: 'podcast' 
  },

  // --- NORTHWEST (TÂY BẮC) ---
  { 
    id: 't_nw_1', 
    title: 'Để Mị Nói Cho Mà Nghe', 
    artist: 'Hoàng Thùy Linh', 
    url: 'https://www.youtube.com/watch?v=gZbfXzZALqU', 
    energyRange: [40, 100], 
    destination: 'Northwest', 
    type: 'music' 
  },
  { 
    id: 't_nw_2', 
    title: 'Nói Thương Nhau Thì Đừng Làm Trái Tim Em Đau', 
    artist: 'Bích Phương', 
    url: 'https://www.youtube.com/watch?v=9g0HAtc9Dnw', 
    energyRange: [0, 80], 
    destination: 'Northwest', 
    type: 'music' 
  },
  { 
    id: 't_nw_3', 
    title: 'Xem Như Em Chẳng May (Tropical Remix)', 
    artist: 'Mina x Lofi Tây Bắc', 
    url: 'https://www.youtube.com/watch?v=E-kK9J_Dszk', 
    energyRange: [50, 100], 
    destination: 'Northwest', 
    type: 'music' 
  },
  { 
    id: 't_nw_4', 
    title: 'Podcast: Hành Trình Ẩm Thực Tây Bắc', 
    artist: 'Khoai Lang Thang', 
    url: 'https://www.youtube.com/watch?v=2r1D3PqOIXU', 
    energyRange: [0, 100], 
    destination: 'Northwest', 
    type: 'podcast' 
  },
  { 
    id: 't_nw_5', 
    title: 'Podcast: Sapa Yên Bình Và Tiếng Suối Rừng Tây Bắc', 
    artist: 'Radio Chill', 
    url: 'https://www.youtube.com/watch?v=wXW7bYy8Q3o', 
    energyRange: [0, 100], 
    destination: 'Northwest', 
    type: 'podcast' 
  },
];

export const mockActivities: Activity[] = [
  // High Energy
  {
    id: 'a1',
    time: '08:00 AM',
    title: 'Trekking Pu Luong Nature Reserve',
    description: 'A challenging hike through terraced rice fields and remote villages.',
    energyLevel: 90,
    type: 'activity',
    image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=800',
    tags: ['Nature', 'Trekking'],
    location: 'Thanh Hoa',
    rating: 4.9,
  },
  {
    id: 'a2',
    time: '10:00 AM',
    title: 'Hang Son Doong Cave Exploration',
    description: "An intense expedition into the world's largest cave.",
    energyLevel: 100,
    type: 'activity',
    image: 'https://images.unsplash.com/photo-1549429188-7570415a7cf9?auto=format&fit=crop&q=80&w=800',
    tags: ['Adventure', 'Caving'],
    location: 'Quang Binh',
    rating: 5.0,
  },
  {
    id: 'a3',
    time: '07:30 AM',
    title: 'Kite Surfing in Mui Ne',
    description: 'Catch the wind and ride the waves on beautiful sandy beaches.',
    energyLevel: 85,
    type: 'activity',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
    tags: ['Water Sports', 'Beach'],
    location: 'Binh Thuan',
    rating: 4.7,
  },
  {
    id: 'a4',
    time: '06:00 AM',
    title: 'Motorbike Tour of Ha Giang Loop',
    description: 'Navigate the thrilling mountain passes of Northern Vietnam.',
    energyLevel: 95,
    type: 'activity',
    image: 'https://images.unsplash.com/photo-1540206276207-3af25c08abc4?auto=format&fit=crop&q=80&w=800',
    tags: ['Adventure', 'Road Trip'],
    location: 'Ha Giang',
    rating: 4.9,
  },
  
  // Mid Energy (Balanced)
  {
    id: 'b1',
    time: '09:00 AM',
    title: 'Hoi An Ancient Town Walking Tour',
    description: 'Stroll through the yellow-walled streets and visit historic assembly halls.',
    energyLevel: 50,
    type: 'culture',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800',
    tags: ['Culture', 'Walking'],
    location: 'Hoi An',
    rating: 4.8,
  },
  {
    id: 'b2',
    time: '12:00 PM',
    title: 'Hidden Street Food Tour',
    description: 'Discover local delicacies in the bustling alleys of the Old Quarter.',
    energyLevel: 60,
    type: 'food',
    image: 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?auto=format&fit=crop&q=80&w=800',
    tags: ['Culinary', 'City'],
    location: 'Hanoi',
    rating: 4.7,
  },
  {
    id: 'b3',
    time: '10:30 AM',
    title: 'Silk Weaving Village Visit',
    description: 'Experience the traditional craft of silk making firsthand.',
    energyLevel: 45,
    type: 'culture',
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0ebc63?auto=format&fit=crop&q=80&w=800',
    tags: ['Craft', 'Local'],
    location: 'Van Phuc',
    rating: 4.6,
  },
  {
    id: 'b4',
    time: '02:00 PM',
    title: 'Cu Chi Tunnels Exploration',
    description: 'Crawl through historic underground networks.',
    energyLevel: 65,
    type: 'activity',
    image: 'https://images.unsplash.com/photo-1620311221774-84687d6928e0?auto=format&fit=crop&q=80&w=800',
    tags: ['History', 'Explore'],
    location: 'Cu Chi',
    rating: 4.5,
  },

  // Low Energy (Relaxed)
  {
    id: 'c1',
    time: '03:00 PM',
    title: 'Slow Coffee at a Hidden Cafe',
    description: 'Enjoy a rich Vietnamese egg coffee while watching the world go by.',
    energyLevel: 20,
    type: 'relax',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
    tags: ['Chill', 'Cafe'],
    location: 'Da Lat',
    rating: 4.9,
  },
  {
    id: 'c2',
    time: '06:00 PM',
    title: 'Traditional Herbal Spa',
    description: 'A soothing soak in a Red Dao herbal bath to rejuvenate your body.',
    energyLevel: 10,
    type: 'relax',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
    tags: ['Wellness', 'Spa'],
    location: 'Sapa',
    rating: 4.9,
  },
  {
    id: 'c3',
    time: '05:00 PM',
    title: 'Sunset Cruise on the Perfume River',
    description: 'Watch the sun set over historical monuments from a traditional boat.',
    energyLevel: 15,
    type: 'relax',
    image: 'https://images.unsplash.com/photo-1589417387342-9988bdea9ad4?auto=format&fit=crop&q=80&w=800',
    tags: ['Sightseeing', 'Boat'],
    location: 'Hue',
    rating: 4.8,
  },
  {
    id: 'c4',
    time: '07:00 PM',
    title: 'Water Puppet Show',
    description: 'Enjoy a unique Northern Vietnamese traditional performance.',
    energyLevel: 25,
    type: 'culture',
    image: 'https://images.unsplash.com/photo-1614088035252-87063d11b333?auto=format&fit=crop&q=80&w=800',
    tags: ['Show', 'Culture'],
    location: 'Hanoi',
    rating: 4.7,
  }
];
