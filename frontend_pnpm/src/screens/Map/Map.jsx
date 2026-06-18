import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import { listSupplierProductsForAll } from './../../actions/supplierProduct';
import MapStyles from './MapStyles';
import Rating from './Rating/Rating';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 12.9716,
  lng: 77.5946
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const supplierProductForAllList = useSelector(
    state => state.supplierProductForAllList || {}
  );
  const {
    loading: loadingProducts,
    error: errorProducts,
    products = []
  } = supplierProductForAllList;

  useEffect(() => {
    dispatch(listSupplierProductsForAll());
  }, [dispatch]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || ''
  });

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{ styles: MapStyles }}
    >
      {loadingProducts ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant="danger">{errorProducts}</Message>
      ) : (
        Array.isArray(products) &&
        products.map((place) => {
          if (!place?.latitude || !place?.longitude) return null;

          return (
            <Marker
              key={place._id}
              position={{
                lat: Number(place.latitude),
                lng: Number(place.longitude)
              }}
              onClick={() => setSelectedPlace(place)}
              icon={{
                url: '/mapIcon.svg',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          );
        })
      )}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: Number(selectedPlace.latitude),
            lng: Number(selectedPlace.longitude)
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <Image
              className="mx-auto d-block img-fluid mb-1"
              rounded
              width="120px"
              src={selectedPlace.image}
              alt={selectedPlace.name}
            />
            <h4 style={{ textAlign: 'center' }}>
              {selectedPlace.cropSelection}
            </h4>
            <p>
              Description: {selectedPlace.description}
              <br />
              {selectedPlace.isReviwed && (
                <Rating
                  text="Rating"
                  value={selectedPlace.rating}
                />
              )}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
