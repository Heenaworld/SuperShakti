// Comprehensive Geographic Directory of States/Provinces and Major Cities
// Covers USA (all 50 states + DC), UK (England, Scotland, Wales, NI),
// Canada (10 provinces + 3 territories), India (all states/UTs),
// Australia (all states/territories), and EU Member States.

export const GEOGRAPHIC_DIRECTORY = {
  US: [
    { name: "Alabama", code: "AL", cities: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa", "Hoover"] },
    { name: "Alaska", code: "AK", cities: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"] },
    { name: "Arizona", code: "AZ", cities: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Chandler", "Tempe", "Flagstaff", "Glendale"] },
    { name: "Arkansas", code: "AR", cities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro", "Rogers"] },
    { name: "California", code: "CA", cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Oakland", "Fresno", "Long Beach", "Anaheim", "Bakersfield", "Pasadena", "Berkeley"] },
    { name: "Colorado", code: "CO", cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Boulder", "Pueblo"] },
    { name: "Connecticut", code: "CT", cities: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury", "Norwalk", "Danbury"] },
    { name: "Delaware", code: "DE", cities: ["Wilmington", "Dover", "Newark", "Middletown", "Rehoboth Beach"] },
    { name: "District of Columbia", code: "DC", cities: ["Washington D.C.", "Georgetown", "Capitol Hill", "Dupont Circle", "Adams Morgan"] },
    { name: "Florida", code: "FL", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Tallahassee", "Fort Lauderdale", "Sarasota", "Gainesville", "Pensacola"] },
    { name: "Georgia", code: "GA", cities: ["Atlanta", "Augusta", "Savannah", "Columbus", "Athens", "Macon", "Sandy Springs", "Roswell"] },
    { name: "Hawaii", code: "HI", cities: ["Honolulu", "Hilo", "Kailua", "Kapolei", "Kahului", "Kaneohe"] },
    { name: "Idaho", code: "ID", cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Caldwell", "Coeur d'Alene", "Twin Falls"] },
    { name: "Illinois", code: "IL", cities: ["Chicago", "Aurora", "Naperville", "Rockford", "Joliet", "Springfield", "Peoria", "Evanston", "Elgin"] },
    { name: "Indiana", code: "IN", cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Bloomington", "Fishers"] },
    { name: "Iowa", code: "IA", cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo", "Ames"] },
    { name: "Kansas", code: "KS", cities: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe", "Lawrence", "Shawnee"] },
    { name: "Kentucky", code: "KY", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Frankfort"] },
    { name: "Louisiana", code: "LA", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Kenner"] },
    { name: "Maine", code: "ME", cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn", "Biddeford"] },
    { name: "Maryland", code: "MD", cities: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Annapolis", "Bethesda", "Silver Spring"] },
    { name: "Massachusetts", code: "MA", cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Brockton", "New Bedford", "Quincy"] },
    { name: "Michigan", code: "MI", cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn"] },
    { name: "Minnesota", code: "MN", cities: ["Minneapolis", "Saint Paul", "Rochester", "Bloomington", "Duluth", "Brooklyn Park", "Plymouth"] },
    { name: "Mississippi", code: "MS", cities: ["Jackson", "Gulfport", "Southaven", "Biloxi", "Hattiesburg", "Tupelo"] },
    { name: "Missouri", code: "MO", cities: ["Kansas City", "Saint Louis", "Springfield", "Columbia", "Independence", "Lee's Summit"] },
    { name: "Montana", code: "MT", cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena", "Kalispell"] },
    { name: "Nebraska", code: "NE", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney", "Fremont"] },
    { name: "Nevada", code: "NV", cities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City"] },
    { name: "New Hampshire", code: "NH", cities: ["Manchester", "Nashua", "Concord", "Dover", "Portsmouth", "Rochester"] },
    { name: "New Jersey", code: "NJ", cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Trenton", "Princeton", "Hoboken", "Atlantic City"] },
    { name: "New Mexico", code: "NM", cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell", "Farmington"] },
    { name: "New York", code: "NY", cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "White Plains", "Ithaca", "New Rochelle"] },
    { name: "North Carolina", code: "NC", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "Asheville"] },
    { name: "North Dakota", code: "ND", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo", "Williston"] },
    { name: "Ohio", code: "OH", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Canton", "Youngstown"] },
    { name: "Oklahoma", code: "OK", cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond", "Lawton", "Stillwater"] },
    { name: "Oregon", code: "OR", cities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Beaverton", "Bend", "Medford"] },
    { name: "Pennsylvania", code: "PA", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Reading", "Erie", "Scranton", "Bethlehem", "Harrisburg", "Lancaster"] },
    { name: "Rhode Island", code: "RI", cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence", "Newport"] },
    { name: "South Carolina", code: "SC", cities: ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Greenville", "Rock Hill", "Myrtle Beach"] },
    { name: "South Dakota", code: "SD", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"] },
    { name: "Tennessee", code: "TN", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro", "Franklin"] },
    { name: "Texas", code: "TX", cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock", "Irving"] },
    { name: "Utah", code: "UT", cities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy", "Ogden", "St. George"] },
    { name: "Vermont", code: "VT", cities: ["Burlington", "South Burlington", "Rutland", "Montpelier", "Barre", "Winooski"] },
    { name: "Virginia", code: "VA", cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Arlington", "Alexandria", "Newport News", "Roanoke", "Charlottesville"] },
    { name: "Washington", code: "WA", cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett", "Renton", "Olympia", "Redmond", "Bellingham"] },
    { name: "West Virginia", code: "WV", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling", "Martinsburg"] },
    { name: "Wisconsin", code: "WI", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha", "Eau Claire"] },
    { name: "Wyoming", code: "WY", cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs", "Jackson"] }
  ],
  GB: [
    { name: "England", code: "ENG", cities: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Newcastle upon Tyne", "Sheffield", "Nottingham", "Southampton", "Leicester", "Oxford", "Cambridge", "Brighton", "Bath", "York", "Exeter", "Norwich"] },
    { name: "Scotland", code: "SCT", cities: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Inverness", "Stirling", "Perth", "St Andrews", "Paisley"] },
    { name: "Wales", code: "WLS", cities: ["Cardiff", "Swansea", "Newport", "Wrexham", "Bangor", "Barry", "St Davids", "Aberystwyth"] },
    { name: "Northern Ireland", code: "NIR", cities: ["Belfast", "Derry / Londonderry", "Lisburn", "Newry", "Bangor", "Armagh", "Coleraine", "Enniskillen"] }
  ],
  CA: [
    { name: "Alberta", code: "AB", cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Fort McMurray", "Medicine Hat", "Banff"] },
    { name: "British Columbia", code: "BC", cities: ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Kelowna", "Abbotsford", "Coquitlam", "Nanaimo", "Kamloops"] },
    { name: "Manitoba", code: "MB", cities: ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie"] },
    { name: "New Brunswick", code: "NB", cities: ["Moncton", "Saint John", "Fredericton", "Dieppe", "Miramichi"] },
    { name: "Newfoundland and Labrador", code: "NL", cities: ["St. John's", "Corner Brook", "Mount Pearl", "Conception Bay South", "Gander"] },
    { name: "Northwest Territories", code: "NT", cities: ["Yellowknife", "Hay River", "Inuvik", "Fort Smith"] },
    { name: "Nova Scotia", code: "NS", cities: ["Halifax", "Sydney", "Dartmouth", "Truro", "New Glasgow", "Cape Breton"] },
    { name: "Nunavut", code: "NU", cities: ["Iqaluit", "Rankin Inlet", "Arviat", "Baker Lake"] },
    { name: "Ontario", code: "ON", cities: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Kitchener", "Vaughan", "Windsor", "Burlington", "Kingston", "Waterloo"] },
    { name: "Prince Edward Island", code: "PE", cities: ["Charlottetown", "Summerside", "Stratford", "Cornwall"] },
    { name: "Quebec", code: "QC", cities: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Levis", "Trois-Rivieres"] },
    { name: "Saskatchewan", code: "SK", cities: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current"] },
    { name: "Yukon", code: "YT", cities: ["Whitehorse", "Dawson City", "Watson Lake"] }
  ],
  IN: [
    { name: "Andhra Pradesh", code: "AP", cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool", "Rajahmundry"] },
    { name: "Assam", code: "AS", cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"] },
    { name: "Bihar", code: "BR", cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia"] },
    { name: "Chandigarh", code: "CH", cities: ["Chandigarh"] },
    { name: "Chhattisgarh", code: "CG", cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon"] },
    { name: "Delhi NCR", code: "DL", cities: ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "West Delhi", "East Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad"] },
    { name: "Goa", code: "GA", cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"] },
    { name: "Gujarat", code: "GJ", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh"] },
    { name: "Haryana", code: "HR", cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak", "Sonipat"] },
    { name: "Himachal Pradesh", code: "HP", cities: ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi", "Kullu"] },
    { name: "Jammu & Kashmir", code: "JK", cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"] },
    { name: "Jharkhand", code: "JH", cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"] },
    { name: "Karnataka", code: "KA", cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi-Dharwad", "Belagavi", "Kalaburagi", "Shivamogga", "Udupi"] },
    { name: "Kerala", code: "KL", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Palakkad", "Kannur"] },
    { name: "Madhya Pradesh", code: "MP", cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas"] },
    { name: "Maharashtra", code: "MH", cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad (Chhatrapati Sambhajinagar)", "Navi Mumbai", "Solapur", "Kolhapur", "Amravati"] },
    { name: "Odisha", code: "OR", cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"] },
    { name: "Punjab", code: "PB", cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot"] },
    { name: "Rajasthan", code: "RJ", cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara"] },
    { name: "Tamil Nadu", code: "TN", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi"] },
    { name: "Telangana", code: "TG", cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Secunderabad"] },
    { name: "Uttar Pradesh", code: "UP", cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Noida", "Ghaziabad", "Meerut", "Aligarh", "Bareilly", "Gorakhpur", "Mathura"] },
    { name: "Uttarakhand", code: "UT", cities: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Roorkee", "Nainital", "Mussoorie"] },
    { name: "West Bengal", code: "WB", cities: ["Kolkata", "Howrah", "Siliguri", "Asansol", "Durgapur", "Darjeeling", "Bardhaman", "Kharagpur"] }
  ],
  AU: [
    { name: "Australian Capital Territory", code: "ACT", cities: ["Canberra"] },
    { name: "New South Wales", code: "NSW", cities: ["Sydney", "Newcastle", "Central Coast", "Wollongong", "Maitland", "Tweed Heads", "Wagga Wagga", "Albury", "Byron Bay"] },
    { name: "Northern Territory", code: "NT", cities: ["Darwin", "Palmerston", "Alice Springs", "Katherine"] },
    { name: "Queensland", code: "QLD", cities: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns", "Toowoomba", "Mackay", "Rockhampton", "Bundaberg"] },
    { name: "South Australia", code: "SA", cities: ["Adelaide", "Mount Gambier", "Whyalla", "Murray Bridge", "Port Lincoln", "Port Augusta"] },
    { name: "Tasmania", code: "TAS", cities: ["Hobart", "Launceston", "Devonport", "Burnie", "Kingston"] },
    { name: "Victoria", code: "VIC", cities: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton", "Mildura", "Warrnambool", "Traralgon"] },
    { name: "Western Australia", code: "WA", cities: ["Perth", "Fremantle", "Mandurah", "Bunbury", "Geraldton", "Kalgoorlie", "Albany", "Broome"] }
  ],
  EU: [
    { name: "Austria", code: "AT", cities: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt"] },
    { name: "Belgium", code: "BE", cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liege", "Bruges", "Namur"] },
    { name: "Czech Republic", code: "CZ", cities: ["Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc"] },
    { name: "Denmark", code: "DK", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"] },
    { name: "Finland", code: "FI", cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku"] },
    { name: "France", code: "FR", cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille", "Rennes", "Reims"] },
    { name: "Germany", code: "DE", cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Leipzig", "Dortmund", "Essen", "Bremen", "Dresden", "Nuremberg"] },
    { name: "Greece", code: "GR", cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Rhodes"] },
    { name: "Ireland", code: "IE", cities: ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk"] },
    { name: "Italy", code: "IT", cities: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania", "Venice", "Verona"] },
    { name: "Netherlands", code: "NL", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Tilburg", "Almere", "Breda"] },
    { name: "Poland", code: "PL", cities: ["Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan", "Gdansk", "Szczecin", "Bydgoszcz", "Lublin"] },
    { name: "Portugal", code: "PT", cities: ["Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", "Coimbra", "Setubal", "Faro"] },
    { name: "Spain", code: "ES", cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Malaga", "Murcia", "Palma de Mallorca", "Las Palmas", "Bilbao", "Alicante", "Cordoba"] },
    { name: "Sweden", code: "SE", cities: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Upplands Vasby", "Vasteras", "Orebro", "Linkoping"] }
  ]
};

// Helper: Normalize country code (e.g. UK -> GB)
export function normalizeCountryCode(countryCode) {
  if (!countryCode || countryCode === 'ALL') return 'US';
  const c = countryCode.toUpperCase();
  if (c === 'UK') return 'GB';
  return c;
}

// Get all official states/regions for a country
export function getAllStatesForCountry(countryCode) {
  const code = normalizeCountryCode(countryCode);
  return GEOGRAPHIC_DIRECTORY[code] || GEOGRAPHIC_DIRECTORY['US'] || [];
}

// Get all official cities for a country and state
export function getAllCitiesForCountryAndState(countryCode, stateNameOrCode) {
  const states = getAllStatesForCountry(countryCode);
  if (!stateNameOrCode || stateNameOrCode === 'ALL') {
    // Return all unique cities across all states in that country
    const allCities = new Set();
    states.forEach(s => s.cities.forEach(c => allCities.add(c)));
    return Array.from(allCities).sort((a, b) => a.localeCompare(b));
  }
  const match = states.find(s => 
    s.name.toLowerCase() === stateNameOrCode.toLowerCase() || 
    (s.code && s.code.toLowerCase() === stateNameOrCode.toLowerCase())
  );
  if (match) {
    return [...match.cities].sort((a, b) => a.localeCompare(b));
  }
  return [];
}
