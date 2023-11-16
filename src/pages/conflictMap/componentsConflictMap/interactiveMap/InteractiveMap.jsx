import { useState, useEffect } from 'react';
import {FaRegCalendar, FaRegFlag, FaMapMarkerAlt} from 'react-icons/fa'
import { useLoadScript, GoogleMap, Marker, InfoWindow, StandaloneSearchBox} from '@react-google-maps/api';
import useConflicts from '../../../../hooks/useConflicts';


const apiKey = import.meta.env.REACT_APP_API_KEY;

export const InteractiveMap = ()=> {

   const {conflict} = useConflicts();
   const libraries = ["places"];

   const [selectedMarker, setSelectedMarker] = useState(null);
   const [markers, setMarkers] = useState([]);
   const [map, setMap] = useState(null);
   const [center, setCenter] = useState({ lat: -29.9533200, lng: -71.3394700 });

   const [searchBox, setSearchBox] = useState(null);
   const onSearchBoxLoaded = ref => setSearchBox(ref);
   const onPlacesChanged = () => {
      const places = searchBox.getPlaces();

      if (places && places.length > 0) {
         const location = places[0].geometry.location;
         setCenter({
            lat: location.lat(),
            lng: location.lng()
         });
         map.panTo(location);
      }
   };

   const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
 });

  // Load markers and areas
  useEffect(() => {
    if (isLoaded && !loadError) {
       setMarkers(
          conflict.map(conflict => ({
             id: conflict.id,
             position: { lat: conflict.lat, lng: conflict.lng },
             onClick: () => setSelectedMarker(conflict),
             title: conflict.title, // Add name property
             description: conflict.description, // Add description property
             status: conflict.status,
             img: conflict.imageUrl,
             date: conflict.date,
             location: conflict.location,
          }))
       );
      
    }
 }, [isLoaded, loadError, conflict]);

 const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
 };

 if (loadError) return "Error loading maps";
   if (!isLoaded) return "Loading Maps";

  return (
    <div className="d-flex flex-column p-4 m-4 align-items-center"> 
      <div className="text-center w-50 mb-4">
         <h1 className="mb-2">¿Conoces los desastres ambientales activos?</h1>
         <p>Navega en nuestro mapa y conoce todas las denuncias que estan declaradas.</p>
      </div>      
      <GoogleMap      
         mapContainerStyle={{width:"100%", height:"600px", borderRadius: "30px"}}
         zoom={6}
         center={center}
         onLoad={ref => setMap(ref)}
         >
      <StandaloneSearchBox
         onLoad={onSearchBoxLoaded}
         onPlacesChanged={onPlacesChanged}>
         <input
            type="text"
            placeholder="Search location"
            style={{ boxSizing: 'border-box', border: '1px solid transparent', width: '240px', height: '32px', marginTop: '27px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses', position: "absolute", left: "50%", marginLeft: "-120px" }}
            />
      </StandaloneSearchBox>

    {markers.map(marker => (
      <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
      />
    ))}
         {/* // Display info when clicked */}
         {selectedMarker && (
      <InfoWindow
         position={selectedMarker.position}
         onCloseClick={() => setSelectedMarker(null)}
       >
          <div className="container">
            <div className="card-columns">
               <div className="d-flex flex-row align-items-center">
                  <div>
                     <img src={selectedMarker.img} className="rounded-circle d-none d-md-block" style={{width:"100px", height:"100px"}}/>
                  </div>
                  <div className="card-body mx-2 pt-4">
                     <h5 className="card-title p-2 mb-2">{selectedMarker.title}</h5>
                     <div className="d-flex flex-md-row flex-column">
                        <p className="card-text p-md-2 p-0"><small className="text-muted">
                           <FaRegFlag/> Estado:{selectedMarker.status}
                        </small></p>  
                        <p className="card-text p-md-2 p-0"><small className="text-muted">
                           <FaRegCalendar/> Publicación: {selectedMarker.date}
                        </small></p> 
                        <p className="card-text p-md-2 p-0"><small className="text-muted">
                           <FaMapMarkerAlt/>{selectedMarker.location}
                        </small></p>  
                     </div>
                  </div>
               </div>
               <p className="card-text p-4 mt-2 d-md-flex d-none">{selectedMarker.description}</p> 
               <div className="d-flex justify-content-end mx-0 mb-4 mt-4 mt-md-0">
                  <button className="btn btn-warning rounded-start-pill px-4 " type="button">Ver más detalle de la denuncia</button>
               </div>
            </div>
         </div>
       </InfoWindow>
    )}
    
      </GoogleMap>
   </div>
  )
}
