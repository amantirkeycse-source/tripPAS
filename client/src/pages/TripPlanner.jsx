import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  MapPin,
  Users,
  Sparkles,
  Bus,
  Train,
  Plane,
  Car,
  Route,
  Search,
  Check
} from 'lucide-react';

import StepIndicator from '../components/StepIndicator';
import destinations from '../data/destinations';
import { formatINR } from '../utils/format';
import { saveTrip, saveDestination } from '../services/api';

const steps = [
  'Start',
  'Destination',
  'Travelers',
  'Duration',
  'Month',
  'Style',
  'Transport'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const travelStyles = [
  {
    key: 'budget',
    label: 'Budget',
    desc: 'Hostels, local food, public transport',
    icon: '₹'
  },
  {
    key: 'comfort',
    label: 'Comfort',
    desc: '3★ hotels, good food, private cabs',
    icon: '₹₹'
  },
  {
    key: 'premium',
    label: 'Premium',
    desc: '4★ resorts, premium dining, private car',
    icon: '₹₹₹'
  },
  {
    key: 'luxury',
    label: 'Luxury',
    desc: '5★ luxury, fine dining, chauffeur',
    icon: '₹₹₹₹'
  }
];

const transportOptions = [
  { key: 'bus', label: 'Bus', icon: Bus },
  { key: 'train', label: 'Train', icon: Train },
  { key: 'flight', label: 'Flight', icon: Plane },
  { key: 'car', label: 'Car', icon: Car },
  { key: 'mixed', label: 'Mixed', icon: Route }
];

/*
|--------------------------------------------------------------------------
| Starting city suggestions
|--------------------------------------------------------------------------
*/

const popularCities = [
  // Delhi & NCR
  { name: 'Delhi', state: 'Delhi', country: 'India' },
  { name: 'New Delhi', state: 'Delhi', country: 'India' },
  { name: 'Gurugram', state: 'Haryana', country: 'India' },
  { name: 'Noida', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Faridabad', state: 'Haryana', country: 'India' },

  // Maharashtra
  { name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { name: 'Pune', state: 'Maharashtra', country: 'India' },
  { name: 'Nagpur', state: 'Maharashtra', country: 'India' },
  { name: 'Nashik', state: 'Maharashtra', country: 'India' },
  { name: 'Aurangabad', state: 'Maharashtra', country: 'India' },
  { name: 'Navi Mumbai', state: 'Maharashtra', country: 'India' },
  { name: 'Kolhapur', state: 'Maharashtra', country: 'India' },
  { name: 'Solapur', state: 'Maharashtra', country: 'India' },
  { name: 'Amravati', state: 'Maharashtra', country: 'India' },

  // Karnataka
  { name: 'Bengaluru', state: 'Karnataka', country: 'India' },
  { name: 'Mysuru', state: 'Karnataka', country: 'India' },
  { name: 'Mangalore', state: 'Karnataka', country: 'India' },
  { name: 'Hubli', state: 'Karnataka', country: 'India' },
  { name: 'Belagavi', state: 'Karnataka', country: 'India' },
  { name: 'Shivamogga', state: 'Karnataka', country: 'India' },

  // Tamil Nadu
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'India' },
  { name: 'Madurai', state: 'Tamil Nadu', country: 'India' },
  { name: 'Salem', state: 'Tamil Nadu', country: 'India' },
  { name: 'Tiruchirappalli', state: 'Tamil Nadu', country: 'India' },
  { name: 'Tiruppur', state: 'Tamil Nadu', country: 'India' },
  { name: 'Vellore', state: 'Tamil Nadu', country: 'India' },
  { name: 'Thoothukudi', state: 'Tamil Nadu', country: 'India' },

  // Telangana
  { name: 'Hyderabad', state: 'Telangana', country: 'India' },
  { name: 'Warangal', state: 'Telangana', country: 'India' },
  { name: 'Nizamabad', state: 'Telangana', country: 'India' },
  { name: 'Karimnagar', state: 'Telangana', country: 'India' },

  // Andhra Pradesh
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', country: 'India' },
  { name: 'Tirupati', state: 'Andhra Pradesh', country: 'India' },
  { name: 'Guntur', state: 'Andhra Pradesh', country: 'India' },
  { name: 'Nellore', state: 'Andhra Pradesh', country: 'India' },

  // Kerala
  { name: 'Kochi', state: 'Kerala', country: 'India' },
  { name: 'Thiruvananthapuram', state: 'Kerala', country: 'India' },
  { name: 'Kozhikode', state: 'Kerala', country: 'India' },
  { name: 'Thrissur', state: 'Kerala', country: 'India' },
  { name: 'Kannur', state: 'Kerala', country: 'India' },
  { name: 'Kollam', state: 'Kerala', country: 'India' },

  // West Bengal
  { name: 'Kolkata', state: 'West Bengal', country: 'India' },
  { name: 'Siliguri', state: 'West Bengal', country: 'India' },
  { name: 'Durgapur', state: 'West Bengal', country: 'India' },
  { name: 'Asansol', state: 'West Bengal', country: 'India' },

  // Gujarat
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { name: 'Surat', state: 'Gujarat', country: 'India' },
  { name: 'Vadodara', state: 'Gujarat', country: 'India' },
  { name: 'Rajkot', state: 'Gujarat', country: 'India' },
  { name: 'Gandhinagar', state: 'Gujarat', country: 'India' },
  { name: 'Bhavnagar', state: 'Gujarat', country: 'India' },

  // Rajasthan
  { name: 'Jaipur', state: 'Rajasthan', country: 'India' },
  { name: 'Jodhpur', state: 'Rajasthan', country: 'India' },
  { name: 'Udaipur', state: 'Rajasthan', country: 'India' },
  { name: 'Kota', state: 'Rajasthan', country: 'India' },
  { name: 'Ajmer', state: 'Rajasthan', country: 'India' },
  { name: 'Bikaner', state: 'Rajasthan', country: 'India' },

  // Uttar Pradesh
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Kanpur', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Varanasi', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Agra', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Prayagraj', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Meerut', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Mathura', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Bareilly', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India' },

  // Madhya Pradesh
  { name: 'Bhopal', state: 'Madhya Pradesh', country: 'India' },
  { name: 'Indore', state: 'Madhya Pradesh', country: 'India' },
  { name: 'Jabalpur', state: 'Madhya Pradesh', country: 'India' },
  { name: 'Gwalior', state: 'Madhya Pradesh', country: 'India' },
  { name: 'Ujjain', state: 'Madhya Pradesh', country: 'India' },
  { name: 'Sagar', state: 'Madhya Pradesh', country: 'India' },

  // Chhattisgarh
  { name: 'Raipur', state: 'Chhattisgarh', country: 'India' },
  { name: 'Bhilai', state: 'Chhattisgarh', country: 'India' },
  { name: 'Bilaspur', state: 'Chhattisgarh', country: 'India' },
  { name: 'Durg', state: 'Chhattisgarh', country: 'India' },
  { name: 'Korba', state: 'Chhattisgarh', country: 'India' },
  { name: 'Jagdalpur', state: 'Chhattisgarh', country: 'India' },

  // Bihar
  { name: 'Patna', state: 'Bihar', country: 'India' },
  { name: 'Gaya', state: 'Bihar', country: 'India' },
  { name: 'Muzaffarpur', state: 'Bihar', country: 'India' },
  { name: 'Bhagalpur', state: 'Bihar', country: 'India' },

  // Jharkhand
  { name: 'Ranchi', state: 'Jharkhand', country: 'India' },
  { name: 'Jamshedpur', state: 'Jharkhand', country: 'India' },
  { name: 'Dhanbad', state: 'Jharkhand', country: 'India' },
  { name: 'Bokaro', state: 'Jharkhand', country: 'India' },

  // Odisha
  { name: 'Bhubaneswar', state: 'Odisha', country: 'India' },
  { name: 'Cuttack', state: 'Odisha', country: 'India' },
  { name: 'Rourkela', state: 'Odisha', country: 'India' },
  { name: 'Puri', state: 'Odisha', country: 'India' },

  // Punjab
  { name: 'Amritsar', state: 'Punjab', country: 'India' },
  { name: 'Ludhiana', state: 'Punjab', country: 'India' },
  { name: 'Jalandhar', state: 'Punjab', country: 'India' },
  { name: 'Patiala', state: 'Punjab', country: 'India' },

  // Haryana
  { name: 'Panipat', state: 'Haryana', country: 'India' },
  { name: 'Karnal', state: 'Haryana', country: 'India' },
  { name: 'Hisar', state: 'Haryana', country: 'India' },
  { name: 'Ambala', state: 'Haryana', country: 'India' },

  // Uttarakhand
  { name: 'Dehradun', state: 'Uttarakhand', country: 'India' },
  { name: 'Haridwar', state: 'Uttarakhand', country: 'India' },
  { name: 'Rishikesh', state: 'Uttarakhand', country: 'India' },
  { name: 'Nainital', state: 'Uttarakhand', country: 'India' },
  { name: 'Haldwani', state: 'Uttarakhand', country: 'India' },

  // Himachal Pradesh
  { name: 'Shimla', state: 'Himachal Pradesh', country: 'India' },
  { name: 'Manali', state: 'Himachal Pradesh', country: 'India' },
  { name: 'Dharamshala', state: 'Himachal Pradesh', country: 'India' },
  { name: 'Kullu', state: 'Himachal Pradesh', country: 'India' },
  { name: 'Solan', state: 'Himachal Pradesh', country: 'India' },

  // Goa
  { name: 'Panaji', state: 'Goa', country: 'India' },
  { name: 'Vasco da Gama', state: 'Goa', country: 'India' },
  { name: 'Margao', state: 'Goa', country: 'India' },

  // Assam & Northeast
  { name: 'Guwahati', state: 'Assam', country: 'India' },
  { name: 'Dibrugarh', state: 'Assam', country: 'India' },
  { name: 'Shillong', state: 'Meghalaya', country: 'India' },
  { name: 'Gangtok', state: 'Sikkim', country: 'India' },
  { name: 'Imphal', state: 'Manipur', country: 'India' },
  { name: 'Aizawl', state: 'Mizoram', country: 'India' },
  { name: 'Agartala', state: 'Tripura', country: 'India' },
  { name: 'Itanagar', state: 'Arunachal Pradesh', country: 'India' },

  // Jammu & Kashmir / Ladakh
  { name: 'Srinagar', state: 'Jammu and Kashmir', country: 'India' },
  { name: 'Jammu', state: 'Jammu and Kashmir', country: 'India' },
  { name: 'Leh', state: 'Ladakh', country: 'India' },

  // Andhra / other important cities
  { name: 'Mangaluru', state: 'Karnataka', country: 'India' },
  { name: 'Pondicherry', state: 'Puducherry', country: 'India' }
];

const TripPlanner = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialDestination = location.state?.destinationId || '';

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Autocomplete state
  |--------------------------------------------------------------------------
  */

  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

  const [citySearch, setCitySearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');

  const [cityHighlight, setCityHighlight] = useState(-1);
  const [destinationHighlight, setDestinationHighlight] = useState(-1);

  const cityWrapperRef = useRef(null);
  const destinationWrapperRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] = useState({
    startingCity: '',
    destinationId: initialDestination,
    adults: 2,
    children: 0,
    days: 3,
    travelMonth: 'October',
    travelStyle: 'budget',
    transportPreference: 'mixed'
  });

  /*
  |--------------------------------------------------------------------------
  | Update field
  |--------------------------------------------------------------------------
  */

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Selected destination
  |--------------------------------------------------------------------------
  */

  const selectedDestination = useMemo(() => {
    return destinations.find(
      (destination) =>
        destination.id === formData.destinationId
    );
  }, [formData.destinationId]);

  /*
  |--------------------------------------------------------------------------
  | City search
  |--------------------------------------------------------------------------
  */

  const filteredCities = useMemo(() => {
    const query = citySearch.trim().toLowerCase();

    if (!query) {
      return popularCities.slice(0, 8);
    }

    return popularCities
      .filter((city) => {
        return (
          city.name.toLowerCase().includes(query) ||
          city.state.toLowerCase().includes(query) ||
          city.country.toLowerCase().includes(query)
        );
      })
      .slice(0, 8);
  }, [citySearch]);

  /*
  |--------------------------------------------------------------------------
  | Destination search
  |--------------------------------------------------------------------------
  */

  const filteredDestinations = useMemo(() => {
    const query = destinationSearch.trim().toLowerCase();

    if (!query) {
      return destinations.slice(0, 8);
    }

    return destinations
      .filter((destination) => {
        return (
          destination.name
            ?.toLowerCase()
            .includes(query) ||
          destination.country
            ?.toLowerCase()
            .includes(query) ||
          destination.state
            ?.toLowerCase()
            .includes(query) ||
          destination.region
            ?.toLowerCase()
            .includes(query) ||
          destination.tags?.some((tag) =>
            tag.toLowerCase().includes(query)
          )
        );
      })
      .slice(0, 8);
  }, [destinationSearch]);

  /*
  |--------------------------------------------------------------------------
  | Close dropdown when clicking outside
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        cityWrapperRef.current &&
        !cityWrapperRef.current.contains(event.target)
      ) {
        setShowCitySuggestions(false);
        setCityHighlight(-1);
      }

      if (
        destinationWrapperRef.current &&
        !destinationWrapperRef.current.contains(event.target)
      ) {
        setShowDestinationSuggestions(false);
        setDestinationHighlight(-1);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Select city
  |--------------------------------------------------------------------------
  */

  const selectCity = (city) => {
    updateField('startingCity', city.name);

    setCitySearch(city.name);
    setShowCitySuggestions(false);
    setCityHighlight(-1);
  };

  /*
  |--------------------------------------------------------------------------
  | Select destination
  |--------------------------------------------------------------------------
  */

  const selectDestination = (destination) => {
    updateField('destinationId', destination.id);

    setDestinationSearch(destination.name);
    setShowDestinationSuggestions(false);
    setDestinationHighlight(-1);
  };

  /*
  |--------------------------------------------------------------------------
  | City keyboard navigation
  |--------------------------------------------------------------------------
  */

  const handleCityKeyDown = (event) => {
    if (!showCitySuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      setCityHighlight((prev) =>
        Math.min(
          prev + 1,
          filteredCities.length - 1
        )
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      setCityHighlight((prev) =>
        Math.max(prev - 1, 0)
      );
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (
        cityHighlight >= 0 &&
        filteredCities[cityHighlight]
      ) {
        selectCity(filteredCities[cityHighlight]);
      }
    }

    if (event.key === 'Escape') {
      setShowCitySuggestions(false);
      setCityHighlight(-1);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Destination keyboard navigation
  |--------------------------------------------------------------------------
  */

  const handleDestinationKeyDown = (event) => {
    if (!showDestinationSuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      setDestinationHighlight((prev) =>
        Math.min(
          prev + 1,
          filteredDestinations.length - 1
        )
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      setDestinationHighlight((prev) =>
        Math.max(prev - 1, 0)
      );
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (
        destinationHighlight >= 0 &&
        filteredDestinations[destinationHighlight]
      ) {
        selectDestination(
          filteredDestinations[destinationHighlight]
        );
      }
    }

    if (event.key === 'Escape') {
      setShowDestinationSuggestions(false);
      setDestinationHighlight(-1);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.startingCity.trim().length > 0;

      case 1:
        return Boolean(formData.destinationId);

      case 2:
        return formData.adults > 0;

      case 3:
        return formData.days > 0;

      case 4:
        return Boolean(formData.travelMonth);

      case 5:
        return Boolean(formData.travelStyle);

      case 6:
        return Boolean(
          formData.transportPreference
        );

      default:
        return true;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Navigation
  |--------------------------------------------------------------------------
  */

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleCalculate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Save trip
  |--------------------------------------------------------------------------
  */

  const handleCalculate = async () => {
    setLoading(true);

    try {
      const result = await saveTrip(formData);

      console.log(
        'Trip saved successfully:',
        result
      );

      // Auto-save destination for this user
      // (ignore 409 = already saved)
      try {
        await saveDestination(formData.destinationId);
      } catch (destErr) {
        // 409 means already saved — that's fine
        if (destErr.message && !destErr.message.includes('409')) {
          console.warn('Could not save destination:', destErr);
        }
      }

      const destination = destinations.find(
        (destination) =>
          destination.id === formData.destinationId
      );

      navigate('/analyzer', {
        state: {
          ...formData,
          destination
        }
      });
    } catch (error) {
      console.error(
        'Failed to save trip:',
        error
      );

      alert(
        `Could not save trip: ${
          error.message || 'Unknown error'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render steps
  |--------------------------------------------------------------------------
  */

  const renderStep = () => {
    switch (currentStep) {
      /*
      ============================================================
      STEP 0 - STARTING CITY
      ============================================================
      */

      case 0:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              Where are you starting from?
            </h3>

            <div
              ref={cityWrapperRef}
              className="relative"
            >
              <MapPin
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted z-10"
              />

              <input
                type="text"
                value={formData.startingCity}
                onChange={(event) => {
                  const value = event.target.value;

                  updateField(
                    'startingCity',
                    value
                  );

                  setCitySearch(value);
                  setShowCitySuggestions(true);
                  setCityHighlight(-1);
                }}
                onFocus={() => {
                  setCitySearch(
                    formData.startingCity
                  );

                  setShowCitySuggestions(true);
                }}
                onKeyDown={handleCityKeyDown}
                placeholder="Enter your starting city..."
                className="input-field pl-12 pr-12 py-4 text-lg"
                aria-label="Starting city"
                autoComplete="off"
              />

              {formData.startingCity && (
                <button
                  type="button"
                  onClick={() => {
                    updateField(
                      'startingCity',
                      ''
                    );

                    setCitySearch('');
                    setCityHighlight(-1);
                    setShowCitySuggestions(true);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                  aria-label="Clear starting city"
                >
                  ×
                </button>
              )}

              <AnimatePresence>
                {showCitySuggestions && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                      scale: 0.98
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                      scale: 0.98
                    }}
                    transition={{
                      duration: 0.18
                    }}
                    className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {citySearch.trim()
                          ? 'Matching cities'
                          : 'Popular starting cities'}
                      </p>
                    </div>

                    {filteredCities.length > 0 ? (
                      <div className="max-h-72 overflow-y-auto">
                        {filteredCities.map(
                          (city, index) => (
                            <button
                              key={`${city.name}-${city.state}`}
                              type="button"
                              onMouseDown={(event) => {
                                event.preventDefault();
                                selectCity(city);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                cityHighlight === index
                                  ? 'bg-primary-50'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                                <MapPin
                                  size={18}
                                  className="text-primary-500"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-dark">
                                  {city.name}
                                </p>

                                <p className="text-xs text-muted truncate">
                                  {city.state} ·{' '}
                                  {city.country}
                                </p>
                              </div>

                              {formData.startingCity.toLowerCase() ===
                                city.name.toLowerCase() && (
                                <Check
                                  size={18}
                                  className="text-primary-500"
                                />
                              )}
                            </button>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="px-5 py-6 text-center">
                        <Search
                          size={24}
                          className="mx-auto text-muted mb-2"
                        />

                        <p className="font-medium text-dark">
                          No city found
                        </p>

                        <p className="text-sm text-muted mt-1">
                          You can still enter your city manually.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );

      /*
      ============================================================
      STEP 1 - DESTINATION
      ============================================================
      */

      case 1:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              Where are you going?
            </h3>

            <div
              ref={destinationWrapperRef}
              className="relative mb-5"
            >
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted z-10"
              />

              <input
                type="text"
                value={
                  destinationSearch ||
                  selectedDestination?.name ||
                  ''
                }
                onChange={(event) => {
                  const value = event.target.value;

                  setDestinationSearch(value);

                  if (
                    formData.destinationId &&
                    selectedDestination &&
                    value !== selectedDestination.name
                  ) {
                    updateField(
                      'destinationId',
                      ''
                    );
                  }

                  setShowDestinationSuggestions(true);
                  setDestinationHighlight(-1);
                }}
                onFocus={() => {
                  setShowDestinationSuggestions(true);
                }}
                onKeyDown={
                  handleDestinationKeyDown
                }
                placeholder="Search destination..."
                className="input-field pl-12 pr-12 py-4 text-lg"
                aria-label="Search destination"
                autoComplete="off"
              />

              {(destinationSearch ||
                selectedDestination) && (
                <button
                  type="button"
                  onClick={() => {
                    setDestinationSearch('');
                    updateField(
                      'destinationId',
                      ''
                    );
                    setDestinationHighlight(-1);
                    setShowDestinationSuggestions(
                      true
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                  aria-label="Clear destination"
                >
                  ×
                </button>
              )}

              <AnimatePresence>
                {showDestinationSuggestions && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                      scale: 0.98
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                      scale: 0.98
                    }}
                    transition={{
                      duration: 0.18
                    }}
                    className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {destinationSearch.trim()
                          ? 'Matching destinations'
                          : 'Popular destinations'}
                      </p>
                    </div>

                    {filteredDestinations.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {filteredDestinations.map(
                          (destination, index) => (
                            <button
                              key={destination.id}
                              type="button"
                              onMouseDown={(event) => {
                                event.preventDefault();

                                selectDestination(
                                  destination
                                );
                              }}
                              className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                                destinationHighlight ===
                                index
                                  ? 'bg-primary-50'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <img
                                src={destination.image}
                                alt=""
                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                              />

                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-dark">
                                  {destination.name}
                                </p>

                                <p className="text-xs text-muted truncate">
                                  {destination.country}
                                  {destination.state
                                    ? ` · ${destination.state}`
                                    : ''}
                                </p>

                                <p className="text-xs text-primary-500 mt-0.5">
                                  From{' '}
                                  {formatINR(
                                    destination.startingBudget
                                  )}
                                </p>
                              </div>

                              {formData.destinationId ===
                                destination.id && (
                                <Check
                                  size={19}
                                  className="text-primary-500 shrink-0"
                                />
                              )}
                            </button>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="px-5 py-7 text-center">
                        <Search
                          size={26}
                          className="mx-auto text-muted mb-2"
                        />

                        <p className="font-medium text-dark">
                          No destination found
                        </p>

                        <p className="text-sm text-muted mt-1">
                          Try another city or destination.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selected destination preview */}
            {selectedDestination && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 border border-primary-100"
              >
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />

                <div>
                  <p className="font-semibold text-dark">
                    {selectedDestination.name}
                  </p>

                  <p className="text-sm text-muted">
                    {selectedDestination.country}
                    {selectedDestination.state
                      ? ` · ${selectedDestination.state}`
                      : ''}
                  </p>
                </div>

                <Check
                  size={20}
                  className="text-primary-500 ml-auto"
                />
              </motion.div>
            )}
          </div>
        );

      /*
      ============================================================
      STEP 2 - TRAVELERS
      ============================================================
      */

      case 2:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              How many travelers?
            </h3>

            <div className="space-y-6">

              <div>
                <label className="label-field flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-primary-500"
                  />
                  Adults
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'adults',
                        Math.max(
                          1,
                          formData.adults - 1
                        )
                      )
                    }
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold hover:border-primary-500 transition-colors"
                    aria-label="Decrease adults"
                  >
                    −
                  </button>

                  <span className="text-3xl font-display font-bold text-dark w-12 text-center">
                    {formData.adults}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'adults',
                        Math.min(
                          10,
                          formData.adults + 1
                        )
                      )
                    }
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold hover:border-primary-500 transition-colors"
                    aria-label="Increase adults"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="label-field flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-primary-500"
                  />
                  Children
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'children',
                        Math.max(
                          0,
                          formData.children - 1
                        )
                      )
                    }
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold hover:border-primary-500 transition-colors"
                    aria-label="Decrease children"
                  >
                    −
                  </button>

                  <span className="text-3xl font-display font-bold text-dark w-12 text-center">
                    {formData.children}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'children',
                        Math.min(
                          5,
                          formData.children + 1
                        )
                      )
                    }
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold hover:border-primary-500 transition-colors"
                    aria-label="Increase children"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          </div>
        );

      /*
      ============================================================
      STEP 3 - DAYS
      ============================================================
      */

      case 3:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              How many days?
            </h3>

            <div className="flex items-center gap-6">
              <input
                type="range"
                min="1"
                max="14"
                value={formData.days}
                onChange={(event) =>
                  updateField(
                    'days',
                    Number(event.target.value)
                  )
                }
                className="flex-1"
                style={{
                  '--range-progress': `${
                    ((formData.days - 1) / 13) * 100
                  }%`
                }}
                aria-label="Trip duration in days"
              />

              <div className="text-center">
                <span className="text-4xl font-display font-bold text-primary-500">
                  {formData.days}
                </span>

                <p className="text-sm text-muted">
                  days
                </p>
              </div>
            </div>

            <p className="text-sm text-muted mt-4">
              {formData.days === 1
                ? 'Perfect for a quick getaway'
                : formData.days <= 3
                ? 'Great for a short break'
                : formData.days <= 7
                ? 'Ideal for a proper trip'
                : 'A full adventure!'}
            </p>
          </div>
        );

      /*
      ============================================================
      STEP 4 - MONTH
      ============================================================
      */

      case 4:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              When are you traveling?
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() =>
                    updateField(
                      'travelMonth',
                      month
                    )
                  }
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    formData.travelMonth === month
                      ? 'border-primary-500 bg-primary-50 text-primary-500'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        );

      /*
      ============================================================
      STEP 5 - STYLE
      ============================================================
      */

      case 5:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              Travel style
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.key}
                  type="button"
                  onClick={() =>
                    updateField(
                      'travelStyle',
                      style.key
                    )
                  }
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.travelStyle ===
                    style.key
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-dark">
                      {style.label}
                    </span>

                    <span className="text-primary-500 font-bold">
                      {style.icon}
                    </span>
                  </div>

                  <p className="text-xs text-muted">
                    {style.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      /*
      ============================================================
      STEP 6 - TRANSPORT
      ============================================================
      */

      case 6:
        return (
          <div>
            <h3 className="text-2xl font-display font-semibold text-dark mb-6">
              Travel preferences
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {transportOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() =>
                      updateField(
                        'transportPreference',
                        option.key
                      )
                    }
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      formData.transportPreference ===
                      option.key
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <Icon
                      size={24}
                      className="text-primary-500"
                    />

                    <span className="font-medium text-dark text-sm">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-dark mb-3">
            Plan Your Trip
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto">
            Answer a few questions and we'll calculate your estimated trip budget.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">

          <StepIndicator
            steps={steps}
            currentStep={currentStep}
          />

          <div className="card p-6 lg:p-8">

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                transition={{
                  duration: 0.3
                }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">

              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !canProceed() || loading
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Calculating...
                  </>
                ) : currentStep ===
                  steps.length - 1 ? (
                  <>
                    <Sparkles size={18} />
                    Calculate My Trip
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;