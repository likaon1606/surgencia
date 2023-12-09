import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaRegCalendar, FaRegFlag } from 'react-icons/fa'
import { useLoadScript, GoogleMap, Marker, StandaloneSearchBox, InfoWindowF } from '@react-google-maps/api'
import useConflicts from '../../../../hooks/useConflicts'
import './InteractiveMap.css'

const apiKey = import.meta.env.VITE_API_KEY

export const InteractiveMap = () => {
  const { conflict } = useConflicts()
  const libraries = ['places']

  const [selectedMarker, setSelectedMarker] = useState(null)
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({ lat: -29.95332, lng: -71.33947 })

  const [searchBox, setSearchBox] = useState(null)
  const onSearchBoxLoaded = ref => setSearchBox(ref)
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces()

    if (places && places.length > 0) {
      const location = places[0].geometry.location
      setCenter({
        lat: location.lat(),
        lng: location.lng(),
      })
      map.panTo(location)
    }
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  })

  // Load markers and areas
  useEffect(() => {
    // if (isLoaded && !loadError) {
    if (isLoaded) {
      setMarkers(
        conflict.map(conflict => ({
          id: conflict.id,
          position: { lat: +conflict.lat, lng: +conflict.lng },
          onClick: () => setSelectedMarker(conflict),
          title: conflict.title, // Add name property
          description: conflict.description, // Add description property
          status: conflict.status,
          img: conflict.imageUrl,
          date: conflict.date,
          location: conflict.location,
        })),
      )
    }
  }, [isLoaded, loadError, conflict])

  const handleMarkerClick = marker => {
    setSelectedMarker(marker)
  }

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  return (
    <>
      <div className="text-center mx-auto text-conflict-container">
        <h2>
          ¿Conoces eventos históricos o actuales que hayan puesto o estén poniendo en riesgo ecosistemas costeros de la
          Región de Coquimbo?
        </h2>
        <p>Navega en este mapa y revisa todas las observaciones que hemos recibido.</p>
        <p>Tú también puedes aportar con tu registro.</p>
      </div>
      <div className="d-flex flex-column my-4 align-items-center">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '600px', borderRadius: '30px' }}
          zoom={6}
          center={center}
          onLoad={ref => setMap(ref)}
        >
          <StandaloneSearchBox onLoad={onSearchBoxLoaded} onPlacesChanged={onPlacesChanged}>
            <input
              type="text"
              placeholder="Search location"
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                marginTop: '27px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </StandaloneSearchBox>

          {markers.map(marker => (
            <Marker key={marker.id} position={marker.position} onClick={() => handleMarkerClick(marker)} />
          ))}
          {/* // Display info when clicked */}
          {selectedMarker && (
            <InfoWindowF position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
              <div className="container">
                <div className="d-flex flex-column flex-md-row align-items-center gap-2 p-md-2">
                  <img
                    src={selectedMarker.img}
                    className="rounded-circle d-none d-md-block"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className="w-100 card-body mx-2">
                    <h5 className="card-title mb-2">{selectedMarker.title}</h5>
                    <div className="d-flex flex-column flex-md-row">
                      <p className="card-text d-flex flex-column flex-md-row gap-2 p-md-2 p-0">
                        <small className="text-muted">
                          <FaRegFlag /> Estado: {selectedMarker.status}
                        </small>
                        <small className="text-muted">
                          <FaRegCalendar /> Publicación: {selectedMarker.date}
                        </small>
                        <small className="text-muted">
                          <FaMapMarkerAlt />
                          {selectedMarker.location}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="card-text p-md-3 mt-2">{selectedMarker.description}</p>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </>
  )
}
