const mockProfiles = [
  {
    id: 1,
    name: 'Emily Johnson',
    age: 28,
    gender: 'female',
    location: 'New York, NY',
    bio: 'Passionate about art, travel, and meeting new people. Looking for someone who shares my sense of adventure and can enjoy both quiet evenings and spontaneous trips.',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Travel', 'Art', 'Cooking', 'Hiking', 'Photography'],
    occupation: 'Art Curator',
    education: 'Master of Fine Arts',
    relationshipGoals: 'Long-term relationship',
    height: 168, // in cm
    verified: true,
    premium: true,
    lastActive: '2023-07-15T14:30:00Z',
    joinDate: '2023-05-20T10:15:00Z'
  },
  {
    id: 2,
    name: 'Michael Roberts',
    age: 32,
    gender: 'male',
    location: 'Los Angeles, CA',
    bio: 'Software engineer by day, musician by night. Looking for someone to share meaningful conversations and experiences with. Let\'s explore new restaurants and go to concerts together!',
    photos: [
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Music', 'Technology', 'Films', 'Hiking', 'Travel'],
    occupation: 'Software Engineer',
    education: 'BS in Computer Science',
    relationshipGoals: 'Marriage',
    height: 183, // in cm
    verified: true,
    premium: false,
    lastActive: '2023-07-17T09:45:00Z',
    joinDate: '2023-03-10T16:20:00Z'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    age: 30,
    gender: 'female',
    location: 'Chicago, IL',
    bio: 'Bookworm and coffee enthusiast. I value deep connections and am looking for someone who appreciates the little things in life. Let\'s have meaningful conversations over coffee!',
    photos: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Reading', 'Coffee', 'Yoga', 'Photography', 'Cooking'],
    occupation: 'Book Editor',
    education: 'Master of English Literature',
    relationshipGoals: 'Long-term relationship',
    height: 165, // in cm
    verified: false,
    premium: true,
    lastActive: '2023-07-16T20:15:00Z',
    joinDate: '2023-02-05T11:30:00Z'
  },
  {
    id: 4,
    name: 'Daniel Williams',
    age: 35,
    gender: 'male',
    location: 'Austin, TX',
    bio: 'Entrepreneur and fitness enthusiast. Seeking someone who values health, growth, and has ambitious goals. I believe in balancing work with play and enjoying life\'s adventures.',
    photos: [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Fitness', 'Business', 'Travel', 'Food', 'Reading'],
    occupation: 'Startup Founder',
    education: 'MBA',
    relationshipGoals: 'Marriage',
    height: 188, // in cm
    verified: true,
    premium: false,
    lastActive: '2023-07-17T12:00:00Z',
    joinDate: '2023-01-15T14:45:00Z'
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    age: 27,
    gender: 'female',
    location: 'Seattle, WA',
    bio: 'Nature lover and environmental scientist. Looking for someone who shares my passion for sustainability and outdoor adventures. Let\'s make the world a better place together!',
    photos: [
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Hiking', 'Sustainability', 'Camping', 'Photography', 'Gardening'],
    occupation: 'Environmental Scientist',
    education: 'PhD in Environmental Science',
    relationshipGoals: 'Long-term relationship',
    height: 170, // in cm
    verified: true,
    premium: true,
    lastActive: '2023-07-17T08:30:00Z',
    joinDate: '2023-04-20T09:15:00Z'
  },
  {
    id: 6,
    name: 'James Wilson',
    age: 31,
    gender: 'male',
    location: 'Denver, CO',
    bio: 'Chef and mountain enthusiast. Seeking someone to share culinary adventures and outdoor explorations with. Let\'s cook together and then burn those calories hiking!',
    photos: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Cooking', 'Hiking', 'Skiing', 'Travel', 'Wine Tasting'],
    occupation: 'Professional Chef',
    education: 'Culinary Arts Degree',
    relationshipGoals: 'Marriage',
    height: 180, // in cm
    verified: false,
    premium: false,
    lastActive: '2023-07-16T17:45:00Z',
    joinDate: '2023-02-28T13:20:00Z'
  },
  {
    id: 7,
    name: 'Emma Thompson',
    age: 29,
    gender: 'female',
    location: 'Boston, MA',
    bio: 'Pediatrician with a love for classical music and dance. Looking for a partner who is kind, thoughtful, and enjoys both cultural events and quiet evenings at home.',
    photos: [
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Classical Music', 'Ballet', 'Reading', 'Baking', 'Volunteering'],
    occupation: 'Pediatrician',
    education: 'MD',
    relationshipGoals: 'Marriage',
    height: 165, // in cm
    verified: true,
    premium: true,
    lastActive: '2023-07-17T10:30:00Z',
    joinDate: '2023-03-15T11:45:00Z'
  },
  {
    id: 8,
    name: 'Alexander Lee',
    age: 33,
    gender: 'male',
    location: 'San Francisco, CA',
    bio: 'Architect with a passion for sustainable design and urban exploration. Seeking someone who appreciates creativity, adventure, and thoughtful conversations.',
    photos: [
      'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Architecture', 'Urban Exploration', 'Photography', 'Cycling', 'Art'],
    occupation: 'Architect',
    education: 'Master of Architecture',
    relationshipGoals: 'Long-term relationship',
    height: 182, // in cm
    verified: true,
    premium: false,
    lastActive: '2023-07-17T07:15:00Z',
    joinDate: '2023-01-10T14:30:00Z'
  },
  {
    id: 9,
    name: 'Natalie Rodriguez',
    age: 26,
    gender: 'female',
    location: 'Miami, FL',
    bio: 'Marine biologist and beach lover. Looking for someone who shares my passion for ocean conservation and adventure. Let\'s explore the coastline and discover hidden beaches together!',
    photos: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1372134/pexels-photo-1372134.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Marine Biology', 'Snorkeling', 'Beach Volleyball', 'Sailing', 'Conservation'],
    occupation: 'Marine Biologist',
    education: 'PhD in Marine Biology',
    relationshipGoals: 'Long-term relationship',
    height: 168, // in cm
    verified: false,
    premium: true,
    lastActive: '2023-07-16T15:00:00Z',
    joinDate: '2023-05-05T10:15:00Z'
  },
  {
    id: 10,
    name: 'Benjamin Carter',
    age: 34,
    gender: 'male',
    location: 'Nashville, TN',
    bio: 'Music producer and songwriter with a love for exploring local food scenes. Looking for a partner who appreciates creativity, spontaneity, and trying new restaurants.',
    photos: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    interests: ['Music Production', 'Songwriting', 'Foodie', 'Guitar', 'Live Music'],
    occupation: 'Music Producer',
    education: 'Bachelor of Music',
    relationshipGoals: 'Marriage',
    height: 178, // in cm
    verified: true,
    premium: false,
    lastActive: '2023-07-17T11:45:00Z',
    joinDate: '2023-02-18T12:30:00Z'
  }
]

export default mockProfiles