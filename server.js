const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  credentials: true, // Allow credentials
  maxAge: 86400, // Cache preflight request for 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Helper function to generate random coordinates in Bangladesh
function generateBangladeshCoordinates() {
  // Bangladesh coordinates range
  const lat = faker.number.float({ min: 20.7433, max: 26.634, precision: 0.0001 });
  const lon = faker.number.float({ min: 88.0283, max: 92.6737, precision: 0.0001 });
  return { lat, lon };
}

// Helper function to generate random time in HH:MM format
function generateRandomTime() {
  const hours = faker.number.int({ min: 0, max: 23 }).toString().padStart(2, "0");
  const minutes = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Generate mock marathons
const generateMockMarathons = () => {
  const marathons = [];
  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Narayanganj",
    "Gazipur",
    "Cox's Bazar",
  ];
  const marathonTypes = ["City", "Coastal", "Hill", "Heritage", "Charity", "Corporate"];
  const distances = [5, 10, 21, 42]; // 5km, 10km, Half Marathon, Full Marathon

  for (let i = 0; i < 20; i++) {
    // Increased from 5 to 20 marathons
    const city = faker.helpers.arrayElement(cities);
    const marathonType = faker.helpers.arrayElement(marathonTypes);
    const { lat, lon } = generateBangladeshCoordinates();
    const participants = [];

    // Generate 10-30 participants
    const numParticipants = faker.number.int({ min: 10, max: 30 });
    for (let j = 0; j < numParticipants; j++) {
      participants.push({
        name: faker.person.fullName(),
        time: generateRandomTime(),
        rank: j + 1,
        age: faker.number.int({ min: 18, max: 65 }),
        gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
        category: faker.helpers.arrayElement(["Professional", "Amateur", "Beginner"]),
        nationality: faker.helpers.arrayElement(["Bangladesh", "India", "Nepal", "Sri Lanka", "International"]),
      });
    }

    const distance = faker.helpers.arrayElement(distances);
    marathons.push({
      id: i + 1,
      name: `${city} ${marathonType} Marathon ${faker.date.future().getFullYear()}`,
      date: faker.date.future().toISOString().split("T")[0],
      location: `${city} ${faker.location.streetAddress()}`,
      distance: `${distance}km`,
      coordinates: { lat, lon },
      participants,
      registrationFee: faker.number.int({ min: 500, max: 2000 }),
      prizeMoney: faker.number.int({ min: 10000, max: 100000 }),
      registrationDeadline: faker.date.future().toISOString().split("T")[0],
      categories: ["Professional", "Amateur", "Beginner"],
      facilities: ["Water Stations", "Medical Support", "Timing Chip", "Medal", "T-Shirt", "Refreshments"],
      route: {
        startPoint: faker.location.streetAddress(),
        endPoint: faker.location.streetAddress(),
        checkpoints: Array(faker.number.int({ min: 3, max: 8 }))
          .fill()
          .map(() => faker.location.streetAddress()),
      },
    });
  }
  return marathons;
};

// Generate mock gyms
const generateMockGyms = () => {
  const gyms = [];
  const areas = [
    "Dhanmondi",
    "Gulshan",
    "Mirpur",
    "Uttara",
    "Banani",
    "Mohammadpur",
    "Lalmatia",
    "Bashundhara",
    "Wari",
    "Motijheel",
    "Farmgate",
    "Tejgaon",
  ];
  const facilities = [
    "Cardio",
    "Weights",
    "Yoga",
    "Swimming Pool",
    "Sauna",
    "Personal Training",
    "CrossFit",
    "Boxing",
    "Zumba",
    "Martial Arts",
    "Steam Room",
    "Jacuzzi",
    "Basketball Court",
    "Tennis Court",
    "Squash Court",
    "Indoor Track",
    "Nutrition Consultation",
    "Massage Therapy",
    "Physical Therapy",
  ];
  const membershipTypes = ["Basic", "Premium", "VIP", "Family", "Student", "Corporate"];

  for (let i = 0; i < 30; i++) {
    // Increased from 10 to 30 gyms
    const area = faker.helpers.arrayElement(areas);
    const { lat, lon } = generateBangladeshCoordinates();
    const numFacilities = faker.number.int({ min: 5, max: 10 });

    gyms.push({
      id: i + 1,
      name: faker.company.name(),
      location: `${area}, ${faker.location.streetAddress()}`,
      rating: faker.number.float({ min: 3.5, max: 5.0, precision: 0.1 }),
      monthlyFee: faker.number.int({ min: 2000, max: 15000 }),
      facilities: faker.helpers.arrayElements(facilities, numFacilities),
      coordinates: { lat, lon },
      openingHours: `${faker.number.int({ min: 6, max: 8 })}:00 AM - ${faker.number.int({ min: 8, max: 10 })}:00 PM`,
      membershipTypes: faker.helpers.arrayElements(membershipTypes, faker.number.int({ min: 2, max: 4 })),
      trainers: Array(faker.number.int({ min: 3, max: 8 }))
        .fill()
        .map(() => ({
          name: faker.person.fullName(),
          specialty: faker.helpers.arrayElement(facilities),
          experience: `${faker.number.int({ min: 1, max: 15 })} years`,
        })),
      amenities: ["Parking", "Locker Room", "Shower Facilities", "Towel Service", "WiFi", "Cafe", "Pro Shop"],
      socialMedia: {
        facebook: faker.internet.url(),
        instagram: faker.internet.url(),
        website: faker.internet.url(),
      },
      reviews: Array(faker.number.int({ min: 5, max: 15 }))
        .fill()
        .map(() => ({
          rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
          comment: faker.lorem.sentence(),
          date: faker.date.past().toISOString().split("T")[0],
        })),
    });
  }
  return gyms;
};

// Generate mock gymbros
const generateMockGymBros = () => {
  const gymbros = [];
  const specialties = [
    "Weight Training",
    "Nutrition",
    "Yoga",
    "CrossFit",
    "Bodybuilding",
    "Cardio",
    "Boxing",
    "Martial Arts",
    "Powerlifting",
    "Olympic Lifting",
    "Calisthenics",
    "HIIT",
    "Pilates",
    "Swimming",
    "Cycling",
    "Running",
  ];
  const availability = ["Morning", "Evening", "Night", "Weekends", "Weekdays"];
  const fitnessGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Strength",
    "Flexibility",
    "General Fitness",
    "Sports Specific",
    "Rehabilitation",
  ];
  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Professional"];

  for (let i = 0; i < 50; i++) {
    // Increased from 15 to 50 gymbros
    const { lat, lon } = generateBangladeshCoordinates();
    const numSpecialties = faker.number.int({ min: 2, max: 4 });
    const numAvailability = faker.number.int({ min: 2, max: 4 });

    gymbros.push({
      id: i + 1,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 45 }),
      experience: `${faker.number.int({ min: 1, max: 15 })} years`,
      specialties: faker.helpers.arrayElements(specialties, numSpecialties),
      availability: faker.helpers.arrayElements(availability, numAvailability),
      coordinates: { lat, lon },
      bio: faker.lorem.paragraph(),
      preferredGym: faker.company.name(),
      fitnessGoals: faker.helpers.arrayElements(fitnessGoals, faker.number.int({ min: 1, max: 3 })),
      experienceLevel: faker.helpers.arrayElement(experienceLevels),
      achievements: Array(faker.number.int({ min: 1, max: 5 }))
        .fill()
        .map(() => ({
          title: faker.lorem.words(3),
          date: faker.date.past().toISOString().split("T")[0],
          description: faker.lorem.sentence(),
        })),
      socialMedia: {
        instagram: faker.internet.url(),
        facebook: faker.internet.url(),
        linkedin: faker.internet.url(),
      },
      languages: faker.helpers.arrayElements(
        ["Bengali", "English", "Hindi", "Arabic"],
        faker.number.int({ min: 1, max: 3 })
      ),
      certifications: Array(faker.number.int({ min: 1, max: 4 }))
        .fill()
        .map(() => ({
          name: faker.lorem.words(3),
          issuer: faker.company.name(),
          year: faker.number.int({ min: 2015, max: 2024 }),
        })),
    });
  }
  return gymbros;
};

// Generate mock data
const mockMarathons = generateMockMarathons();
const mockGyms = generateMockGyms();
const mockGymBros = generateMockGymBros();

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper function to filter by distance
function filterByDistance(items, userLat, userLon, maxDistance = 10) {
  return items.filter((item) => {
    const distance = calculateDistance(userLat, userLon, item.coordinates.lat, item.coordinates.lon);
    return distance <= maxDistance;
  });
}

// Endpoints
app.get("/api/v1/marathon", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const nearbyMarathons = filterByDistance(mockMarathons, parseFloat(lat), parseFloat(lon));
  res.json({
    success: true,
    data: nearbyMarathons,
  });
});

app.get("/api/v1/gyms", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const nearbyGyms = filterByDistance(mockGyms, parseFloat(lat), parseFloat(lon));
  res.json({
    success: true,
    data: nearbyGyms,
  });
});

app.get("/api/v1/gymbros", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const nearbyGymBros = filterByDistance(mockGymBros, parseFloat(lat), parseFloat(lon));
  res.json({
    success: true,
    data: nearbyGymBros,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
