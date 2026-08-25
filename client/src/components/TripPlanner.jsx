import { useState, useEffect, useRef } from 'react';
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
  Route
} from 'lucide-react';

import StepIndicator from '../components/StepIndicator';
import destinations from '../data/destinations';
import { formatINR } from '../utils/format';
import { saveTrip } from '../services/api';

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
  {
    key: 'bus',
    label: 'Bus',
    icon: Bus
  },
  {
    key: 'train',
    label: 'Train',
    icon: Train
  },
  {
    key: 'flight',
    label: 'Flight',
    icon: Plane
  },
  {
    key: 'car',
    label: 'Car',
    icon: Car
  },
  {
    key: 'mixed',
    label: 'Mixed',
    icon: Route
  }
];

/*
|--------------------------------------------------------------------------
| Indian Cities
|--------------------------------------------------------------------------
| Starting city suggestions.
| User can still type any city manually even if it is not in this list.
*/

const indianCities = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Bhopal',
  'Patna',
  'Ranchi',
  'Raipur',
  'Bhubaneswar',
  'Chandigarh',
  'Dehradun',
  'Shimla',
  'Srinagar',
  'Jammu',
  'Amritsar',
  'Ludhiana',
  'Jalandhar',
  'Agra',
  'Varanasi',
  'Prayagraj',
  'Meerut',
  'Noida',
  'Gurugram',
  'Faridabad',
  'Ghaziabad',
  'Udaipur',
  'Jodhpur',
  'Kota',
  'Ajmer',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Nashik',
  'Aurangabad',
  'Kolhapur',
  'Goa',
  'Panaji',
  'Mysuru',
  'Mangalore',
  'Kochi',
  'Thiruvananthapuram',
  'Coimbatore',
  'Madurai',
  'Visakhapatnam',
  'Vijayawada',
  'Amritsar',
  'Haridwar',
  'Rishikesh',
  'Manali',
  'Munnar',
  'Darjeeling',
  'Gangtok',
  'Siliguri',
  'Guwahati',
  'Shillong',
  'Jaisalmer',
  'Mount Abu',
  'Pondicherry',
  'Puducherry',
  'Varanasi',
  'Ayodhya',
  'Mathura',
  'Vrindavan',
  'Gwalior',
  'Jabalpur',
  'Bilaspur',
  'Durg',
  'Bhilai'
];

/*
|--------------------------------------------------------------------------
| Trip Planner
|--------------------------------------------------------------------------
*/

const TripPlanner = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialDestination =
    location.state?.destinationId || '';

  const [currentStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Form Data
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
  | City Suggestions
  |--------------------------------------------------------------------------
  */

  const [citySuggestions, setCitySuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const cityRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Update Field
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
  | Close City Suggestions When Clicking Outside
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cityRef.current &&
        !cityRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | City Search
  |--------------------------------------------------------------------------
  */

  const handleCityChange = (value) => {
    updateField('startingCity', value);

    const query = value.trim().toLowerCase();

    /*
    | Empty input
    */
    if (!query) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    /*
    | Search Indian cities
    */
    const matches = indianCities
      .filter((city) =>
        city.toLowerCase().includes(query)
      )
      .filter(
        (city, index, array) =>
          array.indexOf(city) === index
      )
      .slice(0, 7);

    setCitySuggestions(matches);

    setShowSuggestions(
      matches.length > 0
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Select City
  |--------------------------------------------------------------------------
  */

  const selectCity = (city) => {
    updateField('startingCity', city);

    setShowSuggestions(false);

    setCitySuggestions([]);
  };

  /*
  |--------------------------------------------------------------------------
  | Proceed Validation
  |--------------------------------------------------------------------------
  */

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.startingCity.trim().length > 0
        );

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
  | Next
  |--------------------------------------------------------------------------
  */

  const handleNext = () => {
    if (
      currentStep <
      steps.length - 1
    ) {
      setCurrentStep(
        currentStep + 1
      );
    } else {
      handleCalculate();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Back
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(
        currentStep - 1
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Calculate Trip
  |--------------------------------------------------------------------------
  */

  const handleCalculate = async () => {
    setLoading(true);

    try {
      /*
      | Save latest trip locally.
      | Compare page can use this data.
      */
      sessionStorage.setItem(
        'tripPAS_current_trip',
        JSON.stringify(formData)
      );

      /*
      | Try saving to backend.
      */
      try {
        const result =
          await saveTrip(formData);

        console.log(
          'Trip saved successfully:',
          result
        );
      } catch (backendError) {
        /*
        | Don't stop the user from using
        | the frontend if backend temporarily fails.
        */
        console.warn(
          'Backend save failed:',
          backendError
        );
      }

      /*
      | Find selected destination.
      */
      const destination =
        destinations.find(
          (dest) =>
            dest.id ===
            formData.destinationId
        );

      /*
      | Go to analyzer.
      */
      navigate('/analyzer', {
        state: {
          ...formData,
          destination
        }
      });

    } catch (error) {
      console.error(
        'Trip calculation failed:',
        error
      );

      alert(
        `Could not calculate trip: ${
          error.message
        }`
      );

    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render Current Step
  |--------------------------------------------------------------------------
  */

  const renderStep = () => {
    switch (currentStep) {

      /*
      |--------------------------------------------------------------------------
      | STEP 1 - STARTING CITY
      |--------------------------------------------------------------------------
      */

      case 0:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              Where are you starting from?
            </h3>

            <div
              ref={cityRef}
              className="relative"
            >

              {/* Input */}
              <div className="relative">

                <MapPin
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-muted
                    z-10
                  "
                />

                <input
                  type="text"
                  value={
                    formData.startingCity
                  }
                  onChange={(e) =>
                    handleCityChange(
                      e.target.value
                    )
                  }
                  onFocus={() => {
                    if (
                      citySuggestions.length >
                      0
                    ) {
                      setShowSuggestions(
                        true
                      );
                    }
                  }}
                  placeholder="
                    Enter your starting city
                    (e.g. Delhi, Mumbai)
                  "
                  className="
                    input-field
                    pl-12
                    py-4
                    text-lg
                    w-full
                  "
                  aria-label="Starting city"
                  autoComplete="off"
                />

              </div>

              {/* LIVE SUGGESTIONS */}
              <AnimatePresence>
                {showSuggestions &&
                  citySuggestions.length >
                    0 && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98
                      }}
                      transition={{
                        duration: 0.15
                      }}
                      className="
                        absolute
                        left-0
                        right-0
                        top-full
                        mt-2
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        shadow-2xl
                        overflow-hidden
                        z-50
                      "
                    >

                      {/* Suggestion Header */}
                      <div className="
                        px-4
                        py-2
                        bg-gray-50
                        border-b
                        border-gray-100
                      ">
                        <p className="
                          text-xs
                          font-semibold
                          text-muted
                          uppercase
                          tracking-wide
                        ">
                          Suggested cities
                        </p>
                      </div>

                      {/* Suggestions */}
                      {citySuggestions.map(
                        (city, index) => (
                          <motion.button
                            key={`${city}-${index}`}
                            type="button"
                            initial={{
                              opacity: 0,
                              x: -8
                            }}
                            animate={{
                              opacity: 1,
                              x: 0
                            }}
                            transition={{
                              delay:
                                index * 0.03
                            }}
                            onClick={() =>
                              selectCity(
                                city
                              )
                            }
                            className="
                              w-full
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              text-left
                              hover:bg-primary-50
                              transition-all
                              border-b
                              border-gray-100
                              last:border-b-0
                              group
                            "
                          >

                            {/* Icon */}
                            <div className="
                              w-10
                              h-10
                              rounded-xl
                              bg-primary-50
                              group-hover:bg-primary-100
                              flex
                              items-center
                              justify-center
                              shrink-0
                              transition-colors
                            ">

                              <MapPin
                                size={18}
                                className="
                                  text-primary-500
                                "
                              />

                            </div>

                            {/* City Name */}
                            <div className="flex-1">

                              <p className="
                                font-semibold
                                text-dark
                              ">
                                {city}
                              </p>

                              <p className="
                                text-xs
                                text-muted
                              ">
                                Starting city
                              </p>

                            </div>

                            {/* Arrow */}
                            <ArrowRight
                              size={16}
                              className="
                                text-gray-300
                                group-hover:text-primary-500
                                transition-colors
                              "
                            />

                          </motion.button>
                        )
                      )}

                    </motion.div>
                  )}
              </AnimatePresence>

            </div>

            {/* No Results */}
            {formData.startingCity.trim() &&
              citySuggestions.length ===
                0 && (
                <motion.p
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  className="
                    text-sm
                    text-muted
                    mt-3
                  "
                >
                  No suggestion found. You
                  can still enter your city
                  manually.
                </motion.p>
              )}

            {/* Helper */}
            {!formData.startingCity.trim() && (
              <p className="
                text-xs
                text-muted
                mt-3
              ">
                Start typing to see city
                suggestions.
              </p>
            )}

          </div>
        );

      /*
      |--------------------------------------------------------------------------
      | STEP 2 - DESTINATION
      |--------------------------------------------------------------------------
      */

      case 1:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              Where are you going?
            </h3>

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              max-h-96
              overflow-y-auto
              pr-2
            ">

              {destinations.map(
                (dest) => (

                  <button
                    key={dest.id}
                    type="button"
                    onClick={() =>
                      updateField(
                        'destinationId',
                        dest.id
                      )
                    }
                    className={`
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      border-2
                      transition-all
                      ${
                        formData.destinationId ===
                        dest.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }
                    `}
                  >

                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="
                        w-14
                        h-14
                        rounded-lg
                        object-cover
                      "
                    />

                    <div className="text-left">

                      <p className="
                        font-semibold
                        text-dark
                      ">
                        {dest.name}
                      </p>

                      <p className="
                        text-xs
                        text-muted
                      ">
                        {dest.country}
                        {' · '}
                        From{' '}
                        {formatINR(
                          dest.startingBudget
                        )}
                      </p>

                    </div>

                  </button>

                )
              )}

            </div>

          </div>
        );

      /*
      |--------------------------------------------------------------------------
      | STEP 3 - TRAVELERS
      |--------------------------------------------------------------------------
      */

      case 2:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              How many travelers?
            </h3>

            <div className="space-y-6">

              {/* Adults */}
              <div>

                <label className="
                  label-field
                  flex
                  items-center
                  gap-2
                ">

                  <Users
                    size={18}
                    className="text-primary-500"
                  />

                  Adults

                </label>

                <div className="
                  flex
                  items-center
                  gap-4
                ">

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
                    className="
                      w-12
                      h-12
                      rounded-xl
                      border-2
                      border-gray-200
                      text-2xl
                      font-bold
                      hover:border-primary-500
                      transition-colors
                    "
                    aria-label="Decrease adults"
                  >
                    −
                  </button>

                  <span className="
                    text-3xl
                    font-display
                    font-bold
                    text-dark
                    w-12
                    text-center
                  ">
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
                    className="
                      w-12
                      h-12
                      rounded-xl
                      border-2
                      border-gray-200
                      text-2xl
                      font-bold
                      hover:border-primary-500
                      transition-colors
                    "
                    aria-label="Increase adults"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Children */}
              <div>

                <label className="
                  label-field
                  flex
                  items-center
                  gap-2
                ">

                  <Users
                    size={18}
                    className="text-primary-500"
                  />

                  Children

                </label>

                <div className="
                  flex
                  items-center
                  gap-4
                ">

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
                    className="
                      w-12
                      h-12
                      rounded-xl
                      border-2
                      border-gray-200
                      text-2xl
                      font-bold
                      hover:border-primary-500
                      transition-colors
                    "
                    aria-label="Decrease children"
                  >
                    −
                  </button>

                  <span className="
                    text-3xl
                    font-display
                    font-bold
                    text-dark
                    w-12
                    text-center
                  ">
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
                    className="
                      w-12
                      h-12
                      rounded-xl
                      border-2
                      border-gray-200
                      text-2xl
                      font-bold
                      hover:border-primary-500
                      transition-colors
                    "
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
      |--------------------------------------------------------------------------
      | STEP 4 - DURATION
      |--------------------------------------------------------------------------
      */

      case 3:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              How many days?
            </h3>

            <div className="
              flex
              items-center
              gap-6
            ">

              <input
                type="range"
                min="1"
                max="14"
                value={formData.days}
                onChange={(e) =>
                  updateField(
                    'days',
                    Number(e.target.value)
                  )
                }
                className="flex-1"
                style={{
                  '--range-progress': `${
                    ((formData.days - 1) /
                      13) *
                    100
                  }%`
                }}
                aria-label="Trip duration in days"
              />

              <div className="text-center">

                <span className="
                  text-4xl
                  font-display
                  font-bold
                  text-primary-500
                ">
                  {formData.days}
                </span>

                <p className="
                  text-sm
                  text-muted
                ">
                  days
                </p>

              </div>

            </div>

            <p className="
              text-sm
              text-muted
              mt-4
            ">
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
      |--------------------------------------------------------------------------
      | STEP 5 - MONTH
      |--------------------------------------------------------------------------
      */

      case 4:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              When are you traveling?
            </h3>

            <div className="
              grid
              grid-cols-3
              sm:grid-cols-4
              gap-2
            ">

              {months.map(
                (month) => (

                  <button
                    key={month}
                    type="button"
                    onClick={() =>
                      updateField(
                        'travelMonth',
                        month
                      )
                    }
                    className={`
                      p-3
                      rounded-xl
                      border-2
                      text-sm
                      font-medium
                      transition-all
                      ${
                        formData.travelMonth ===
                        month
                          ? 'border-primary-500 bg-primary-50 text-primary-500'
                          : 'border-gray-200 hover:border-primary-200'
                      }
                    `}
                  >
                    {month}
                  </button>

                )
              )}

            </div>

          </div>
        );

      /*
      |--------------------------------------------------------------------------
      | STEP 6 - TRAVEL STYLE
      |--------------------------------------------------------------------------
      */

      case 5:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              Travel style
            </h3>

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
            ">

              {travelStyles.map(
                (style) => (

                  <button
                    key={style.key}
                    type="button"
                    onClick={() =>
                      updateField(
                        'travelStyle',
                        style.key
                      )
                    }
                    className={`
                      p-4
                      rounded-xl
                      border-2
                      text-left
                      transition-all
                      ${
                        formData.travelStyle ===
                        style.key
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }
                    `}
                  >

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-2
                    ">

                      <span className="
                        font-semibold
                        text-dark
                      ">
                        {style.label}
                      </span>

                      <span className="
                        text-primary-500
                        font-bold
                      ">
                        {style.icon}
                      </span>

                    </div>

                    <p className="
                      text-xs
                      text-muted
                    ">
                      {style.desc}
                    </p>

                  </button>

                )
              )}

            </div>

          </div>
        );

      /*
      |--------------------------------------------------------------------------
      | STEP 7 - TRANSPORT
      |--------------------------------------------------------------------------
      */

      case 6:
        return (
          <div>

            <h3 className="
              text-2xl
              font-display
              font-semibold
              text-dark
              mb-6
            ">
              Travel preferences
            </h3>

            <div className="
              grid
              grid-cols-2
              sm:grid-cols-3
              gap-3
            ">

              {transportOptions.map(
                (option) => {

                  const Icon =
                    option.icon;

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
                      className={`
                        p-4
                        rounded-xl
                        border-2
                        flex
                        flex-col
                        items-center
                        gap-2
                        transition-all
                        ${
                          formData.transportPreference ===
                          option.key
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }
                      `}
                    >

                      <Icon
                        size={24}
                        className="
                          text-primary-500
                        "
                      />

                      <span className="
                        font-medium
                        text-dark
                        text-sm
                      ">
                        {option.label}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

          </div>
        );

      default:
        return null;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Main UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="
      min-h-screen
      bg-surface
      py-12
    ">

      <div className="container-tp">

        {/* Header */}
        <div className="
          text-center
          mb-10
        ">

          <h1 className="
            text-4xl
            font-display
            font-bold
            text-dark
            mb-3
          ">
            Plan Your Trip
          </h1>

          <p className="
            text-lg
            text-muted
            max-w-2xl
            mx-auto
          ">
            Answer a few questions and
            we'll calculate your estimated
            trip budget.
          </p>

        </div>

        <div className="
          max-w-3xl
          mx-auto
        ">

          {/* Steps */}
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
          />

          {/* Card */}
          <div className="
            card
            p-6
            lg:p-8
          ">

            {/* Animated Step */}
            <AnimatePresence
              mode="wait"
            >

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

            {/* Buttons */}
            <div className="
              flex
              items-center
              justify-between
              mt-8
              pt-6
              border-t
              border-gray-100
            ">

              {/* Back */}
              <button
                type="button"
                onClick={handleBack}
                disabled={
                  currentStep === 0 ||
                  loading
                }
                className="
                  btn-secondary
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                <ArrowLeft
                  size={18}
                />

                Back

              </button>

              {/* Next */}
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !canProceed() ||
                  loading
                }
                className="
                  btn-primary
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
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
                    <Sparkles
                      size={18}
                    />

                    Calculate My Trip
                  </>
                ) : (
                  <>
                    Next

                    <ArrowRight
                      size={18}
                    />
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