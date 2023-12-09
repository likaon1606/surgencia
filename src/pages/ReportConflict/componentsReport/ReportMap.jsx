import { useState } from 'react'
import { useLoadScript, GoogleMap, Marker, StandaloneSearchBox, InfoWindowF } from '@react-google-maps/api'
import { FaMapMarkerAlt } from 'react-icons/fa'

const apiKey = import.meta.env.VITE_API_KEY

const ReportMap = ({ setLocation }) => {
  const libraries = ['places']

  const [isOpen, setIsOpen] = useState(null)
  const [marker, setMarker] = useState(null)
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({ lat: -29.95332, lng: -71.33947 })

  const onMapClick = event => {
    setMarker({
      id: event.key,
      position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
      onClick: () => setIsOpen(true),
      lat: event.latLng.lat(),
      long: event.latLng.lng(),
    })
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() })
  }

  const [searchBox, setSearchBox] = useState(null)
  const onSearchBoxLoaded = ref => setSearchBox(ref)
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces()

    if (places && places.length > 0) {
      const {
        geometry: { location },
        formatted_address,
        name,
      } = places[0]
      setCenter({
        lat: location.lat(),
        lng: location.lng(),
      })
      setLocation({ lat: location.lat(), lng: location.lng() })
      setMarker({
        position: { lat: location.lat(), lng: location.lng() },
        lat: location.lat(),
        long: location.lng(),
        onClick: () => setIsOpen(true),
        formatted_address,
        name,
      })
      map.panTo(location)
    }
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  })

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'
  return (
    <div className="d-flex flex-column align-items-center w-100">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={10}
        center={center}
        onLoad={ref => setMap(ref)}
        onClick={onMapClick}
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

        {marker && (
          <Marker key={marker.id} position={marker.position} onClick={() => setIsOpen(true)}>
            {isOpen && (
              <InfoWindowF onCloseClick={() => setIsOpen(false)}>
                <div className="container d-flex flex-column gap-1 p-2">
                  <h4>{marker.name || 'Coordenadas'}</h4>
                  {marker.formatted_address && (
                    <p className="d-flex align-items-center gap-1 mb-2">
                      <FaMapMarkerAlt /> {marker.formatted_address}
                    </p>
                  )}
                  <p className="mb-0">Lat: {marker.lat}</p>
                  <p className="mb-0">Long: {marker.long}</p>
                </div>
              </InfoWindowF>
            )}
          </Marker>
        )}
      </GoogleMap>
    </div>
  )
}

export default ReportMap
