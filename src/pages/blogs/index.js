import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import axios from 'axios';

// Dummy blog data
const blogs = [
    { slug: 'blog1', title: 'Blog 1', content: 'This is the content of Blog 1.' },
    { slug: 'blog2', title: 'Blog 2', content: 'This is the content of Blog 2.' },
    // Add more blogs as needed
];


// const center = { lat: 12.9715, lng: 77.5945 }

var apiKey = "AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ";

const BlogList = () => {

    const [cityName, setCityName] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [center, setCenter] = useState({});


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    })


    if (!isLoaded) {
        return <h1> Loading...</h1>
    }


    // console.log(apiKey, "api key")

    const fetchCoordinates = async (cityName) => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: cityName,
                key: apiKey,
              },
            }
          );
      
          if (response.status === 200) {
            const { lat, lng } = response.data.results[0].geometry.location;
            setLat(lat);
            setLng(lng);
          } else {
            console.error('Geocoding request failed.');
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      };
      


    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (cityName) {
            fetchCoordinates(cityName);
        }
    };

    //       useEffect(() => {
    // setCenter({lat:lat,lng:lng})

    //       }, [lat,lng])
    console.log(center, "center")


    return <>
        {/* <div>
            {blogs.map((blog) => (
                <Link href={`/blogs/${blog.slug}`} key={blog.slug}>
                    <h2>{blog.title}</h2>
                </Link>
            ))}
        </div> */}


        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="blogContainer">
            <div className="container">
                {/* <h1 style={{}}>Blog</h1> */}

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }} className="mainCardContainer">
                    <div style={{ width: "48%", padding: "10px 0" }} className="mainCard">
                        <Link href="/blogs/blog1"> {/* Replace "/blogs/blog1" with the appropriate dynamic route */}
                            <a>
                                <div style={{ borderRadius: "10px" }} className="imageContainer">
                                    <img style={{ width: "100%", objectFit: "cover", borderRadius: "10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                                </div>
                                <p style={{ margin: "15px 0", color: "blue" }}>TECHNOLOGY</p>
                                <p style={{ margin: "15px 0", fontSize: "20px", fontWeight: "bold" }}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                                <div style={{ display: "flex", alignItems: "center" }} className="autohorContainer">
                                    <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                                    </div>
                                    <span style={{ color: "grey", marginLeft: "15px", marginBottom: "5px", marginRight: "15px" }}>Mario Sanchez</span>
                                    <span style={{ color: "grey", marginBottom: "5px" }}>October 21, 2022</span>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div style={{ width: "48%", padding: "10px 0" }} className="mainCard">
                        <Link href="/blogs/blog1"> {/* Replace "/blogs/blog1" with the appropriate dynamic route */}
                            <a>
                                <div style={{ borderRadius: "10px" }} className="imageContainer">
                                    <img style={{ width: "100%", objectFit: "cover", borderRadius: "10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                                </div>
                                <p style={{ margin: "15px 0", color: "blue" }}>TECHNOLOGY</p>
                                <p style={{ margin: "15px 0", fontSize: "20px", fontWeight: "bold" }}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                                <div style={{ display: "flex", alignItems: "center" }} className="autohorContainer">
                                    <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                                    </div>
                                    <span style={{ color: "grey", marginLeft: "15px", marginBottom: "5px", marginRight: "15px" }}>Mario Sanchez</span>
                                    <span style={{ color: "grey", marginBottom: "5px" }}>October 21, 2022</span>
                                </div>
                            </a>
                        </Link>
                    </div>

                </div>
            </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="fullcontainer">
            <div style={{ width: "70%" }} className="container">


                <form style={{ margin: "20px 0" }} onSubmit={handleFormSubmit}>
                    <label htmlFor="city">City:</label>
                    <input
                        required
                        className="inputField"
                        type="text"
                        id="city"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button style={{ backgroundColor: "rgb(51,100,197)", color: "white", padding: "10px 20px", borderRadius: "10px" }} type="submit">Get Coordinates</button>
                </form>


            </div>

        </div>


        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} className="bigContainer">
            <div style={{ width: "70%", height: "1000px" }} className="mapContainer">



                <GoogleMap center={{ lat: lat, lng: lng }} zoom={15} mapContainerStyle={{ width: "100%", height: "700px" }}>
                    {lat && lng && <Marker position={{ lat: lat, lng: lng }} />}
                </GoogleMap>

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

};

export default BlogList;
