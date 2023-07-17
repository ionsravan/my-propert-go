import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "src/componets/shared/sharedInput";
import { useAppContext } from "src/Context/AppContext";
import { useAxios } from "src/utills/axios";
import Link from "next/link";
import { addProperty } from ".";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  HiCheck,
  HiChevronDown,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BsBuilding, BsFillHouseFill, BsShop } from "react-icons/bs";
import { RiHome4Fill, RiBuilding4Fill } from "react-icons/ri";
import {
  MdApartment,
  MdOutlineVilla,
  MdHome,
  MdWarehouse,
} from "react-icons/md";
// import { HiBuildingStorefront } from "react-icons/hi";
import { GiIsland } from "react-icons/gi";
import {
  AiOutlineClose,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import {
  FaRegAddressBook,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaWarehouse,
} from "react-icons/fa";
import {
  MdOutlineHolidayVillage,
  MdPhotoSizeSelectSmall,
} from "react-icons/md";
import { area, location, response } from "src/@types";
import { useFetch } from "src/lib/hooks/useFetch";
// import "../styles/addProperty.css"
import { cx } from "../utills/all";
import Image from "next/image";
import { useCookies } from "react-cookie";

const AddProperty = () => {
  const [cookies] = useCookies(["jwtToken"]);

  const [saleActive, setSaleActive] = useState(true);
  const [rentActive, setRentActive] = useState(false);
  const [propertyProjectActive, setPropertyProjectActive] = useState(false);
  const [residentialActive, setResidentialActive] = useState(true);
  const [commercialActive, setCommercialActive] = useState(false);
  const [buildingType, setBuildingType] = useState("");
  const [buildingTypeError, setBuildingTypeError] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyTypeError, setPropertyTypeError] = useState("");
  const [availabeFor, setAvailableFor] = useState("sale");
  const [availabeForError, setAvailableForError] = useState("");
  const [toggle, setToggle] = useState("Property");
  const [toggleError, setToggleError] = useState("");
  const [isPropertyActive, setPropertyActive] = useState(true);
  const [isProjectActive, setProjectActive] = useState(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [locality, setLocality] = useState("");
  const [localityError, setLocalityError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [bhkConfig, setBhkConfig] = useState("");
  const [bhkConfigError, setBhkConfigError] = useState("");

  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");

  const [areaValue, setAreaValue] = useState("");
  const [areaValueError, setAreaValueError] = useState("");

  const [areaType, setAreaType] = useState("");
  const [areaTypeError, setAreaTypeError] = useState("");

  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  const [floorNumber, setFloorNumber] = useState("");
  const [floorNumberError, setFloorNumberError] = useState("");

  const [tower, setTower] = useState("");
  const [towerError, setTowerError] = useState("");

  const [floorCount, setFloorCount] = useState("");
  const [floorCountError, setFloorCountError] = useState("");

  const [unitNumber, setUnitNumber] = useState("");
  const [unitNumberError, setUnitNumberError] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [amenitiesError, setAmenitiesError] = useState("");

  const [activeButton, setActiveButton] = useState("");
  const [securityActiveButton, setSecurityActiveButton] = useState("");

  const [addtionalRoomButton, setAddtionalRoomButton] = useState("");
  const [addtionalRoomButtonError, setAddtionalRoomButtonError] = useState("");

  const [furnished, setFurnished] = useState("");
  const [furnishedError, setFurnishedError] = useState("");

  const [possession, setPossession] = useState("");
  const [possessionError, setPossessionError] = useState("");

  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");

  const [bathroom, setBathroom] = useState("");
  const [bathroomError, setBathroomError] = useState("");

  const [parking, setParking] = useState("");
  const [parkingError, setParkingError] = useState("");

  const [selectedViewFacing, setSelectedViewFacing] = useState("");
  const [selectedViewFacingError, setSelectedViewFacingError] = useState("");

  const handleSaleClick = () => {
    setSaleActive(true);
    setRentActive(false);
    setPropertyProjectActive(false);
    setAvailableFor("sale");
  };

  const handleRentClick = () => {
    setRentActive(true);
    setSaleActive(false);
    setPropertyProjectActive(false);
    setAvailableFor("rent");
  };

  const handlePropertyProject = () => {
    setSaleActive(false);
    setRentActive(false);
    setPropertyProjectActive(true);
  };

  const handleResidentialClick = () => {
    setResidentialActive(true);
    setCommercialActive(false);
  };

  const handleCommercialClick = () => {
    setCommercialActive(true);
    setResidentialActive(false);
  };

  useEffect(() => {
    if (residentialActive) {
      setBuildingType("residential");
    } else {
      setBuildingType("commercial");
    }
  }, [commercialActive, residentialActive]);

  // Image Upload FUnction

  const [filesToupload, setFilesToUpload] = useState([]);


  const handleImageChange = (e) => {
    if (e.target.files) {
      setFilesToUpload((prev) => {
        let prevs = [...prev];
        console.log(e.target.files);
        prevs.push(e.target.files[0]);
        console.log(prevs);
        return prevs;
      });
    }
    e.target.files = null;
  };

  const deleteImage = (file) => {
    setFilesToUpload((prev) => {
      let imgs = [...prev];
      const index = imgs.indexOf(file);
      if (index > -1) {
        imgs.splice(index, 1);
      }
      return imgs;
    });
  };

  const renderPhotos = (source) => {
    console.log(source,"source")
    if(source.length === 0) return
    
    return source.map((photo, index) => {
      console.log(photo,"photo")
      // let image = URL.createObjectURL(photo)
      const previewFile = file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let fileView = reader.result
          return fileView
        }
      }
      return (
        <div
          className="w-max h-40 flex justify-center items-center relative max-w-[200px]"
          key={index}
        >
          <button
            onClick={() => {
              deleteImage(photo);
            }}
            className="text-white bg-red-500 h-6 w-6 flex rounded-full items-center justify-center absolute top-1 right-0"
          >
            <AiOutlineClose />
          </button>
          <img
            className="h-full object-cover"
            src={previewFile(photo)}
            // src={URL.createObjectURL(photo)}
            alt=""
            // key={photo}
          />
        </div>
      );
    });
  };

  const residentialNames = [
    "Apartment",
    "Villa",
    "Plot",
    "Builder Floor",
    "Penthouse",
    "PG",
    "Independent House",
  ];


  const residentialIcons = [
    MdApartment,
    MdOutlineVilla,
    FaLandmark,
    BsBuilding,
    MdHome,
    AiOutlineHome,
    RiHome4Fill,
  ];
  const commercialNames = [
    "Office Space",
    "Shop",
    "Land",
    "Showroom",
    "Warehouse",
    "Industrial Plot",
    "Office place in IT/SEZ",
  ];

  const commercialIcons = [
    FaBuilding,
    BsShop,
    GiIsland,
    AiOutlineHome,
    FaWarehouse,
    BsBuilding,
    FaBuilding,
  ];

  const securityNames = ["Zero Deposit", "One Month", "Two Month"];
  const additionalRoomNames = [
    "Pooja Room",
    "Study Room",
    "Servent Room",
    "Extra Room",
  ];
  const furnishingNames = ["Furnished", "Semi Furnished", "Unfurnished"];
  const possessionNames = ["Ready To Move", "Under Construction"];
  const ageNames = ["0-1", "2-4", "5-7", "8-10", "10+"];
  const bathroomNames = ["1", "2", "3", "4", "5", "6", "6+"];
  const parkingNames = ["1", "2", "3", "4", "5", "6", "6+"];
  const viewFacingOptions = [
    "Select View/Facing",
    "Main Road",
    "Garden/Park",
    "Pool",
    "Beach View",
    "North",
    "North West",
    "North East",
    "Others",
  ];

  const handleButtonClick = (name) => {
    setActiveButton(name);
    setPropertyType(name);
    // Handle the click event for the specific button
  };
  const handleSecurityButtonClick = (name) => {
    setSecurityActiveButton(name);
  };
  const handleAdditionalRoomClick = (name) => {
    setAddtionalRoomButton(name);
  };
  const handleFurnishedClick = (name) => {
    setFurnished(name);
  };
  const handlePossessionClick = (name) => {
    setPossession(name);
  };
  const handleAgeClick = (name) => {
    setAge(name);
  };
  const handleBathroomClick = (name) => {
    setBathroom(name);
  };
  const handleParkingClick = (name) => {
    setParking(name);
  };

  const handleViewFacingChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedViewFacing(selectedOption);
  };

  // Amenities

  const handleAmenityToggle = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleToggle = (type) => {
    if (type === "property") {
      setPropertyActive(true);
      setProjectActive(false);
      setToggle("Property");
    } else if (type === "project") {
      setPropertyActive(false);
      setProjectActive(true);
      setToggle("Project");
    }
  };

  const availableAmenities = [
    "Swimming Pool",
    "Gymnasium",
    "Clubhouse",
    "Children Play Area",
    "Power Backup",
    "Security",
    "Parking",
    "Lift",
    "Rainwater Harvesting",
    "Intercom",
    "Fire Safety",
    "Maintenance Staff",
    "24x7 Water Supply",
    "CCTV Surveillance",
    "Landscaped Gardens",
    "Multipurpose Court",
    "Jogging Track",
    "Indoor Games",
    "Community Hall",
    "Gated Community",
    "Wi-Fi Connectivity",
    "Car Parking",
    "Vastu Compliant",
    "Senior Citizen Area",
    "Shopping Center",
    "Yoga/Meditation Area",
    "Badminton Court",
    "Basketball Court",
    "Squash Court",
    "Tennis Court",
    "Cricket Pitch",
    "Skating Rink",
    "Cafeteria",
    "Library",
    "Theatre",
    "Banquet Hall",
    "Guest Accommodation",
    "ATM",
    "Laundry Service",
    "Barbecue Area",
    "Cycling & Jogging Track",
    "Pet Area",
    "Water Softener Plant",
    "Piped Gas",
    "Waste Disposal",
    "Central AC",
    "Central Heating",
    "Pre-school/Daycare",
    "Medical Facilities",
    "Pet Friendly",
    "Vaastu Compliant",
    "RO Water System",
    "DTH Television Facility",
    "Conference Room",
    "Workspaces",
    "Waiting Lounge",
    "Shopping Mall",
    "Food Court",
    "Multiplex",
    "Terrace Garden",
    "Sewage Treatment Plant",
    "Bar/Lounge",
    "Mini Theatre",
    "Party Lawn",
    "Amphitheatre",
    "Jacuzzi",
    "Salon",
    "Sauna",
    "Spa",
    "Indoor Jacuzzi",
    "Outdoor Jacuzzi",
    "Private Pool",
    "Golf Course",
    "Horse Riding Arena",
    "Helipad",
    "Meditation/Yoga Center",
    "Golf View",
    "Open Space",
    "Aerobics Room",
    "Garden",
    "ATM/Cafeteria",
    "Basketball",
    "Football",
    "Volleyball",
    "Conference Room",
    "School",
    "Hospital",
    "Temple",
    "Pantry",
    "ATM/Bank",
    "Lobby Area",
    "Business Center",
    "Pre-School",
    "Restaurant",
    "Staff Quarter",
    "Billiards Room",
    "Kids Pool",
    "Banquet",
    "Library",
    "Meditation Center",
    "Valet Parking",
    "Golf Simulator",
    "Kids Area",
    "Carrom Board",
    "Multipurpose Lawn",
    "Dance Studio",
    "Reading Lounge",
    "Terrace",
    "Skating Rink",
    "Sculpture Garden",
    "Rock Climbing",
    "Karaoke",
    "Bar",
    "Toddler Pool",
    "Rainwater Harvesting",
    "Conference Hall",
    "Waiting Lounge",
    "Cricket Practice Pitch",
    "Squash",
    "Jogging",
    "Cycling",
    "Power Backup",
    "Health Facilities",
    "24 Hour Water Supply",
    "Childrens Play Area",
    "Car Parking",
  ];

  const handlePostProperty = async () => {

    if (amenities.length === 0) {
      setAmenitiesError('Please select at least one amenity');

      setTimeout(() => {
        setAmenitiesError('');
      }, 2000);

      return;
    }

    if (description.trim() === '') {
      setDescriptionError('Please fill the description');

      setTimeout(() => {
        setDescriptionError('');
      }, 2000);

      return;
    }
    const data = {
      name: projectName,
      buildingType: buildingType,
      cost: price,
      description: description,
      size: size,
      availableFor: availabeFor,
      toggle: toggle,
      BHKconfig: bhkConfig,
      area: area,
      areaValue: areaValue,
      areaType: areaType,
      floorNo: floorNumber,
      towerBlock: tower,
      floorCount: floorCount,
      unitNo: unitNumber,
      additionalRooms: addtionalRoomButton,
      city,
      address: address,
      location: locality,
      amenities: amenities,
      securityActiveButton,
      furnishingStatus: furnished,
      possessionStatus: possession,
      ageOfProperty: age,
      numOfBathroom: bathroom,
      numOfParking: parking,
      propertyType,
      view: selectedViewFacing,
      propertyType: propertyType,
    };

    try {
      const response = await fetch(
        "https://my-property-go-backend.onrender.com/api/agent/property/addProperty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookies.jwtToken}`,
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error("Error while adding property:", error);
    }
  };

  // Pagination function
  const [activeStep, setActiveStep] = useState(1);
  // const [propertyDetails, setPropertyDetails] = useState({});
  // const [additionalDetails, setAdditionalDetails] = useState({});
  // const [amenitiesForPage, setAmenitiesForPage] = useState({});

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handlePropertiesDetails = () => {
    if (toggle.trim() === '') {
      setToggleError('Please select either Property or Project');

      setTimeout(() => {
        setToggleError('');
      }, 2000);

      return;
    }
    if (availabeFor.trim() === '') {
      setAvailableForError('Please Fill the Property Listing Form');

      setTimeout(() => {
        setAvailableForError('');
      }, 2000);

      return;
    }
    if (buildingType.trim() === '') {
      setBuildingTypeError('Please Fill the Building type');

      setTimeout(() => {
        setBuildingTypeError('');
      }, 2000);

      return;
    }
    if (propertyType.trim() === '') {
      setPropertyTypeError('Please Fill the Property type');

      setTimeout(() => {
        setPropertyTypeError('');
      }, 2000);

      return;
    }
    if (city.trim() === '') {
      setCityError('Please fill the city');

      setTimeout(() => {
        setCityError('');
      }, 2000);

      return;
    }

    if (projectName.trim() === '') {
      setProjectNameError('Please fill the project name');

      setTimeout(() => {
        setProjectNameError('');
      }, 2000);

      return;
    }


    if (locality.trim() === '') {
      setLocalityError('Please fill the locality');

      setTimeout(() => {
        setLocalityError('');
      }, 2000);

      return;
    }

    if (price.trim() === '') {
      setPriceError('Please fill the price');

      setTimeout(() => {
        setPriceError('');
      }, 2000);

      return;
    }


    if (bhkConfig.trim() === '') {
      setBhkConfigError('Please fill the BHK configuration');

      setTimeout(() => {
        setBhkConfigError('');
      }, 2000);

      return;
    }

    if (area.trim() === '') {
      setAreaError('Please fill the area');

      setTimeout(() => {
        setAreaError('');
      }, 2000);

      return;
    }

    if (areaValue.trim() === '') {
      setAreaValueError('Please fill the area value');

      setTimeout(() => {
        setAreaValueError('');
      }, 2000);

      return;
    }

    if (areaType.trim() === '') {
      setAreaTypeError('Please fill the area type');

      setTimeout(() => {
        setAreaTypeError('');
      }, 2000);

      return;
    }

    if (size.trim() === '') {
      setSizeError('Please fill the size');

      setTimeout(() => {
        setSizeError('');
      }, 2000);

      return;
    }
    if (address.trim() === '') {
      setAddressError('Please fill the address');

      setTimeout(() => {
        setAddressError('');
      }, 2000);

      return;
    }

    handleNext();
  };



  const handleAdditionalDetails = () => {
    console.log("clicked")
    if (floorNumber.trim() === '') {
      setFloorNumberError('Please fill the floor number');

      setTimeout(() => {
        setFloorNumberError('');
      }, 2000);

      return;
    }

    if (tower.trim() === '') {
      setTowerError('Please fill the tower');

      setTimeout(() => {
        setTowerError('');
      }, 2000);

      return;
    }

    if (floorCount.trim() === '') {
      setFloorCountError('Please fill the floor count');

      setTimeout(() => {
        setFloorCountError('');
      }, 2000);

      return;
    }

    if (unitNumber.trim() === '') {
      setUnitNumberError('Please fill the unit number');

      setTimeout(() => {
        setUnitNumberError('');
      }, 2000);

      return;
    }

    if (addtionalRoomButton.trim() === '') {
      setAddtionalRoomButtonError('Please fill the additional room button');

      setTimeout(() => {
        setAddtionalRoomButtonError('');
      }, 2000);

      return;
    }

    if (furnished.trim() === '') {
      setFurnishedError('Please fill the furnished field');

      setTimeout(() => {
        setFurnishedError('');
      }, 2000);

      return;
    }

    if (possession.trim() === '') {
      setPossessionError('Please fill the possession');

      setTimeout(() => {
        setPossessionError('');
      }, 2000);

      return;
    }

    if (age.trim() === '') {
      setAgeError('Please fill the age');

      setTimeout(() => {
        setAgeError('');
      }, 2000);

      return;
    }

    if (bathroom.trim() === '') {
      setBathroomError('Please fill the bathroom');

      setTimeout(() => {
        setBathroomError('');
      }, 2000);

      return;
    }

    if (parking.trim() === '') {
      setParkingError('Please fill the parking');

      setTimeout(() => {
        setParkingError('');
      }, 2000);

      return;
    }

    if (selectedViewFacing.trim() === '') {
      setSelectedViewFacingError('Please fill the selected view facing');

      setTimeout(() => {
        setSelectedViewFacingError('');
      }, 2000);

      return;
    }

    handleNext();

  }



  // const handleAdditionalDetailsSubmit = () => {

  //   const additionalDetailsData = {};
  //   setAdditionalDetails(additionalDetailsData);
  //   handleNext();
  // };

  // const handleAmenitiesSubmit = () => {

  //   const amenitiesData = {};
  //   setAmenitiesForPage(amenitiesData);
  //   handleNext();
  // };


  // 2C5FC3
  // 2C5FC3
  return (
    <>
      <div style={{ backgroundColor: "white" }} className=" mx-auto w-full lg:w-[900px] max-w-3xl  ">
        {/* <p>Property Listing for</p> */}
        <div style={{ margin: "20px 0" }} className="property-listing-form">
          <div style={{ marginBottom: "20px", padding: "20px 0" }}>
            <div className="paginationContainer">
              <button
                className={`paginationButton ${activeStep === 1 ? "active" : ""
                  }`}
                onClick={() => handleStepClick(1)}
              >
                <MdApartment style={{ fontSize: "25px" }} />  Property Details
              </button>
              <button
                className={`paginationButton ${activeStep === 2 ? "active" : ""
                  }`}
                onClick={() => handleStepClick(2)}
              >
                <MdApartment style={{ fontSize: "25px" }} />   Additional Details
              </button>
              <button
                className={`paginationButton ${activeStep === 3 ? "active" : ""
                  }`}
                onClick={() => handleStepClick(3)}
              >
                <MdApartment style={{ fontSize: "25px" }} />   Amenities
              </button>
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="progressBarContainer">
                <div
                  className="progressBar"
                  style={{ "--activeStep": activeStep }}
                ></div>
              </div>

              <div className="circleContainer">
                <p style={{ margin: "0" }} className={`circle ${activeStep >= 2 ? "active" : ""}`}>1</p>

                <p style={{ margin: "0" }} className={`circle ${activeStep === 3 ? "active" : ""}`}>2</p>

                <p style={{ margin: "0" }} className={`circle`}>3</p>
              </div>

            </div>

          </div>

          {activeStep === 1 && (
            <>
              <div>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    borderBottom: "1px solid grey",
                    paddingBottom: "10px",
                  }}
                >
                  {" "}
                  Provide details about your Property
                </p>

                <button
                  style={{}}
                  onClick={() => handleToggle("property")}
                  className={`button ${isPropertyActive ? "active" : ""}`}
                >
                  <MdApartment style={{ marginRight: "5px", display: "inline-block", marginBottom: "5px" }} /> Property
                </button>

                <button
                  style={{ marginLeft: "20px" }}
                  onClick={() => handleToggle("project")}
                  className={`button ${isProjectActive ? "active" : ""}`}
                >
                  <BsBuilding style={{ marginRight: "5px", display: "inline-block", marginBottom: "5px" }} /> Project
                </button>
                {toggleError && <p className="error">{toggleError}</p>}

                <p style={{ marginBottom: "15px", marginTop: "15px" }}>
                  Property Listing Form:
                </p>

                <div style={{ display: "flex" }} className="propertyListingDiv">
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleSaleClick}
                    className={`button ${saleActive ? "active" : ""}`}
                  >
                    <BsFillHouseFill style={{ marginRight: "5px" }} /> Sale
                  </button>
                  <button
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleRentClick}
                    className={`button ${rentActive ? "active" : ""}`}
                  >
                    <RiHome4Fill style={{ marginRight: "5px" }} />
                    Rent
                  </button>
                </div>

                {availabeForError && <p className="error">{availabeForError}</p>}

                <p style={{ marginBottom: "15px", marginTop: "15px" }}>
                  Building Type
                </p>

                <div style={{ display: "flex" }} className="buildingType">
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleResidentialClick}
                    className={`button ${residentialActive ? "active" : ""}`}
                  >
                    <FaHome style={{ marginRight: "5px" }} /> Residential
                  </button>
                  <button
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleCommercialClick}
                    className={`button ${commercialActive ? "active" : ""}`}
                  >
                    <RiBuilding4Fill style={{ marginRight: "5px" }} />{" "}
                    Commercial
                  </button>
                </div>
                {buildingTypeError && <p className="error">{buildingTypeError}</p>}
              </div>

              <p style={{ marginBottom: "15px", marginTop: "15px" }}>
                Property Type
              </p>

              {residentialActive ? (
                <div className="propertyTypeContainer">
                  {residentialNames.map((name, index) => {
                    const Icon = residentialIcons[index];
                    return (
                      <button
                        key={index}
                        style={{ margin: "10px" }}
                        onClick={() => handleButtonClick(name)}
                        className={`button ${activeButton === name ? "active" : ""
                          }`}
                      >
                        {Icon && (
                          <Icon
                            style={{
                              display: "inline-block",
                              marginBottom: "5px",
                              marginRight: "5px",
                            }}
                            className="icon"
                          />
                        )}{" "}
                        {name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="propertyTypeContainer">
                  {commercialNames.map((name, index) => {
                    const Icon = commercialIcons[index];
                    return (
                      <button
                        key={index}
                        style={{ margin: "10px" }}
                        onClick={() => handleButtonClick(name)}
                        className={`button ${activeButton === name ? "active" : ""
                          }`}
                      >
                        {Icon && (
                          <Icon
                            style={{
                              display: "inline-block",
                              marginBottom: "5px",
                              marginRight: "5px",
                            }}
                            className="icon"
                          />
                        )}{" "}
                        {name}
                      </button>
                    );
                  })}
                </div>
              )}
              {propertyTypeError && <p className="error">{propertyTypeError}</p>}


              <div style={{ margin: "20px 0" }}
                className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
              >
                {/* <label style={{marginTop:"5px"}} htmlFor="city">City:</label> */}
                <input
                  placeholder="Enter City"
                  required
                  className="inputField"
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />


              </div>
              {cityError && <p className="error">{cityError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label style={{marginTop:"5px"}}  htmlFor="price">Project Name</label> */}
                <input
                  placeholder="Enter Project/Building Name"
                  required
                  className="inputField"
                  type="text"
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />

              </div>
              {projectNameError && <p className="error">{projectNameError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label style={{marginTop:"5px"}}  htmlFor="price">Location</label> */}
                <input
                  placeholder="Enter Location"
                  required
                  className="inputField"
                  type="text"
                  id="location"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                />

              </div>
              {localityError && <p className="error">{localityError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label style={{ marginTop: "5px" }} htmlFor="price">Locality Price</label> */}
                <input
                  placeholder="Enter Locality Price"
                  required
                  className="inputField"
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {priceError && <p className="error">{priceError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label style={{ marginTop: "5px" }} htmlFor="price">BHK Configs</label> */}
                <input
                  placeholder="BHK Configs"
                  required
                  className="inputField"
                  type="text"
                  id="price"
                  value={bhkConfig}
                  onChange={(e) => setBhkConfig(e.target.value)}
                />
              </div>
              {bhkConfigError && <p className="error">{bhkConfigError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>

                {/* <label style={{ marginTop: "5px" }} htmlFor="area">Area</label> */}
                <input
                  placeholder="Enter Area"
                  required
                  className="inputField"
                  type="text"
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              {areaError && <p className="error">{areaError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label style={{ marginTop: "5px" }} htmlFor="area">Area Value</label> */}
                <input
                  placeholder="Enter Area Value"
                  required
                  className="inputField"
                  type="text"
                  id="area"
                  value={areaValue}
                  onChange={(e) => setAreaValue(e.target.value)}
                />
              </div>
              {areaValueError && <p className="error">{areaValueError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>

                {/* <label style={{ marginTop: "5px" }} htmlFor="area">Area Type</label> */}
                <input
                  placeholder="Enter Area Type"
                  required
                  className="inputField"
                  type="text"
                  id="area"
                  value={areaType}
                  onChange={(e) => setAreaType(e.target.value)}
                />
              </div>
              {areaTypeError && <p className="error">{areaTypeError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>


                {/* <label style={{ marginTop: "5px" }} htmlFor="size">Size</label> */}
                <input
                  placeholder="Enter Size"
                  required
                  className="inputField"
                  type="text"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              {sizeError && <p className="error">{sizeError}</p>}

              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label style={{ marginTop: "5px" }} htmlFor="address">Address</label> */}
                <input
                  placeholder="Enter Address"
                  required
                  className="inputField"
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

              </div>
              {addressError && <p className="error">{addressError}</p>}

              <button
                className="next-button"
                onClick={handlePropertiesDetails}
              >
                Save and Continue
              </button>
            </>
          )}

          {activeStep === 2 && (
            <div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderBottom: "1px solid grey",
                  paddingBottom: "10px",
                }}
              >
                {" "}
                Additional Details
              </p>
              <div className="m-4">
                <label className="inline-block mb-2 text-gray-500">
                  Upload Property Image (jpg,png,svg,jpeg)
                </label>
                <div className="flex items-center  w-full">
                  <div className="w-full flex max-w-md overflow-x-scroll">
                    {renderPhotos([filesToupload])}
                  </div>
                  <label className=" max-w-[150px] flex flex-col w-full h-40 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Select a photo
                      </p>
                    </div>
                    <input
                        onChange={handleImageChange}
                      type="file"
                      className="opacity-0"
                    />
                  </label>
                </div>
              </div>

              <label htmlFor="price">Additional Rooms</label>
              <div className="securityDepositDiv">
                {additionalRoomNames.map((name, index) => (
                  <button
                    key={index}
                    style={{ margin: "10px" }}
                    onClick={() => handleAdditionalRoomClick(name)}
                    className={`button ${addtionalRoomButton === name ? "active" : ""
                      }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {addtionalRoomButtonError && <p className="error">{addtionalRoomButtonError}</p>}

              <label htmlFor="price">Possession Status</label>
              <div className="securityDepositDiv">
                {possessionNames.map((name, index) => (
                  <button
                    key={index}
                    style={{ margin: "10px" }}
                    onClick={() => handlePossessionClick(name)}
                    className={`button ${possession === name ? "active" : ""}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {possessionError && <p className="error">{possessionError}</p>}

              <label htmlFor="price">Furnishing Status</label>
              <div className="securityDepositDiv">
                {furnishingNames.map((name, index) => (
                  <button
                    key={index}
                    style={{ margin: "10px" }}
                    onClick={() => handleFurnishedClick(name)}
                    className={`button ${furnished === name ? "active" : ""}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {furnishedError && <p className="error">{furnishedError}</p>}

              <label htmlFor="price">Age of Property (Years)</label>
              <div className="securityDepositDiv">
                {ageNames.map((name, index) => (
                  <button
                    key={index}
                    style={{ margin: "10px" }}
                    onClick={() => handleAgeClick(name)}
                    className={`button ${age === name ? "active" : ""}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {ageError && <p className="error">{ageError}</p>}

              <label htmlFor="price">Number of Bathroom</label>
              <div className="securityDepositDiv">
                {bathroomNames.map((name, index) => (
                  <button
                    key={index}
                    style={{ margin: "10px" }}
                    onClick={() => handleBathroomClick(name)}
                    className={`button ${bathroom === name ? "active" : ""}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {bathroomError && <p className="error">{bathroomError}</p>}

              <label htmlFor="price">Number of Parking</label>
              <div className="securityDepositDiv">
                {parkingNames.map((name, index) => (
                  <button
                    key={index}
                    style={{ margin: "10px" }}
                    onClick={() => handleParkingClick(name)}
                    className={`button ${parking === name ? "active" : ""}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {parkingError && <p className="error">{parkingError}</p>}

              <label htmlFor="price">View/Facing</label>

              <select
                style={{ width: "50%", margin: "10px 0", height: "45px", paddingLeft: "10px", borderRadius: "7px" }}
                value={selectedViewFacing}
                onChange={handleViewFacingChange}
              >
                {viewFacingOptions.map((option) => (
                  <option style={{}} key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {selectedViewFacingError && <p className="error">{selectedViewFacingError}</p>}


              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>

                {/* <label htmlFor="floor">Floor No.</label> */}
                <input
                  required
                  className="inputField"
                  type="text"
                  id="floor"
                  placeholder="Floor No."
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                />
              </div>
              {floorNumberError && <p className="error">{floorNumberError}</p>}
              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>

                {/* <label htmlFor="tower">Tower/Block</label> */}
                <input
                  required
                  className="inputField"
                  type="text"
                  id="tower"
                  placeholder="Tower/Block"
                  value={tower}
                  onChange={(e) => setTower(e.target.value)}
                />
              </div>
              {towerError && <p className="error">{towerError}</p>}
              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label htmlFor="floorCount">Total Floor Count</label> */}
                <input
                  required
                  className="inputField"
                  type="text"
                  id="floorCount"
                  placeholder="Total Floor Count"
                  value={floorCount}
                  onChange={(e) => setFloorCount(e.target.value)}
                />
              </div>
              {floorCountError && <p className="error">{floorCountError}</p>}
              <div style={{ margin: "20px 0" }} className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}>
                {/* <label htmlFor="UnitNumber">Unit NO</label> */}
                <input
                  required
                  className="inputField"
                  type="text"
                  id="unitNumber"
                  placeholder="Unit No"
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                />
              </div>
              {unitNumberError && <p className="error">{unitNumberError}</p>}

              <button
                className="next-button"
                onClick={handleAdditionalDetails}
              >
                Save and Continue
              </button>
              <button className="previous-button" onClick={handlePrevious}>
                Previous
              </button>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderBottom: "1px solid grey",
                  paddingBottom: "10px",
                }}
              >
                {" "}
                Amenities
              </p>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {availableAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "5px",
                      display: "flex",
                      padding: "5px",
                      alignItems: "center",
                    }}
                    className="amenitiesDiv"
                  >
                    <input
                      // key={index}
                      required
                      style={{
                        marginRight: "5px",
                        width: "17px",
                        height: "17px",
                      }}
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                    />
                    <label
                      style={{ margin: "0" }}
                      // key={index}
                      className="amenity-checkbox"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
              {amenitiesError && <p className="error">{amenitiesError}</p>}

              <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                Property Description
              </h2>
              <span>
                Please write a detailed description about property so clients
                can understand property better{" "}
              </span>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A detailed description means  70% higher chance of Leads"
                style={{ width: "100%", padding: "7px", marginTop: "10px" }}
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              {descriptionError && <p className="error">{descriptionError}</p>}

              <button
                onClick={handlePostProperty}
                style={{
                  margin: "20px",
                  backgroundColor: "rgb(88,191,147)",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                Submit
              </button>

              {/* <button className="next-button" onClick={handleAmenitiesSubmit}>
                Submit
              </button> */}
              <button className="previous-button" onClick={handlePrevious}>
                Previous
              </button>
            </div>
          )}

          <div>
            {/* <label htmlFor="price">Security Deposit</label>
            <div className="securityDepositDiv">
              {securityNames.map((name, index) => (
                <button
                  key={index}
                  style={{ margin: "10px" }}
                  onClick={() => handleSecurityButtonClick(name)}
                  className={`button ${
                    securityActiveButton === name ? "active" : ""
                  }`}
                >
                  {name}
                </button>
              ))}
            </div> */}

            {/* Image Upload Function */}
          </div>
          {/* )} */}
          {/* {rentActive && (
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            required
                            className="inputField"
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <label htmlFor="rentAmount">Rent Amount:</label>
                        <input
                            required
                            className="inputField"
                            type="text"
                            id="rentAmount"
                            value={rentAmount}
                            onChange={(e) => setRentAmount(e.target.value)}
                        />
                    </div>
                )} */}
        </div>
        <div
          style={{ marginTop: "700px", display: "none" }}
          className="border-0 rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          {/*header*/}
          <div className="flex items-start justify-between p-5  rounded-t bg-white"></div>
          {/*body*/}
          <form className=" w-[90%] mx-auto space-y-6' ">
            <div className="space-y-10">
              <Input
                Icon={AiOutlineUser}
                placeholder="name"
              //   value={name}
              //   setValue={setName}
              />
              <Input
                Icon={AiOutlineDollar}
                placeholder="price"
              //   value={cost}
              //   setValue={setCost}
              />
              <Input
                Icon={AiOutlineHome}
                placeholder="BHK Config ie. 4"
              //   value={BHKconfig}
              //   setValue={setBHKConfig}
              />
              <div className="flex items-center px-5  relative z-50 w-full border bd rounded-lg">
                <MdOutlineHolidayVillage className="text-lg text-[#2C5FC3] " />
                {/* <Select
                    options={[
                      { name: "villa" },
                      { name: "pg" },
                      { name: "appartment" },
                    ]}
                    value={propertyType}
                    setState={setPropertyType}
                  /> */}
              </div>
              <div className="flex items-center px-5  relative z-40 w-full border bd rounded-lg">
                <AiOutlineSetting className="text-lg text-[#2C5FC3] " />
                {/* <Select
                    options={[{ name: "Rent" }, { name: "Sell" }]}
                    value={availableFor}
                    setState={setAvailableFor}
                  /> */}
              </div>
              {/* {loc?.result && (
                  <div className="flex items-center px-5  relative z-30 w-full border bd rounded-lg">
                    <HiOutlineLocationMarker className="text-lg text-[#2C5FC3] " />
                    <Select
                      options={loc?.result}
                      value={location}
                      setState={setLocation}
                    />
                  </div>
                )} */}

              {/* {data?.result && (
                  <div className="flex items-center px-5  relative z-20 w-full border bd rounded-lg">
                    <BsBuilding className="text-lg text-[#2C5FC3] " />
                    <Select
                      options={data?.result}
                      value={area}
                      setState={setArea}
                    />
                  </div>
                )} */}
              <Input
                Icon={FaRegAddressBook}
                placeholder="address"
              //   value={adress}
              //   setValue={setAdress}
              />
              <Input
                Icon={MdPhotoSizeSelectSmall}
                placeholder="size in Sqft"
              //   value={size}
              //   setValue={setSize}
              />
            </div>
            <textarea
              id="description"
              name="desccription"
              // value={desccription}
              // onChange={(e) => setDescription(e.target.value)}
              required={true}
              placeholder="Add  description"
              className="focus:outline-none  w-full h-52 px-3 mt-5 py-2 border  my-4"
            />

            <div className="m-4">
              <label className="inline-block mb-2 text-gray-500">
                upload Property Image (jpg,png,svg,jpeg)
              </label>
              <div className="flex items-center  w-full">
                <div className="w-full flex max-w-md overflow-x-scroll">
                  {/* {renderPhotos(filesToupload)} */}
                </div>
                <label className=" max-w-[150px] flex flex-col w-full h-40 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                  <input
                    //   onChange={handleImageChange}
                    type="file"
                    className="opacity-0"
                  />
                </label>
              </div>
            </div>
          </form>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-primaryBlue text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={async () => {
                const id = await (
                  await addProperty(
                    instance,
                    name,
                    cost,
                    desccription,
                    size,
                    availableFor,
                    BHKconfig,
                    ["LFT"],
                    location,
                    area,
                    adress,
                    propertyType,
                    filesToupload,
                    setLoading
                  )
                )?.data.result._id;
                if (id) {
                  toast("Property Added SUccesfully", {
                    type: "success",
                    position: "bottom-center",
                  });
                  setShowModal(false);
                }
              }}
            >
              {/* {loading ? "Adding Property.." : "submit"} */}
            </button>
          </div>
        </div>
      </div>
      {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="blogContainer">
            <div className="container">
                <h1 style={{ border: "2px solid red" }}>Blog</h1>

                <div style={{ border: "2px solid green", width: "100%",display:"flex",justifyContent:"space-between" }} className="mainCardContainer">
                    <div style={{ width: "48%",padding:"10px 0" }} className="mainCard">
                        <div style={{borderRadius:"10px"}} className="imageContainer">
                            <img style={{ width: "100%", objectFit: "cover",borderRadius:"10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                        </div>
                        <p style={{margin:"15px 0",color:"blue"}}>TECHNOLOGY</p>
                        <p style={{margin:"15px 0"}}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                        <div style={{ display: "flex", border: "2px solid black",alignItems:"center" }} className="autohorContainer">
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                <img style={{ width: "100%",height:"100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                            </div>
                            <span>Mario Sanchez</span>
                            <span>October 21, 2022</span>
                        </div>
                    </div>
                    <div style={{ width: "48%",padding:"10px 0" }} className="mainCard">
                        <div style={{borderRadius:"10px"}} className="imageContainer">
                            <img style={{ width: "100%", objectFit: "cover",borderRadius:"10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                        </div>
                        <p style={{margin:"15px 0",color:"blue"}}>TECHNOLOGY</p>
                        <p style={{margin:"15px 0"}}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                        <div style={{ display: "flex", border: "2px solid black",alignItems:"center" }} className="autohorContainer">
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                <img style={{ width: "100%",height:"100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                            </div>
                            <span>Mario Sanchez</span>
                            <span>October 21, 2022</span>
                        </div>
                    </div>
         
                </div>




                <div style={{ border: "2px solid red", width: "100%",display:"flex",justifyContent:"space-between" }} className="smallCardContainer">
                    <div style={{ width: "28%",padding:"10px 0",border:"2px solid yellow" }} className="smallCard">
                        <div style={{borderRadius:"10px",height:"350px",border:"2px solid blue"}} className="imageContainer">
                            <img style={{ width: "100%",height:"100%", objectFit: "cover",borderRadius:"10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                        </div>
                        <p style={{margin:"15px 0",color:"blue"}}>TECHNOLOGY</p>
                        <p style={{margin:"15px 0"}}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                        <div style={{ display: "flex", border: "2px solid black",alignItems:"center" }} className="autohorContainer">
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                <img style={{ width: "100%",height:"100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                            </div>
                            <span>Mario Sanchez</span>
                            <span>October 21, 2022</span>
                        </div>
                    </div>
                    <div style={{ width: "28%",padding:"10px 0",border:"2px solid yellow" }} className="smallCard">
                        <div style={{borderRadius:"10px",height:"350px",border:"2px solid blue"}} className="imageContainer">
                            <img style={{ width: "100%",height:"100%", objectFit: "cover",borderRadius:"10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                        </div>
                        <p style={{margin:"15px 0",color:"blue"}}>TECHNOLOGY</p>
                        <p style={{margin:"15px 0"}}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                        <div style={{ display: "flex", border: "2px solid black",alignItems:"center" }} className="autohorContainer">
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                <img style={{ width: "100%",height:"100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                            </div>
                            <span>Mario Sanchez</span>
                            <span>October 21, 2022</span>
                        </div>
                    </div>
                    <div style={{ width: "28%",padding:"10px 0",border:"2px solid yellow" }} className="smallCard">
                        <div style={{borderRadius:"10px",height:"350px",border:"2px solid blue"}} className="imageContainer">
                            <img style={{ width: "100%",height:"100%", objectFit: "cover",borderRadius:"10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                        </div>
                        <p style={{margin:"15px 0",color:"blue"}}>TECHNOLOGY</p>
                        <p style={{margin:"15px 0"}}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                        <div style={{ display: "flex", border: "2px solid black",alignItems:"center" }} className="autohorContainer">
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                <img style={{ width: "100%",height:"100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                            </div>
                            <span>Mario Sanchez</span>
                            <span>October 21, 2022</span>
                        </div>
                    </div>
         
                </div>
            </div>

        </div> */}
    </>
  );
};

export default AddProperty;
