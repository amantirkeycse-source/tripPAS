// TripPAS Mock Destination Data
// All prices are estimates for demo purposes.
// Actual prices may vary by season, availability, and booking time.

export const destinations = [
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    state: 'Himachal Pradesh',
    region: 'North India',

    description:
      'A stunning Himalayan hill station nestled in the Kullu Valley, known for snow-capped peaks, adventure sports, and vibrant backpacker culture.',

    image:
      'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
      'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80',
      'https://images.unsplash.com/photo-1579689217062-f66443381e24?q=80&w=920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Adventure', 'Mountains', 'Nature', 'Family'],

    bestTime: 'October to June',
    idealDuration: '3-6 days',
    avgTemp: '10°C - 25°C',
    popularity: 94,

    startingBudget: 12500,

    budgetTiers: {
      budget: {
        price: 12500,
        accommodation: 'Basic homestay / hostel',
        transport: 'Public/shared transport',
        food: 'Local dhabas & street food',
        activities: 'Essential activities',
        benefits: [
          '2 activities',
          'Basic stay',
          'Public transport'
        ]
      },

      comfort: {
        price: 18500,
        accommodation: '3★ hotel',
        transport: 'Private cab or Volvo',
        food: 'Mix of local & cafes',
        activities: '3-4 activities',
        benefits: [
          'Better stay',
          'Better food',
          'Additional activity'
        ]
      },

      premium: {
        price: 27000,
        accommodation: '4★ resort',
        transport: 'Private SUV with driver',
        food: 'Premium restaurants',
        activities: '5+ activities',
        benefits: [
          'Premium stay',
          'Private transport',
          'More experiences'
        ]
      },

      luxury: {
        price: 40000,
        accommodation: '5★ luxury resort',
        transport: 'Premium car',
        food: 'Fine dining',
        activities: 'All premium experiences',
        benefits: [
          'Luxury accommodation',
          'Premium transport',
          'Premium experiences'
        ]
      }
    },

    // Comparison page
    travelCost: 4000,
    accommodationCost: 3000,
    foodCost: 2400,
    localTransportCost: 1500,
    activityCost: 1000,
    miscellaneousCost: 600,

    activities: [
      {
        id: 'manali-1',
        name: 'Solang Valley',
        cost: 800,
        duration: 'Half day',
        category: 'Adventure',
        rating: 4.7
      },
      {
        id: 'manali-2',
        name: 'Rohtang Pass',
        cost: 2500,
        duration: 'Full day',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'manali-3',
        name: 'Old Manali',
        cost: 0,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.5
      },
      {
        id: 'manali-4',
        name: 'Hadimba Temple',
        cost: 100,
        duration: '1-2 hours',
        category: 'Culture',
        rating: 4.4
      },
      {
        id: 'manali-5',
        name: 'Jogini Falls Trek',
        cost: 300,
        duration: 'Half day',
        category: 'Adventure',
        rating: 4.6
      },
      {
        id: 'manali-6',
        name: 'Atal Tunnel',
        cost: 500,
        duration: 'Half day',
        category: 'Scenic',
        rating: 4.6
      }
    ]
  },

  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    region: 'West Coast',

    description:
      'India’s beach capital with golden sands, colonial Portuguese charm, thrilling water sports, and vibrant nightlife.',

    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1682743710558-b338ba285925?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Beach', 'Party', 'Culture'],

    bestTime: 'November to March',
    idealDuration: '4-5 days',

    startingBudget: 15000,

    budgetTiers: {
      budget: {
        price: 15000,
        accommodation: 'Hostel / Beach hut',
        transport: 'Local buses & rented scooter',
        food: 'Local shacks',
        activities: 'Water sports',
        benefits: [
          'Beach stay',
          'Scooter rental',
          '2 water sports'
        ]
      },

      comfort: {
        price: 22000,
        accommodation: '3★ beach resort',
        transport: 'Rented car',
        food: 'Good restaurants',
        activities: '4 water sports',
        benefits: [
          'Better stay',
          'Car rental',
          'More activities'
        ]
      },

      premium: {
        price: 35000,
        accommodation: '4★ beach resort',
        transport: 'Rented SUV',
        food: 'Beachfront dining',
        activities: 'Water sports + cruise',
        benefits: [
          'Premium resort',
          'Private car',
          'Sunset cruise'
        ]
      },

      luxury: {
        price: 52000,
        accommodation: '5★ beach villa',
        transport: 'Chauffeur & yacht',
        food: 'Fine dining',
        activities: 'Yacht + premium experiences',
        benefits: [
          'Luxury villa',
          'Chauffeur',
          'Yacht experience'
        ]
      }
    },

    travelCost: 5000,
    accommodationCost: 4000,
    foodCost: 2800,
    localTransportCost: 1000,
    activityCost: 1200,
    miscellaneousCost: 1000,

    activities: [
      {
        id: 'goa-1',
        name: 'Panaji Latin Quarter Walk',
        cost: 800,
        duration: 'Half day',
        category: 'Culture',
        rating: 4.5
      },
      {
        id: 'goa-2',
        name: 'Fort Aguada',
        cost: 100,
        duration: '2-3 hours',
        category: 'History',
        rating: 4.5
      },
      {
        id: 'goa-3',
        name: 'Baga Beach',
        cost: 0,
        duration: '2-3 hours',
        category: 'Beach',
        rating: 4.3
      },
      {
        id: 'goa-4',
        name: 'Chapora Fort',
        cost: 200,
        duration: 'Half day',
        category: 'Heritage',
        rating: 4.6
      },
      {
        id: 'goa-5',
        name: 'Dudhsagar Waterfall Trip',
        cost: 1500,
        duration: 'Full day',
        category: 'Adventure',
        rating: 4.9
      },
      {
        id: 'goa-6',
        name: 'Palolem Beach Kayak',
        cost: 600,
        duration: '2 hours',
        category: 'Water',
        rating: 4.8
      }
    ]
  },

  {
    id: 'kashmir',
    name: 'Kashmir',
    country: 'India',
    state: 'Jammu & Kashmir',
    region: 'North India',

    description:
      'Paradise on earth with the breathtaking Dal Lake, snow-clad mountains, Mughal gardens, and traditional cuisine.',

    image:
      'https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1716099934086-d64a79d43297?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1706353222367-d0b0fb602f07?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Mountains', 'Nature', 'Scenic', 'Honeymoon'],

    bestTime: 'April to October',
    idealDuration: '4-6 days',

    startingBudget: 18000,

    budgetTiers: {
      budget: {
        price: 18000,
        accommodation: 'Basic houseboat / guesthouse',
        transport: 'Shared transport',
        food: 'Local Kashmiri food',
        activities: 'Dal Lake boat ride',
        benefits: [
          'Budget stay',
          'Shared transport',
          'Lake activity'
        ]
      },

      comfort: {
        price: 28000,
        accommodation: '3★ hotel + houseboat',
        transport: 'Private cab',
        food: 'Local & Kashmiri restaurants',
        activities: 'Gulmarg + sightseeing',
        benefits: [
          'Better stay',
          'Private travel',
          'More sightseeing'
        ]
      },

      premium: {
        price: 42000,
        accommodation: '4★ hotel + deluxe houseboat',
        transport: 'Private car with driver',
        food: 'Premium dining',
        activities: 'Gulmarg + Sonamarg',
        benefits: [
          'Premium stays',
          'Private chauffeur',
          'Full valley tour'
        ]
      },

      luxury: {
        price: 65000,
        accommodation: '5★ luxury hotel',
        transport: 'Chauffeur + premium transport',
        food: 'Royal Kashmiri dining',
        activities: 'Premium valley experiences',
        benefits: [
          'Luxury accommodation',
          'Premium transport',
          'All major experiences'
        ]
      }
    },

    travelCost: 6500,
    accommodationCost: 4500,
    foodCost: 3000,
    localTransportCost: 1500,
    activityCost: 1500,
    miscellaneousCost: 1000,

    activities: [
      {
        id: 'kashmir-1',
        name: 'Dal Lake Shikara Ride',
        cost: 600,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'kashmir-2',
        name: 'Gulmarg',
        cost: 1200,
        duration: 'Full day',
        category: 'Adventure',
        rating: 4.9
      },
      {
        id: 'kashmir-3',
        name: 'Sonamarg',
        cost: 1000,
        duration: 'Full day',
        category: 'Nature',
        rating: 4.8
      },
      {
        id: 'kashmir-4',
        name: 'Mughal Gardens',
        cost: 200,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.6
      }
    ]
  },

  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    state: 'Rajasthan',
    region: 'Rajasthan',

    description:
      'The Pink City — a masterpiece of Rajasthan featuring magnificent palaces, ancient forts, bustling bazaars, and rich culture.',

    image:
      'https://plus.unsplash.com/premium_photo-1697729529902-276ab321f391?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://plus.unsplash.com/premium_photo-1697729529902-276ab321f391?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697729831106-dbca67df36af?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1757237367150-3c134720f075?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Culture', 'History', 'Heritage'],

    bestTime: 'October to March',
    idealDuration: '3-4 days',

    startingBudget: 14000,

    budgetTiers: {
      budget: {
        price: 14000,
        accommodation: 'Budget hotel / guesthouse',
        transport: 'Metro / Auto',
        food: 'Street food & local restaurants',
        activities: 'Amber Fort + city tour',
        benefits: [
          'Budget stay',
          'Local transport',
          'Amber Fort visit'
        ]
      },

      comfort: {
        price: 20500,
        accommodation: '3★ hotel',
        transport: 'Auto / cab',
        food: 'Good restaurants',
        activities: 'City Palace + forts',
        benefits: [
          'Better hotel',
          'Better food',
          'More sightseeing'
        ]
      },

      premium: {
        price: 32000,
        accommodation: 'Heritage hotel',
        transport: 'Private car',
        food: 'Rooftop restaurants',
        activities: 'Major forts + experiences',
        benefits: [
          'Heritage stay',
          'Private driver',
          'Premium experiences'
        ]
      },

      luxury: {
        price: 45000,
        accommodation: '5★ palace hotel',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Royal experiences',
        benefits: [
          'Palace hotel',
          'Private chauffeur',
          'Royal experiences'
        ]
      }
    },

    travelCost: 4500,
    accommodationCost: 3000,
    foodCost: 2200,
    localTransportCost: 1000,
    activityCost: 1200,
    miscellaneousCost: 1100,

    activities: [
      {
        id: 'jaipur-1',
        name: 'Amber Fort',
        cost: 500,
        duration: '3-4 hours',
        category: 'Heritage',
        rating: 4.8
      },
      {
        id: 'jaipur-2',
        name: 'City Palace',
        cost: 400,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.7
      },
      {
        id: 'jaipur-3',
        name: 'Hawa Mahal',
        cost: 200,
        duration: '1-2 hours',
        category: 'Heritage',
        rating: 4.7
      },
      {
        id: 'jaipur-4',
        name: 'Nahargarh Fort',
        cost: 300,
        duration: '2-3 hours',
        category: 'Scenic',
        rating: 4.7
      }
    ]
  },

  {
    id: 'udaipur',
    name: 'Udaipur',
    country: 'India',
    state: 'Rajasthan',
    region: 'Rajasthan',

    description:
      'The City of Lakes — romantic palaces, peaceful lakes, beautiful architecture, heritage streets and stunning sunsets.',

    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'
    ],

    tags: ['Romance', 'Culture', 'Heritage', 'Lakes'],

    bestTime: 'October to March',
    idealDuration: '2-3 days',

    startingBudget: 15000,

    budgetTiers: {
      budget: {
        price: 15000,
        accommodation: 'Budget guesthouse',
        transport: 'Auto / local transport',
        food: 'Local thali & cafes',
        activities: 'City Palace + boat ride',
        benefits: [
          'Budget stay',
          'Local transport',
          'Lake boat ride'
        ]
      },

      comfort: {
        price: 22000,
        accommodation: '3★ hotel',
        transport: 'Rental bike / cab',
        food: 'Lakeside cafes',
        activities: 'City Palace + Sajjangarh',
        benefits: [
          '3★ stay',
          'Better food',
          'More activities'
        ]
      },

      premium: {
        price: 35000,
        accommodation: 'Heritage boutique hotel',
        transport: 'Private car',
        food: 'Rooftop dining',
        activities: 'Major palaces + experiences',
        benefits: [
          'Heritage stay',
          'Private transport',
          'Premium dining'
        ]
      },

      luxury: {
        price: 50000,
        accommodation: '5★ lake palace',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private lake & palace experiences',
        benefits: [
          'Luxury palace',
          'Chauffeur',
          'Premium experiences'
        ]
      }
    },

    travelCost: 4500,
    accommodationCost: 3500,
    foodCost: 2400,
    localTransportCost: 1000,
    activityCost: 1200,
    miscellaneousCost: 900,

    activities: [
      {
        id: 'udaipur-1',
        name: 'City Palace',
        cost: 400,
        duration: '2-3 hours',
        category: 'Heritage',
        rating: 4.8
      },
      {
        id: 'udaipur-2',
        name: 'Lake Pichola Boat Ride',
        cost: 600,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'udaipur-3',
        name: 'Sajjangarh Monsoon Palace',
        cost: 300,
        duration: '2-3 hours',
        category: 'Scenic',
        rating: 4.6
      },
      {
        id: 'udaipur-4',
        name: 'Bagore Ki Haveli',
        cost: 200,
        duration: '1-2 hours',
        category: 'Culture',
        rating: 4.6
      }
    ]
  },

  {
    id: 'rishikesh',
    name: 'Rishikesh',
    country: 'India',
    state: 'Uttarakhand',
    region: 'Himalayan Foothills',

    description:
      'The Yoga Capital of India — a spiritual and adventure destination on the Ganges with rafting, yoga, camping and beautiful mountain views.',

    image:
      'https://images.unsplash.com/photo-1712510817140-917938f92e5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1712510817140-917938f92e5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603867106100-0d2039fc8757?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661902094482-8844637b400e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1687735175748-a19b5adb7591?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Adventure', 'Spiritual', 'Nature', 'Yoga'],

    bestTime: 'September to June',
    idealDuration: '2-3 days',

    startingBudget: 10000,

    budgetTiers: {
      budget: {
        price: 10000,
        accommodation: 'Ashram / dorm',
        transport: 'Local taxi / bus',
        food: 'Vegetarian thalis',
        activities: 'Basic rafting',
        benefits: [
          'Budget stay',
          'Local food',
          'Basic rafting'
        ]
      },

      comfort: {
        price: 16000,
        accommodation: '3★ yoga resort',
        transport: 'Private taxi',
        food: 'Cafes & restaurants',
        activities: 'Rafting + adventure',
        benefits: [
          'Better stay',
          'Private taxi',
          'More activities'
        ]
      },

      premium: {
        price: 25000,
        accommodation: '4★ resort',
        transport: 'Private cab',
        food: 'Premium dining',
        activities: 'Rafting + camping + adventure',
        benefits: [
          'Premium stay',
          'Private transport',
          'Adventure experiences'
        ]
      },

      luxury: {
        price: 35000,
        accommodation: '5★ luxury resort',
        transport: 'Chauffeur',
        food: 'Boutique dining',
        activities: 'Premium rafting + yoga',
        benefits: [
          'Luxury accommodation',
          'Premium transport',
          'Exclusive experiences'
        ]
      }
    },

    travelCost: 3500,
    accommodationCost: 2500,
    foodCost: 1800,
    localTransportCost: 800,
    activityCost: 1000,
    miscellaneousCost: 400,

    activities: [
      {
        id: 'rishikesh-1',
        name: 'River Rafting',
        cost: 1000,
        duration: '3-4 hours',
        category: 'Adventure',
        rating: 4.8
      },
      {
        id: 'rishikesh-2',
        name: 'Ganga Aarti',
        cost: 0,
        duration: '1-2 hours',
        category: 'Spiritual',
        rating: 4.9
      },
      {
        id: 'rishikesh-3',
        name: 'Bungee Jumping',
        cost: 3500,
        duration: '2-3 hours',
        category: 'Adventure',
        rating: 4.7
      },
      {
        id: 'rishikesh-4',
        name: 'Yoga Session',
        cost: 500,
        duration: '1-2 hours',
        category: 'Wellness',
        rating: 4.6
      }
    ]
  },

  {
    id: 'varanasi',
    name: 'Varanasi',
    country: 'India',
    state: 'Uttar Pradesh',
    region: 'North India',

    description:
      'The spiritual heart of India — ancient ghats, sacred boat rides on the Ganges, evening aartis and historic temples.',

    image:
      'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1717323821798-8cee2f6826ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1646200207222-73b839e28a03?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1728272355917-f41c61fe9842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Spiritual', 'Culture', 'Heritage'],

    bestTime: 'October to March',
    idealDuration: '2-3 days',

    startingBudget: 10000,

    budgetTiers: {
      budget: {
        price: 10000,
        accommodation: 'Budget guesthouse',
        transport: 'Auto / e-rickshaw',
        food: 'Local restaurants',
        activities: 'Ganga Aarti',
        benefits: [
          'Budget stay',
          'Local transport',
          'Ganga Aarti'
        ]
      },

      comfort: {
        price: 15000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Boat ride + temple tour',
        benefits: [
          'Better hotel',
          'Private transport',
          'Boat ride'
        ]
      },

      premium: {
        price: 24000,
        accommodation: '4★ hotel',
        transport: 'Private car',
        food: 'Premium restaurants',
        activities: 'Full heritage tour',
        benefits: [
          'Premium stay',
          'Private car',
          'Full sightseeing'
        ]
      },

      luxury: {
        price: 35000,
        accommodation: '5★ luxury hotel',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private Ganga experiences',
        benefits: [
          'Luxury stay',
          'Premium transport',
          'Private experiences'
        ]
      }
    },

    travelCost: 3500,
    accommodationCost: 2500,
    foodCost: 1800,
    localTransportCost: 700,
    activityCost: 800,
    miscellaneousCost: 700,

    activities: [
      {
        id: 'varanasi-1',
        name: 'Ganga Aarti',
        cost: 0,
        duration: '1-2 hours',
        category: 'Spiritual',
        rating: 4.9
      },
      {
        id: 'varanasi-2',
        name: 'Ganges Boat Ride',
        cost: 500,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'varanasi-3',
        name: 'Sarnath',
        cost: 300,
        duration: 'Half day',
        category: 'Heritage',
        rating: 4.7
      },
      {
        id: 'varanasi-4',
        name: 'Old City Walking Tour',
        cost: 400,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.6
      }
    ]
  },

  {
    id: 'darjeeling',
    name: 'Darjeeling',
    country: 'India',
    state: 'West Bengal',
    region: 'East Himalayas',

    description:
      'The Queen of the Hills — famous tea estates, the toy train, Kanchenjunga views and beautiful mountain scenery.',

    image:
      'https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730310113-e44fced8e86c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1577107061100-b06b1793c989?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1754737524646-d5159e91cbe7?q=80&w=731&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Mountains', 'Tea', 'Scenic', 'Heritage'],

    bestTime: 'October to May',
    idealDuration: '3-4 days',

    startingBudget: 12000,

    budgetTiers: {
      budget: {
        price: 12000,
        accommodation: 'Budget hotel',
        transport: 'Shared taxi',
        food: 'Local restaurants',
        activities: 'Tea garden + viewpoint',
        benefits: [
          'Budget stay',
          'Shared transport',
          'Tea garden visit'
        ]
      },

      comfort: {
        price: 18000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Cafes & restaurants',
        activities: 'Toy train + sightseeing',
        benefits: [
          'Better hotel',
          'Private transport',
          'Toy train experience'
        ]
      },

      premium: {
        price: 28000,
        accommodation: '4★ heritage hotel',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Full sightseeing',
        benefits: [
          'Premium stay',
          'Private SUV',
          'Premium experiences'
        ]
      },

      luxury: {
        price: 42000,
        accommodation: 'Luxury heritage hotel',
        transport: 'Premium car',
        food: 'Fine dining',
        activities: 'Private mountain experiences',
        benefits: [
          'Luxury stay',
          'Premium transport',
          'Exclusive experiences'
        ]
      }
    },

    travelCost: 4500,
    accommodationCost: 3000,
    foodCost: 2200,
    localTransportCost: 900,
    activityCost: 900,
    miscellaneousCost: 500,

    activities: [
      {
        id: 'darjeeling-1',
        name: 'Tiger Hill Sunrise',
        cost: 400,
        duration: 'Half day',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'darjeeling-2',
        name: 'Tea Garden Tour',
        cost: 300,
        duration: '2-3 hours',
        category: 'Nature',
        rating: 4.7
      },
      {
        id: 'darjeeling-3',
        name: 'Darjeeling Himalayan Railway',
        cost: 1200,
        duration: 'Half day',
        category: 'Heritage',
        rating: 4.8
      },
      {
        id: 'darjeeling-4',
        name: 'Batasia Loop',
        cost: 100,
        duration: '1 hour',
        category: 'Scenic',
        rating: 4.5
      }
    ]
  },

  {
    id: 'munnar',
    name: 'Munnar',
    country: 'India',
    state: 'Kerala',
    region: 'Kerala',

    description:
      'South India’s enchanted tea country — rolling green estates, misty hills, waterfalls, spice gardens and a peaceful cool retreat.',

    image:
      'https://images.unsplash.com/photo-1696027356970-b1527cc0d33c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1696027356970-b1527cc0d33c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1659443374861-10be174bc85c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730314165-2cd71dc3a6a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1714489896584-233675ee2f62?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Nature', 'Hills', 'Tea'],

    bestTime: 'September to May',
    idealDuration: '2-3 days',

    startingBudget: 11000,

    budgetTiers: {
      budget: {
        price: 11000,
        accommodation: 'Budget homestay / guesthouse',
        transport: 'Local bus / shared taxi',
        food: 'Local restaurants & cafes',
        activities: 'Tea gardens & waterfalls',
        benefits: [
          'Budget stay',
          'Local transport',
          'Essential sightseeing'
        ]
      },

      comfort: {
        price: 17000,
        accommodation: '3★ hotel / resort',
        transport: 'Private cab',
        food: 'Good restaurants & cafes',
        activities: 'Tea estate + sightseeing',
        benefits: [
          'Better accommodation',
          'Private transport',
          'More experiences'
        ]
      },

      premium: {
        price: 26000,
        accommodation: '4★ resort',
        transport: 'Private SUV',
        food: 'Premium restaurants',
        activities: 'Full sightseeing + experiences',
        benefits: [
          'Premium stay',
          'Private SUV',
          'More activities'
        ]
      },

      luxury: {
        price: 40000,
        accommodation: '5★ luxury resort',
        transport: 'Premium car with driver',
        food: 'Fine dining',
        activities: 'All premium experiences',
        benefits: [
          'Luxury accommodation',
          'Premium transport',
          'Premium experiences'
        ]
      }
    },

    travelCost: 4000,
    accommodationCost: 3000,
    foodCost: 2400,
    localTransportCost: 1000,
    activityCost: 1000,
    miscellaneousCost: 600,

    activities: [
      {
        id: 'munnar-1',
        name: 'Munnar Tea Gardens',
        cost: 300,
        duration: '2-3 hours',
        category: 'Nature',
        rating: 4.8
      },
      {
        id: 'munnar-2',
        name: 'Eravikulam National Park',
        cost: 500,
        duration: 'Half day',
        category: 'Nature',
        rating: 4.7
      },
      {
        id: 'munnar-3',
        name: 'Mattupetty Dam',
        cost: 200,
        duration: '2-3 hours',
        category: 'Scenic',
        rating: 4.6
      },
      {
        id: 'munnar-4',
        name: 'Top Station',
        cost: 300,
        duration: 'Half day',
        category: 'Scenic',
        rating: 4.7
      },
      {
        id: 'munnar-5',
        name: 'Tea Museum',
        cost: 200,
        duration: '1-2 hours',
        category: 'Culture',
        rating: 4.5
      }
    ]
  },
    {
    id: 'ooty',
    name: 'Ooty',
    country: 'India',
    state: 'Tamil Nadu',
    region: 'Nilgiri Hills',

    description:
      'The cool queen of the Nilgiris — colonial gardens, blue lakes, tea gardens, scenic viewpoints and the iconic toy train.',

    image:
      'https://images.unsplash.com/photo-1711553186815-8fbc95d02155?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1711553186815-8fbc95d02155?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730314165-2cd71dc3a6a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1707655315272-33a54a771068?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/flagged/photo-1582360694694-1eb3d0947263?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Hills', 'Nature', 'Family'],

    bestTime: 'October to June',
    idealDuration: '2-3 days',

    startingBudget: 11000,

    budgetTiers: {
      budget: {
        price: 11000,
        accommodation: 'Budget hotel / homestay',
        transport: 'Local bus / shared taxi',
        food: 'Local restaurants',
        activities: 'Botanical Garden + Lake',
        benefits: [
          'Budget stay',
          'Local transport',
          'Essential sightseeing'
        ]
      },

      comfort: {
        price: 17000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Toy train + sightseeing',
        benefits: [
          'Better stay',
          'Private transport',
          'Toy train ride'
        ]
      },

      premium: {
        price: 26000,
        accommodation: '4★ resort',
        transport: 'Private SUV',
        food: 'Premium restaurants',
        activities: 'Full Nilgiri sightseeing',
        benefits: [
          'Premium stay',
          'Private SUV',
          'More experiences'
        ]
      },

      luxury: {
        price: 40000,
        accommodation: '5★ resort',
        transport: 'Premium car with driver',
        food: 'Fine dining',
        activities: 'Private sightseeing',
        benefits: [
          'Luxury accommodation',
          'Premium transport',
          'Exclusive experiences'
        ]
      }
    },

    travelCost: 4000,
    accommodationCost: 2800,
    foodCost: 2200,
    localTransportCost: 900,
    activityCost: 900,
    miscellaneousCost: 500,

    activities: [
      {
        id: 'ooty-1',
        name: 'Ooty Botanical Garden',
        cost: 100,
        duration: '2-3 hours',
        category: 'Nature',
        rating: 4.6
      },
      {
        id: 'ooty-2',
        name: 'Ooty Lake',
        cost: 200,
        duration: '2 hours',
        category: 'Scenic',
        rating: 4.5
      },
      {
        id: 'ooty-3',
        name: 'Nilgiri Mountain Railway',
        cost: 800,
        duration: 'Half day',
        category: 'Heritage',
        rating: 4.8
      },
      {
        id: 'ooty-4',
        name: 'Doddabetta Peak',
        cost: 100,
        duration: '2 hours',
        category: 'Scenic',
        rating: 4.7
      }
    ]
  },

  {
    id: 'leh',
    name: 'Leh',
    country: 'India',
    state: 'Ladakh',
    region: 'Ladakh',

    description:
      'A high-altitude desert destination known for monasteries, Pangong Lake, Nubra Valley, mountain passes and epic motorcycle routes.',

    image:
      'https://plus.unsplash.com/premium_photo-1661962344178-19930ba15492?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://plus.unsplash.com/premium_photo-1661962344178-19930ba15492?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1536295243470-d7cba4efab7b?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1663407978077-ca116e36abf0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697729680546-2ef72b3073e9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Adventure', 'Mountains', 'Scenic', 'Biking'],

    bestTime: 'May to September',
    idealDuration: '5-7 days',

    startingBudget: 20000,

    budgetTiers: {
      budget: {
        price: 20000,
        accommodation: 'Budget guesthouse',
        transport: 'Shared taxi',
        food: 'Local restaurants',
        activities: 'Leh sightseeing',
        benefits: [
          'Budget stay',
          'Shared transport',
          'Basic sightseeing'
        ]
      },

      comfort: {
        price: 30000,
        accommodation: '3★ hotel',
        transport: 'Private/shared SUV',
        food: 'Good restaurants',
        activities: 'Nubra + Pangong',
        benefits: [
          'Better hotel',
          'Better transport',
          'Major sightseeing'
        ]
      },

      premium: {
        price: 45000,
        accommodation: '4★ hotel',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Nubra + Pangong + monasteries',
        benefits: [
          'Premium stay',
          'Private SUV',
          'Full sightseeing'
        ]
      },

      luxury: {
        price: 70000,
        accommodation: 'Luxury resort',
        transport: 'Premium SUV with driver',
        food: 'Fine dining',
        activities: 'Premium Ladakh experiences',
        benefits: [
          'Luxury stay',
          'Premium transport',
          'Exclusive experiences'
        ]
      }
    },

    travelCost: 8000,
    accommodationCost: 4500,
    foodCost: 3000,
    localTransportCost: 2000,
    activityCost: 1800,
    miscellaneousCost: 1200,

    activities: [
      {
        id: 'leh-1',
        name: 'Pangong Lake',
        cost: 1500,
        duration: 'Full day',
        category: 'Scenic',
        rating: 4.9
      },
      {
        id: 'leh-2',
        name: 'Nubra Valley',
        cost: 1500,
        duration: 'Full day',
        category: 'Adventure',
        rating: 4.9
      },
      {
        id: 'leh-3',
        name: 'Thiksey Monastery',
        cost: 200,
        duration: '2 hours',
        category: 'Culture',
        rating: 4.7
      },
      {
        id: 'leh-4',
        name: 'Khardung La',
        cost: 500,
        duration: 'Half day',
        category: 'Adventure',
        rating: 4.8
      }
    ]
  },

  {
    id: 'andaman',
    name: 'Andaman Islands',
    country: 'India',
    state: 'Andaman & Nicobar',
    region: 'Islands',

    description:
      'Pristine turquoise bays, white sand beaches, coral reefs, water sports and a peaceful tropical island escape.',

    image:
      'https://wallpapercave.com/wp/wp5296530.jpg',
    images: [
      'https://wallpapercave.com/wp/wp5296530.jpg',
      'https://wallpapercave.com/wp/wp5296536.jpg',
      'https://wallpapercrafter.com/th8004/1176190-india-andaman-and-nicobar-islands-water-sky-sea.jpg',
      'https://deih43ym53wif.cloudfront.net/port-blair-andaman-india-nicobar-shutterstock_1060993676.jpg_bfbe7f4701.jpg'
    ],

    tags: ['Beach', 'Island', 'Nature', 'Water'],

    bestTime: 'October to May',
    idealDuration: '4-5 days',

    startingBudget: 25000,

    budgetTiers: {
      budget: {
        price: 25000,
        accommodation: 'Budget hotel',
        transport: 'Ferry + local transport',
        food: 'Local restaurants',
        activities: 'Beach + basic water activity',
        benefits: [
          'Budget stay',
          'Local transport',
          'Beach activities'
        ]
      },

      comfort: {
        price: 35000,
        accommodation: '3★ hotel',
        transport: 'Ferry + private cab',
        food: 'Good restaurants',
        activities: 'Snorkeling + sightseeing',
        benefits: [
          'Better stay',
          'Private transport',
          'Water activities'
        ]
      },

      premium: {
        price: 50000,
        accommodation: '4★ beach resort',
        transport: 'Private transport',
        food: 'Premium dining',
        activities: 'Scuba + island tours',
        benefits: [
          'Premium resort',
          'Private transport',
          'Scuba experience'
        ]
      },

      luxury: {
        price: 75000,
        accommodation: '5★ beach resort',
        transport: 'Premium private transport',
        food: 'Fine dining',
        activities: 'Private island experiences',
        benefits: [
          'Luxury resort',
          'Premium transport',
          'Private experiences'
        ]
      }
    },

    travelCost: 12000,
    accommodationCost: 6000,
    foodCost: 3500,
    localTransportCost: 1500,
    activityCost: 2500,
    miscellaneousCost: 1500,

    activities: [
      {
        id: 'andaman-1',
        name: 'Radhanagar Beach',
        cost: 0,
        duration: '2-3 hours',
        category: 'Beach',
        rating: 4.9
      },
      {
        id: 'andaman-2',
        name: 'Snorkeling',
        cost: 1200,
        duration: '2 hours',
        category: 'Water',
        rating: 4.8
      },
      {
        id: 'andaman-3',
        name: 'Scuba Diving',
        cost: 3500,
        duration: '3-4 hours',
        category: 'Adventure',
        rating: 4.9
      },
      {
        id: 'andaman-4',
        name: 'Island Hopping',
        cost: 1500,
        duration: 'Full day',
        category: 'Adventure',
        rating: 4.7
      }
    ]
  },

  {
    id: 'agra',
    name: 'Agra',
    country: 'India',
    state: 'Uttar Pradesh',
    region: 'North India',

    description:
      'Home of the magnificent Taj Mahal, Mughal architecture, Agra Fort and famous local sweets.',

    image:
      'https://rare-gallery.com/uploads/posts/349038-4k-wallpaper.jpg',
    images: [
      'https://rare-gallery.com/uploads/posts/349038-4k-wallpaper.jpg',
      'https://i.ytimg.com/vi/NkIennl7XEI/maxresdefault.jpg',
      'https://cdn.britannica.com/37/178637-050-22E50FA5/Jahangirs-Palace-Agra-Fort-India-Uttar-Pradesh.jpg',
      'https://wallpapercrafter.com/desktop1/573838-taj-mahal-mausoleum-south-bank-yamuna-river.jpg'
    ],

    tags: ['Heritage', 'Culture', 'History'],

    bestTime: 'October to March',
    idealDuration: '2 days',

    startingBudget: 9000,

    budgetTiers: {
      budget: {
        price: 9000,
        accommodation: 'Budget hotel',
        transport: 'Auto / local bus',
        food: 'Local restaurants',
        activities: 'Taj Mahal + Agra Fort',
        benefits: [
          'Budget stay',
          'Local transport',
          'Major monuments'
        ]
      },

      comfort: {
        price: 14000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Taj Mahal + Agra Fort + Mehtab Bagh',
        benefits: [
          'Better hotel',
          'Private cab',
          'More sightseeing'
        ]
      },

      premium: {
        price: 22000,
        accommodation: '4★ hotel',
        transport: 'Private car',
        food: 'Premium restaurants',
        activities: 'Complete heritage tour',
        benefits: [
          'Premium stay',
          'Private transport',
          'Heritage experiences'
        ]
      },

      luxury: {
        price: 35000,
        accommodation: '5★ luxury hotel',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private heritage tour',
        benefits: [
          'Luxury stay',
          'Chauffeur',
          'Premium experiences'
        ]
      }
    },

    travelCost: 3000,
    accommodationCost: 2200,
    foodCost: 1600,
    localTransportCost: 600,
    activityCost: 700,
    miscellaneousCost: 500,

    activities: [
      {
        id: 'agra-1',
        name: 'Taj Mahal',
        cost: 500,
        duration: '2-3 hours',
        category: 'Heritage',
        rating: 4.9
      },
      {
        id: 'agra-2',
        name: 'Agra Fort',
        cost: 300,
        duration: '2 hours',
        category: 'History',
        rating: 4.7
      },
      {
        id: 'agra-3',
        name: 'Mehtab Bagh',
        cost: 200,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.5
      }
    ]
  },

  {
    id: 'amritsar',
    name: 'Amritsar',
    country: 'India',
    state: 'Punjab',
    region: 'North Punjab',

    description:
      'The spiritual heart of the Golden Temple, famous for langar, Wagah Border, Punjabi cuisine and rich heritage.',

    image:
      'https://images.pexels.com/photos/12193697/pexels-photo-12193697.jpeg?cs=srgb&dl=pexels-inder-singh-12193697.jpg&fm=jpg',
    images: [
      'https://images.pexels.com/photos/12193697/pexels-photo-12193697.jpeg?cs=srgb&dl=pexels-inder-singh-12193697.jpg&fm=jpg',
      'https://wallpaperbat.com/img/32635904-golden-temple-amritsar-punjab-india.jpg',
      'https://wallpaper.forfun.com/fetch/e7/e743cb074becc75ad41f41213a5e1972.jpeg?w=2000',
      'https://i.ytimg.com/vi/m701WKQMeYQ/maxresdefault.jpg'
    ],

    tags: ['Spiritual', 'Culture', 'Food'],

    bestTime: 'October to March',
    idealDuration: '2 days',

    startingBudget: 8500,

    budgetTiers: {
      budget: {
        price: 8500,
        accommodation: 'Budget hotel',
        transport: 'Auto / e-rickshaw',
        food: 'Local Punjabi food',
        activities: 'Golden Temple + Wagah Border',
        benefits: [
          'Budget stay',
          'Local transport',
          'Major attractions'
        ]
      },

      comfort: {
        price: 13000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Temple + Wagah + heritage',
        benefits: [
          'Better hotel',
          'Private transport',
          'More sightseeing'
        ]
      },

      premium: {
        price: 20000,
        accommodation: '4★ hotel',
        transport: 'Private car',
        food: 'Premium Punjabi dining',
        activities: 'Complete city tour',
        benefits: [
          'Premium stay',
          'Private car',
          'Premium dining'
        ]
      },

      luxury: {
        price: 32000,
        accommodation: '5★ hotel',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private heritage tour',
        benefits: [
          'Luxury stay',
          'Chauffeur',
          'Premium experiences'
        ]
      }
    },

    travelCost: 3000,
    accommodationCost: 2200,
    foodCost: 1600,
    localTransportCost: 500,
    activityCost: 600,
    miscellaneousCost: 600,

    activities: [
      {
        id: 'amritsar-1',
        name: 'Golden Temple',
        cost: 0,
        duration: '2-3 hours',
        category: 'Spiritual',
        rating: 4.9
      },
      {
        id: 'amritsar-2',
        name: 'Wagah Border',
        cost: 300,
        duration: 'Half day',
        category: 'Culture',
        rating: 4.8
      },
      {
        id: 'amritsar-3',
        name: 'Jallianwala Bagh',
        cost: 0,
        duration: '1 hour',
        category: 'History',
        rating: 4.7
      }
    ]
  },
    {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    country: 'India',
    state: 'Rajasthan',
    region: 'Rajasthan',

    description:
      'The Golden City — majestic sand dunes, camel safaris, spectacular havelis and the unique culture of the Thar Desert.',

    image:
      'https://www.bwallpaperhd.com/wp-content/uploads/2018/08/JaisalmerFort.jpg',
    images: [
      'https://www.bwallpaperhd.com/wp-content/uploads/2018/08/JaisalmerFort.jpg',
      'https://res.cloudinary.com/kmadmin/image/upload/v1725880849/kiomoi/jaislamer_fort_night_view_1914.jpg',
      'https://tse4.mm.bing.net/th/id/OIP.-NmjVeXftF3-rZpgtxpTCwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://thejerker.com/wp-content/uploads/2023/01/Best-Places-to-Visit-in-Jaisalmer.jpg'
    ],

    tags: ['Desert', 'Adventure', 'Heritage', 'Nature'],

    bestTime: 'October to March',
    idealDuration: '3 days',

    startingBudget: 8000,

    budgetTiers: {
      budget: {
        price: 8000,
        accommodation: 'Budget guesthouse',
        transport: 'Auto / shared cab',
        food: 'Local restaurants',
        activities: 'Fort + basic desert experience',
        benefits: [
          'Budget stay',
          'Local transport',
          'Desert sightseeing'
        ]
      },

      comfort: {
        price: 13000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Fort + desert safari',
        benefits: [
          'Better stay',
          'Private transport',
          'Desert safari'
        ]
      },

      premium: {
        price: 22000,
        accommodation: 'Heritage hotel',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Luxury desert camp',
        benefits: [
          'Heritage stay',
          'Private SUV',
          'Desert camp'
        ]
      },

      luxury: {
        price: 35000,
        accommodation: 'Luxury desert camp',
        transport: 'Premium car',
        food: 'Fine dining',
        activities: 'Private desert experiences',
        benefits: [
          'Luxury camp',
          'Premium transport',
          'Private experiences'
        ]
      }
    },

    travelCost: 3000,
    accommodationCost: 2200,
    foodCost: 1600,
    localTransportCost: 600,
    activityCost: 800,
    miscellaneousCost: 500,

    activities: [
      {
        id: 'jaisalmer-1',
        name: 'Jaisalmer Fort',
        cost: 200,
        duration: '2-3 hours',
        category: 'Heritage',
        rating: 4.8
      },
      {
        id: 'jaisalmer-2',
        name: 'Sam Sand Dunes',
        cost: 500,
        duration: 'Half day',
        category: 'Adventure',
        rating: 4.8
      },
      {
        id: 'jaisalmer-3',
        name: 'Camel Safari',
        cost: 700,
        duration: '2-3 hours',
        category: 'Adventure',
        rating: 4.7
      }
    ]
  },

  {
    id: 'shillong',
    name: 'Shillong',
    country: 'India',
    state: 'Meghalaya',
    region: 'Northeast India',

    description:
      'The Scotland of the East — misty pine hills, waterfalls, peaceful lakes and beautiful Khasi landscapes.',

    image:
      'https://wallpaperaccess.com/full/8391715.jpg',
    images: [
      'https://wallpaperaccess.com/full/8391715.jpg',
      'https://hikerwolf.com/wp-content/uploads/2021/04/Bishop-Falls.jpg',
      'https://cdn.wallpapersafari.com/63/71/L9Vc2o.jpg',
      'https://tse4.mm.bing.net/th/id/OIP.eMMNAf5BElqlBmGWfNef4wHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    ],

    tags: ['Nature', 'Hills', 'Waterfalls'],

    bestTime: 'October to May',
    idealDuration: '3-4 days',

    startingBudget: 14000,

    budgetTiers: {
      budget: {
        price: 14000,
        accommodation: 'Budget homestay',
        transport: 'Shared taxi',
        food: 'Local restaurants',
        activities: 'Waterfalls + viewpoints',
        benefits: ['Budget stay', 'Shared transport', 'Sightseeing']
      },
      comfort: {
        price: 21000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Major sightseeing',
        benefits: ['Better stay', 'Private transport', 'More sightseeing']
      },
      premium: {
        price: 32000,
        accommodation: '4★ resort',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Full Meghalaya tour',
        benefits: ['Premium stay', 'Private SUV', 'Full tour']
      },
      luxury: {
        price: 48000,
        accommodation: 'Luxury resort',
        transport: 'Premium SUV',
        food: 'Fine dining',
        activities: 'Private Meghalaya experiences',
        benefits: ['Luxury stay', 'Premium transport', 'Private experiences']
      }
    },

    travelCost: 5000,
    accommodationCost: 3500,
    foodCost: 2200,
    localTransportCost: 1200,
    activityCost: 1200,
    miscellaneousCost: 900,

    activities: [
      {
        id: 'shillong-1',
        name: 'Elephant Falls',
        cost: 100,
        duration: '1-2 hours',
        category: 'Nature',
        rating: 4.6
      },
      {
        id: 'shillong-2',
        name: 'Shillong Peak',
        cost: 0,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.7
      },
      {
        id: 'shillong-3',
        name: 'Umiam Lake',
        cost: 200,
        duration: '2-3 hours',
        category: 'Nature',
        rating: 4.7
      }
    ]
  },

  {
    id: 'gangtok',
    name: 'Gangtok',
    country: 'India',
    state: 'Sikkim',
    region: 'Sikkim',

    description:
      'A beautiful Himalayan capital with monasteries, mountain views, scenic cableways and peaceful surroundings.',

    image:
      'https://wallpaperaccess.com/full/9392448.jpg',
    images: [
      'https://wallpaperaccess.com/full/9392448.jpg',
      'https://wallpapercave.com/wp/wp8551853.jpg',
      'https://media.istockphoto.com/id/1296295435/photo/night-view-of-gangtok-city.jpg?s=612x612&w=0&k=20&c=qyAIM7bqNJFdaBhGOyQ7MrEKWYiD5KPdTfnrCiHpkqQ=',
      'https://media.istockphoto.com/id/606223864/photo/view-of-gangtok-the-capital-city-of-sikkim-india.jpg?s=612x612&w=0&k=20&c=UEKddFCWZcHG-x9ru-Lles8FiPv1wMTviTD4QeFlBo4='
    ],

    tags: ['Mountains', 'Nature', 'Culture'],

    bestTime: 'March to June',
    idealDuration: '3-4 days',

    startingBudget: 15000,

    budgetTiers: {
      budget: {
        price: 15000,
        accommodation: 'Budget hotel',
        transport: 'Shared taxi',
        food: 'Local restaurants',
        activities: 'Gangtok sightseeing',
        benefits: ['Budget stay', 'Shared transport', 'City tour']
      },
      comfort: {
        price: 22000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Tsomgo Lake + sightseeing',
        benefits: ['Better hotel', 'Private cab', 'More activities']
      },
      premium: {
        price: 34000,
        accommodation: '4★ hotel',
        transport: 'Private SUV',
        food: 'Premium restaurants',
        activities: 'North Sikkim tour',
        benefits: ['Premium stay', 'Private SUV', 'Full sightseeing']
      },
      luxury: {
        price: 50000,
        accommodation: '5★ luxury hotel',
        transport: 'Premium SUV',
        food: 'Fine dining',
        activities: 'Private Sikkim experiences',
        benefits: ['Luxury stay', 'Premium transport', 'Exclusive experiences']
      }
    },

    travelCost: 5000,
    accommodationCost: 3500,
    foodCost: 2300,
    localTransportCost: 1000,
    activityCost: 1400,
    miscellaneousCost: 800,

    activities: [
      {
        id: 'gangtok-1',
        name: 'Tsomgo Lake',
        cost: 500,
        duration: 'Half day',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'gangtok-2',
        name: 'Rumtek Monastery',
        cost: 200,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.7
      },
      {
        id: 'gangtok-3',
        name: 'Gangtok Ropeway',
        cost: 300,
        duration: '1 hour',
        category: 'Scenic',
        rating: 4.6
      }
    ]
  },

  {
    id: 'coorg',
    name: 'Coorg',
    country: 'India',
    state: 'Karnataka',
    region: 'Karnataka',

    description:
      'The Scotland of India — coffee plantations, misty hills, waterfalls, trekking and unique Kodava culture.',

    image:
      'https://wallpaperaccess.com/full/9421658.jpg',
    images: [
      'https://wallpaperaccess.com/full/9421658.jpg',
      'https://wallpaperaccess.com/full/3718732.jpg',
      'https://images.pexels.com/photos/35463580/pexels-photo-35463580.jpeg?cs=srgb&dl=pexels-nikhil-c-2153462646-35463580.jpg&fm=jpg',
      'https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FThings_to_Do_in_Coorg_85bf5736b1.jpg&w=3840&q=50'
    ],

    tags: ['Mountains', 'Nature', 'Coffee', 'Offbeat'],

    bestTime: 'October to March',
    idealDuration: '2-3 days',

    startingBudget: 12000,

    budgetTiers: {
      budget: {
        price: 12000,
        accommodation: 'Budget homestay',
        transport: 'Local taxi',
        food: 'Local restaurants',
        activities: 'Coffee plantation + waterfalls',
        benefits: ['Budget stay', 'Local transport', 'Nature sightseeing']
      },
      comfort: {
        price: 18000,
        accommodation: '3★ resort',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Plantation + sightseeing',
        benefits: ['Better stay', 'Private transport', 'More experiences']
      },
      premium: {
        price: 28000,
        accommodation: '4★ plantation resort',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Full Coorg experiences',
        benefits: ['Premium stay', 'Private SUV', 'Premium experiences']
      },
      luxury: {
        price: 42000,
        accommodation: 'Luxury plantation resort',
        transport: 'Premium car',
        food: 'Fine dining',
        activities: 'Private plantation experiences',
        benefits: ['Luxury stay', 'Premium transport', 'Private experiences']
      }
    },

    travelCost: 4000,
    accommodationCost: 3000,
    foodCost: 2200,
    localTransportCost: 900,
    activityCost: 900,
    miscellaneousCost: 500,

    activities: [
      {
        id: 'coorg-1',
        name: 'Coffee Plantation Tour',
        cost: 400,
        duration: '2-3 hours',
        category: 'Nature',
        rating: 4.7
      },
      {
        id: 'coorg-2',
        name: 'Abbey Falls',
        cost: 100,
        duration: '1-2 hours',
        category: 'Nature',
        rating: 4.6
      },
      {
        id: 'coorg-3',
        name: 'Raja Seat',
        cost: 50,
        duration: '1 hour',
        category: 'Scenic',
        rating: 4.5
      }
    ]
  },

  {
    id: 'pondicherry',
    name: 'Pondicherry',
    country: 'India',
    state: 'Puducherry',
    region: 'South Coast',

    description:
      'French-flavoured streets, colourful buildings, cafes, beaches, Auroville and a relaxed coastal atmosphere.',

    image:
      'https://wallpaperaccess.com/full/9427816.jpg',
    images: [
      'https://wallpaperaccess.com/full/9427816.jpg',
      'https://wallpaperaccess.com/full/9427837.jpg',
      'https://www.clubmahindra.com/blog/media/section_images/shuttersto-1ff0af0d76640ed.jpg',
      'https://tse4.mm.bing.net/th/id/OIP.iVM4hJH4udHscaM5uOyFLwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    ],

    tags: ['Beach', 'French', 'Yoga', 'Culture'],

    bestTime: 'October to March',
    idealDuration: '2-3 days',

    startingBudget: 11500,

    budgetTiers: {
      budget: {
        price: 11500,
        accommodation: 'Budget guesthouse',
        transport: 'Rental bicycle / auto',
        food: 'Local cafes',
        activities: 'Promenade + Auroville',
        benefits: ['Budget stay', 'Cycle rental', 'Local experiences']
      },
      comfort: {
        price: 17000,
        accommodation: '3★ hotel',
        transport: 'Rental scooter',
        food: 'Good cafes',
        activities: 'Beach + Auroville + heritage',
        benefits: ['Better stay', 'Scooter', 'More sightseeing']
      },
      premium: {
        price: 26000,
        accommodation: '4★ boutique hotel',
        transport: 'Private car',
        food: 'Premium dining',
        activities: 'Complete city experiences',
        benefits: ['Premium stay', 'Private transport', 'Premium dining']
      },
      luxury: {
        price: 40000,
        accommodation: '5★ luxury resort',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private coastal experiences',
        benefits: ['Luxury stay', 'Chauffeur', 'Exclusive experiences']
      }
    },

    travelCost: 4000,
    accommodationCost: 2800,
    foodCost: 2200,
    localTransportCost: 700,
    activityCost: 900,
    miscellaneousCost: 500,

    activities: [
      {
        id: 'pondicherry-1',
        name: 'Promenade Beach',
        cost: 0,
        duration: '1-2 hours',
        category: 'Beach',
        rating: 4.6
      },
      {
        id: 'pondicherry-2',
        name: 'Auroville',
        cost: 200,
        duration: 'Half day',
        category: 'Culture',
        rating: 4.6
      },
      {
        id: 'pondicherry-3',
        name: 'French Quarter Walk',
        cost: 0,
        duration: '2 hours',
        category: 'Culture',
        rating: 4.7
      }
    ]
  },

  {
    id: 'kathmandu',
    name: 'Kathmandu',
    country: 'Nepal',
    state: 'Bagmati Province',
    region: 'Valley',

    description:
      'A fascinating blend of ancient temples, stupas, courtyards, markets, cafes and Himalayan culture.',

    image:
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1706188370039-e0cf9bd6ea16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730412085-6f10bddf58c7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Culture', 'Heritage', 'Spiritual', 'Mountains'],

    bestTime: 'October to April',
    idealDuration: '3-4 days',

    startingBudget: 13000,

    budgetTiers: {
      budget: {
        price: 13000,
        accommodation: 'Budget guesthouse',
        transport: 'Local bus / taxi',
        food: 'Local restaurants',
        activities: 'Temple sightseeing',
        benefits: ['Budget stay', 'Local transport', 'Heritage tour']
      },
      comfort: {
        price: 19000,
        accommodation: '3★ hotel',
        transport: 'Private taxi',
        food: 'Good restaurants',
        activities: 'Major temples + heritage',
        benefits: ['Better stay', 'Private transport', 'More sightseeing']
      },
      premium: {
        price: 30000,
        accommodation: '4★ hotel',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Complete Kathmandu tour',
        benefits: ['Premium stay', 'Private SUV', 'Full city tour']
      },
      luxury: {
        price: 45000,
        accommodation: '5★ luxury hotel',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private heritage experiences',
        benefits: ['Luxury stay', 'Chauffeur', 'Private experiences']
      }
    },

    travelCost: 5000,
    accommodationCost: 3000,
    foodCost: 2200,
    localTransportCost: 800,
    activityCost: 1000,
    miscellaneousCost: 700,

    activities: [
      {
        id: 'kathmandu-1',
        name: 'Pashupatinath Temple',
        cost: 500,
        duration: '2-3 hours',
        category: 'Spiritual',
        rating: 4.8
      },
      {
        id: 'kathmandu-2',
        name: 'Swayambhunath Stupa',
        cost: 300,
        duration: '2 hours',
        category: 'Heritage',
        rating: 4.7
      },
      {
        id: 'kathmandu-3',
        name: 'Boudhanath Stupa',
        cost: 300,
        duration: '1-2 hours',
        category: 'Spiritual',
        rating: 4.8
      }
    ]
  },

  {
    id: 'pokhara',
    name: 'Pokhara',
    country: 'Nepal',
    state: 'Gandaki Province',
    region: 'Annapurna Region',

    description:
      'Nepal’s lakeside paradise with Phewa Lake, Annapurna views, paragliding, caves and peaceful mountain scenery.',

    image:
      'https://images.unsplash.com/photo-1610997686651-98492fd08108?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1610997686651-98492fd08108?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1659808909524-5fcad5cd48bf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730418140-064a5b6c2e17?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730400710-9e565f54869e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Adventure', 'Lakes', 'Mountains', 'Paragliding'],

    bestTime: 'October to April',
    idealDuration: '4-5 days',

    startingBudget: 15000,

    budgetTiers: {
      budget: {
        price: 15000,
        accommodation: 'Budget guesthouse',
        transport: 'Local taxi / bus',
        food: 'Local restaurants',
        activities: 'Lake + viewpoint',
        benefits: ['Budget stay', 'Local transport', 'Scenic activities']
      },
      comfort: {
        price: 22000,
        accommodation: '3★ hotel',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Lake + paragliding',
        benefits: ['Better stay', 'Private transport', 'Adventure activity']
      },
      premium: {
        price: 35000,
        accommodation: '4★ lakeside hotel',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Paragliding + mountain tour',
        benefits: ['Premium stay', 'Private SUV', 'Adventure experiences']
      },
      luxury: {
        price: 52000,
        accommodation: 'Luxury lakeside resort',
        transport: 'Premium SUV',
        food: 'Fine dining',
        activities: 'Private mountain experiences',
        benefits: ['Luxury resort', 'Premium transport', 'Private experiences']
      }
    },

    travelCost: 6000,
    accommodationCost: 3500,
    foodCost: 2400,
    localTransportCost: 900,
    activityCost: 1500,
    miscellaneousCost: 700,

    activities: [
      {
        id: 'pokhara-1',
        name: 'Phewa Lake Boat Ride',
        cost: 500,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'pokhara-2',
        name: 'Paragliding',
        cost: 5000,
        duration: '2-3 hours',
        category: 'Adventure',
        rating: 4.9
      },
      {
        id: 'pokhara-3',
        name: 'Sarangkot Sunrise',
        cost: 500,
        duration: 'Half day',
        category: 'Scenic',
        rating: 4.8
      }
    ]
  },

  {
    id: 'chitwan',
    name: 'Chitwan',
    country: 'Nepal',
    state: 'Bagmati Province',
    region: 'Terai',

    description:
      'Nepal’s wild heart — national park safaris, one-horned rhinos, jungle adventures and Tharu culture.',

    image:
      'https://th.bing.com/th/id/R.0ef303c4a74a84c147fa9fc2f31369e2?rik=r9%2ff6%2bMvizuGqw&riu=http%3a%2f%2fbrainbridgenepal.com%2fwp-content%2fuploads%2f2025%2f04%2fChitwan.National.Park_.original.2800-scaled-1.jpg&ehk=Z1rbVY8IhMn6JhGaqG0Mu0QOyCaEkuxVi7ts7C8E1o4%3d&risl=&pid=ImgRaw&r=0',
    images: [
      'https://th.bing.com/th/id/R.0ef303c4a74a84c147fa9fc2f31369e2?rik=r9%2ff6%2bMvizuGqw&riu=http%3a%2f%2fbrainbridgenepal.com%2fwp-content%2fuploads%2f2025%2f04%2fChitwan.National.Park_.original.2800-scaled-1.jpg&ehk=Z1rbVY8IhMn6JhGaqG0Mu0QOyCaEkuxVi7ts7C8E1o4%3d&risl=&pid=ImgRaw&r=0',
      'https://wallpapercat.com/w/full/e/a/1/1599159-2732x1536-desktop-hd-chitwan-national-park-wallpaper-image.jpg',
      'https://tse3.mm.bing.net/th/id/OIP.pc3B0Ardc5f1YLqln2xxVwHaFh?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse1.mm.bing.net/th/id/OIP.n3tDaCSBke24jnGaF6-wCAHaEn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    ],

    tags: ['Wildlife', 'Nature', 'Adventure', 'Family'],

    bestTime: 'October to March',
    idealDuration: '2-3 days',

    startingBudget: 14500,

    budgetTiers: {
      budget: {
        price: 14500,
        accommodation: 'Budget lodge',
        transport: 'Shared transport',
        food: 'Local restaurants',
        activities: 'Jungle walk',
        benefits: ['Budget stay', 'Local food', 'Nature activities']
      },
      comfort: {
        price: 21000,
        accommodation: '3★ jungle resort',
        transport: 'Private cab',
        food: 'Good restaurants',
        activities: 'Jungle safari + canoe',
        benefits: ['Better stay', 'Private transport', 'Safari']
      },
      premium: {
        price: 32000,
        accommodation: '4★ jungle resort',
        transport: 'Private SUV',
        food: 'Premium dining',
        activities: 'Full wildlife experience',
        benefits: ['Premium resort', 'Private SUV', 'Full safari']
      },
      luxury: {
        price: 48000,
        accommodation: 'Luxury jungle resort',
        transport: 'Premium SUV',
        food: 'Fine dining',
        activities: 'Private safari experiences',
        benefits: ['Luxury resort', 'Premium transport', 'Private safari']
      }
    },

    travelCost: 5500,
    accommodationCost: 3500,
    foodCost: 2200,
    localTransportCost: 800,
    activityCost: 1600,
    miscellaneousCost: 900,

    activities: [
      {
        id: 'chitwan-1',
        name: 'Jungle Safari',
        cost: 1500,
        duration: 'Half day',
        category: 'Wildlife',
        rating: 4.8
      },
      {
        id: 'chitwan-2',
        name: 'Canoe Ride',
        cost: 700,
        duration: '2 hours',
        category: 'Adventure',
        rating: 4.6
      },
      {
        id: 'chitwan-3',
        name: 'Tharu Cultural Show',
        cost: 300,
        duration: '1-2 hours',
        category: 'Culture',
        rating: 4.6
      }
    ]
  },

  {
    id: 'lumbini',
    name: 'Lumbini',
    country: 'Nepal',
    state: 'Lumbini Province',
    region: 'Terai',

    description:
      'The sacred birthplace of Lord Buddha, surrounded by peaceful gardens, monasteries and spiritual landmarks.',

    image:
      'https://images.unsplash.com/photo-1616166831462-48a3e9089c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1616166831462-48a3e9089c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1754923472049-5061ca3a9f77?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1625366877201-5f143a7b3118?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1553243173-a022fcf96e44?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],

    tags: ['Spiritual', 'Culture', 'Heritage'],

    bestTime: 'October to March',
    idealDuration: '1-2 days',

    startingBudget: 9500,

    budgetTiers: {
      budget: {
        price: 9500,
        accommodation: 'Budget guesthouse',
        transport: 'Local transport',
        food: 'Local restaurants',
        activities: 'Maya Devi Temple',
        benefits: ['Budget stay', 'Local transport', 'Temple visit']
      },
      comfort: {
        price: 14000,
        accommodation: '3★ hotel',
        transport: 'Private taxi',
        food: 'Good restaurants',
        activities: 'Monastery tour',
        benefits: ['Better hotel', 'Private transport', 'More sightseeing']
      },
      premium: {
        price: 22000,
        accommodation: '4★ hotel',
        transport: 'Private car',
        food: 'Premium dining',
        activities: 'Complete heritage tour',
        benefits: ['Premium stay', 'Private car', 'Full tour']
      },
      luxury: {
        price: 32000,
        accommodation: 'Luxury resort',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private spiritual experiences',
        benefits: ['Luxury stay', 'Chauffeur', 'Private experiences']
      }
    },

    travelCost: 3500,
    accommodationCost: 2200,
    foodCost: 1500,
    localTransportCost: 500,
    activityCost: 500,
    miscellaneousCost: 400,

    activities: [
      {
        id: 'lumbini-1',
        name: 'Maya Devi Temple',
        cost: 0,
        duration: '1-2 hours',
        category: 'Spiritual',
        rating: 4.8
      },
      {
        id: 'lumbini-2',
        name: 'World Peace Pagoda',
        cost: 0,
        duration: '1 hour',
        category: 'Spiritual',
        rating: 4.6
      },
      {
        id: 'lumbini-3',
        name: 'Monastery Tour',
        cost: 300,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.7
      }
    ]
  },

  {
    id: 'nagarkot',
    name: 'Nagarkot',
    country: 'Nepal',
    state: 'Bagmati Province',
    region: 'Himalayan Foothills',

    description:
      'A peaceful Himalayan viewpoint famous for sunrise, mountain views and quiet countryside surroundings.',

    image:
      'https://www.tusktravel.com.mx/blog/wp-content/uploads/2024/11/Nepal-Nagarkot-Himalayan-Views.jpg',
    images: [
      'https://www.tusktravel.com.mx/blog/wp-content/uploads/2024/11/Nepal-Nagarkot-Himalayan-Views.jpg',
      'https://cdn.getyourguide.com/img/tour/1c41c3c8456b7fcb6985b70ffd48b18f61cad36b0f1df9e8e95ac99e4a7f1a51.jpeg/148.jpg',
      'https://tse2.mm.bing.net/th/id/OIP.lBqr3wroX63QWodylpXa_wHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse3.mm.bing.net/th/id/OIP.e36cqnZdIVYcK6SwMSyrgQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    ],

    tags: ['Mountains', 'Sunrise', 'Nature'],

    bestTime: 'October to April',
    idealDuration: '1-2 days',

    startingBudget: 8000,

    budgetTiers: {
      budget: {
        price: 8000,
        accommodation: 'Budget guesthouse',
        transport: 'Local bus',
        food: 'Local restaurants',
        activities: 'Sunrise viewpoint',
        benefits: ['Budget stay', 'Local transport', 'Sunrise experience']
      },
      comfort: {
        price: 12000,
        accommodation: '3★ hotel',
        transport: 'Private taxi',
        food: 'Good restaurants',
        activities: 'Sunrise + hiking',
        benefits: ['Better stay', 'Private taxi', 'Hiking']
      },
      premium: {
        price: 19000,
        accommodation: '4★ resort',
        transport: 'Private car',
        food: 'Premium dining',
        activities: 'Private mountain tour',
        benefits: ['Premium stay', 'Private transport', 'Mountain experiences']
      },
      luxury: {
        price: 30000,
        accommodation: 'Luxury mountain resort',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private sunrise experiences',
        benefits: ['Luxury resort', 'Chauffeur', 'Private experiences']
      }
    },

    travelCost: 3000,
    accommodationCost: 2000,
    foodCost: 1400,
    localTransportCost: 400,
    activityCost: 400,
    miscellaneousCost: 300,

    activities: [
      {
        id: 'nagarkot-1',
        name: 'Himalayan Sunrise',
        cost: 0,
        duration: '1-2 hours',
        category: 'Scenic',
        rating: 4.8
      },
      {
        id: 'nagarkot-2',
        name: 'Mountain Hiking',
        cost: 300,
        duration: 'Half day',
        category: 'Adventure',
        rating: 4.6
      }
    ]
  },

  {
    id: 'bandipur',
    name: 'Bandipur',
    country: 'Nepal',
    state: 'Gandaki Province',
    region: 'Hillside',

    description:
      'A beautiful hillside town with preserved streets, mountain views, homestays and peaceful village experiences.',

    image:
      'https://tse1.mm.bing.net/th/id/OIP.d00KnCvaA1NBtkgLBCLXhQHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    images: [
      'https://tse1.mm.bing.net/th/id/OIP.d00KnCvaA1NBtkgLBCLXhQHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://img.freepik.com/premium-photo/sunset-bandipur-nepal_165988-246.jpg?w=2000',
      'https://karlijntravels.com/wp-content/uploads/2024/05/Straat-in-Bandipur-1170x780.jpg',
      'https://cdn.atrsafari.com/cdn/05explore/locations-and-lodges/asia/nepal/bandipur/0/stills/00page/01BAND-IM0001-bandipur.jpg'
    ],

    tags: ['Offbeat', 'Culture', 'Mountains'],

    bestTime: 'October to April',
    idealDuration: '2 days',

    startingBudget: 9000,

    budgetTiers: {
      budget: {
        price: 9000,
        accommodation: 'Budget homestay',
        transport: 'Local bus',
        food: 'Local food',
        activities: 'Village walk',
        benefits: ['Budget stay', 'Local food', 'Village experience']
      },
      comfort: {
        price: 14000,
        accommodation: '3★ hotel',
        transport: 'Private taxi',
        food: 'Good restaurants',
        activities: 'Village + mountain tour',
        benefits: ['Better stay', 'Private transport', 'More sightseeing']
      },
      premium: {
        price: 22000,
        accommodation: 'Boutique heritage hotel',
        transport: 'Private car',
        food: 'Premium dining',
        activities: 'Private cultural experiences',
        benefits: ['Heritage stay', 'Private transport', 'Cultural tour']
      },
      luxury: {
        price: 33000,
        accommodation: 'Luxury boutique resort',
        transport: 'Chauffeur',
        food: 'Fine dining',
        activities: 'Private mountain experiences',
        benefits: ['Luxury stay', 'Chauffeur', 'Private experiences']
      }
    },

    travelCost: 3500,
    accommodationCost: 2200,
    foodCost: 1500,
    localTransportCost: 500,
    activityCost: 500,
    miscellaneousCost: 300,

    activities: [
      {
        id: 'bandipur-1',
        name: 'Bandipur Village Walk',
        cost: 0,
        duration: '2 hours',
        category: 'Culture',
        rating: 4.6
      },
      {
        id: 'bandipur-2',
        name: 'Siddha Gufa',
        cost: 300,
        duration: '2-3 hours',
        category: 'Adventure',
        rating: 4.5
      }
    ]
  },

  {
    id: 'everest-region',
    name: 'Everest Region',
    country: 'Nepal',
    state: 'Province No. 1',
    region: 'High Himalayas',

    description:
      'The rooftop of the world — Everest trekking, Sherpa villages, monasteries, high mountain passes and unforgettable Himalayan landscapes.',

    image:
      'https://i.redd.it/rdmwklboei151.jpg',
    images: [
      'https://i.redd.it/rdmwklboei151.jpg',
      'https://wallpapercave.com/wp/wp12184625.jpg',
      'https://nepalgatewaytrekking.com/_next/image?url=https:%2F%2Fmedia.app.nepalgatewaytrekking.com%2Fuploads%2Ffullbanner%2Feverest-region-village.webp&w=3840&q=75&dpl=dpl_CGKTmXvtGnARAARMjmiTByUSxyXT',
      'https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/gettyimages-1088050790?_a=BAVAZGDX0'
    ],

    tags: ['Trekking', 'Mountains', 'Adventure', 'Epic'],

    bestTime: 'March to May',
    idealDuration: '7-10 days',

    startingBudget: 15000,

    budgetTiers: {
      budget: {
        price: 15000,
        accommodation: 'Basic teahouse',
        transport: 'Shared/local transport',
        food: 'Local teahouse meals',
        activities: 'Basic trekking',
        benefits: ['Budget trek', 'Teahouse stay', 'Basic trekking']
      },
      comfort: {
        price: 25000,
        accommodation: 'Better teahouse',
        transport: 'Trek transport',
        food: 'Good local meals',
        activities: 'Guided trekking',
        benefits: ['Better stay', 'Guided trek', 'More support']
      },
      premium: {
        price: 40000,
        accommodation: 'Premium lodge',
        transport: 'Private trekking support',
        food: 'Premium meals',
        activities: 'Extended trekking experience',
        benefits: ['Premium lodge', 'Private support', 'Extended trek']
      },
      luxury: {
        price: 65000,
        accommodation: 'Luxury mountain lodge',
        transport: 'Premium trekking support',
        food: 'Premium dining',
        activities: 'Luxury Himalayan experience',
        benefits: ['Luxury lodge', 'Premium support', 'Exclusive experience']
      }
    },

    travelCost: 8000,
    accommodationCost: 5000,
    foodCost: 3500,
    localTransportCost: 1500,
    activityCost: 2500,
    miscellaneousCost: 1500,

    activities: [
      {
        id: 'everest-1',
        name: 'Everest Base Camp Trek',
        cost: 3000,
        duration: 'Multi-day',
        category: 'Trekking',
        rating: 5
      },
      {
        id: 'everest-2',
        name: 'Namche Bazaar',
        cost: 500,
        duration: 'Half day',
        category: 'Culture',
        rating: 4.8
      },
      {
        id: 'everest-3',
        name: 'Tengboche Monastery',
        cost: 300,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.8
      }
    ]
  },

  {
    id: 'annapurna-region',
    name: 'Annapurna Region',
    country: 'Nepal',
    state: 'Gandaki Province',
    region: 'Mountains',

    description:
      'One of the world’s most famous trekking destinations, featuring Annapurna Circuit, Poon Hill, mountain villages and spectacular sunrise views.',

    image:
      'https://images.hdqwalls.com/download/annapurna-massif-mountain-range-nepal-4k-hh-3840x2400.jpg?dl=1',
    images: [
      'https://images.hdqwalls.com/download/annapurna-massif-mountain-range-nepal-4k-hh-3840x2400.jpg?dl=1',
      'https://wallpaperbat.com/img/106681096-annapurna-hd-image.jpg',
      'https://tse4.mm.bing.net/th/id/OIP.w38DRzEk8Axg7ySOcxG90AHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://bluemarbleadventures.com/wp-content/uploads/2023/10/annapurna-1.webp'
    ],

    tags: ['Trekking', 'Mountains', 'Poon Hill', 'Adventure'],

    bestTime: 'March to May',
    idealDuration: '6-10 days',

    startingBudget: 22000,

    budgetTiers: {
      budget: {
        price: 22000,
        accommodation: 'Basic teahouse',
        transport: 'Shared trekking transport',
        food: 'Local meals',
        activities: 'Basic trekking',
        benefits: ['Budget trek', 'Teahouse stay', 'Basic trekking']
      },
      comfort: {
        price: 32000,
        accommodation: 'Comfortable lodge',
        transport: 'Private/shared transport',
        food: 'Good meals',
        activities: 'Guided trek',
        benefits: ['Better lodge', 'Guided trek', 'Better meals']
      },
      premium: {
        price: 48000,
        accommodation: 'Premium lodge',
        transport: 'Private trekking support',
        food: 'Premium meals',
        activities: 'Extended Annapurna trek',
        benefits: ['Premium lodge', 'Private support', 'Extended trek']
      },
      luxury: {
        price: 70000,
        accommodation: 'Luxury mountain lodge',
        transport: 'Premium support',
        food: 'Premium dining',
        activities: 'Luxury trekking experience',
        benefits: ['Luxury lodge', 'Premium support', 'Exclusive trek']
      }
    },

    travelCost: 8500,
    accommodationCost: 5500,
    foodCost: 4000,
    localTransportCost: 1500,
    activityCost: 2500,
    miscellaneousCost: 1500,

    activities: [
      {
        id: 'annapurna-1',
        name: 'Annapurna Circuit',
        cost: 3000,
        duration: 'Multi-day',
        category: 'Trekking',
        rating: 4.9
      },
      {
        id: 'annapurna-2',
        name: 'Poon Hill Sunrise',
        cost: 500,
        duration: 'Half day',
        category: 'Scenic',
        rating: 4.9
      },
      {
        id: 'annapurna-3',
        name: 'Mountain Village Walk',
        cost: 300,
        duration: '2-3 hours',
        category: 'Culture',
        rating: 4.7
      }
    ]
  }
];
// Keep destination pricing consistent
const fullDestinations = destinations.map((dest) => {
  const budgetPrice =
    dest.budgetTiers?.budget?.price || dest.startingBudget || 0;

  return {
    ...dest,
    startingBudget: budgetPrice,

    // Safe defaults for comparison
    travelCost: dest.travelCost ?? 0,
    accommodationCost: dest.accommodationCost ?? 0,
    foodCost: dest.foodCost ?? 0,
    localTransportCost: dest.localTransportCost ?? 0,
    activityCost: dest.activityCost ?? 0,
    miscellaneousCost: dest.miscellaneousCost ?? 0,

    activities: dest.activities ?? []
  };
});

export const getDestinationById = (id) => {
  return fullDestinations.find(
    (destination) => destination.id === id
  ) || null;
};

export const getDestinationsByCountry = (country) => {
  return fullDestinations.filter(
    (destination) => destination.country === country
  );
};

export const getSimilarDestinations = (id, count = 3) => {
  const destination = getDestinationById(id);

  if (!destination) {
    return [];
  }

  return fullDestinations
    .filter((dest) => dest.id !== id)
    .filter((dest) =>
      destination.tags?.some((tag) =>
        dest.tags?.includes(tag)
      )
    )
    .slice(0, count);
};

export default fullDestinations;
 
