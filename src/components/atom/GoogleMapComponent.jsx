import { useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { getActualColor } from "./Utils";

const GoogleMapComponent = ({ stores }) => {
  const wrapperRef = useRef(null);
  const [wrapperSize, setWrapperSize] = useState(null);
  const [map, setMap] = useState(null);

  const navigate = useNavigate();
  
  const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  useEffect(() => {
    const $wrapper = d3.select(wrapperRef.current);
    if($wrapper) {
      let wSize = $wrapper.node().getBoundingClientRect();
      if(wSize) {
        setWrapperSize(wSize);
      }
    }
  }, []);

  const handleShowStore = (storeId) => {
    navigate("/dashboard/stores/" + storeId);
  };

  
  useEffect(() => {
    if(wrapperSize !== null) {

      let mp = null;
      let height = wrapperSize.height || "300px";

      if(typeof window !== "undefined" && window.google) {
        mp = <GoogleMap
          mapContainerStyle={{width: wrapperSize.width + "px", height: height}}
          zoom={2}
          center={stores[2].address.position}
          options={{
            styles: mapStyles
          }}
        >
          {
            stores.map((store) => {
              const customMarker = {
                path: "M8.43035 10.7C7.27369 10.7 6.33233 9.73249 6.33233 8.54249C6.33233 7.3534 7.27369 6.38501 8.43035 6.38501C9.58702 6.38501 10.5284 7.3534 10.5284 8.54249C10.5284 9.73249 9.58702 10.7 8.43035 10.7ZM8.43035 4.7392C6.36566 4.7392 4.68651 6.44537 4.68651 8.54249C4.68651 10.6396 6.36566 12.3467 8.43035 12.3467C10.495 12.3467 12.1751 10.6396 12.1751 8.54249C12.1751 6.44537 10.495 4.7392 8.43035 4.7392ZM8.42945 19.9983C7.79347 19.293 6.78904 18.1174 5.78913 16.6986C3.67038 13.6934 2.55065 11 2.55065 8.90823C2.55065 3.02042 7.05119 2.5628 8.43035 2.5628C13.8858 2.5628 14.3101 7.42006 14.3101 8.90823C14.3101 13.0493 10.0969 18.1444 8.42945 19.9983ZM13.7101 2.54839C12.3589 1.34488 10.4833 0.680973 8.43035 0.680973C6.37647 0.680973 4.50184 1.34488 3.1506 2.54839C1.52731 3.99512 0.668823 6.19404 0.668823 8.90823C0.668823 14.8204 7.47277 21.7486 7.76194 22.0405C7.9385 22.218 8.17902 22.3188 8.43035 22.3188C8.68078 22.3188 8.9213 22.218 9.09787 22.0405C9.38793 21.7486 16.191 14.8204 16.191 8.90823C16.191 6.19404 15.3334 3.99512 13.7101 2.54839Z",
                fillColor: getActualColor(store.uptime),
                fillOpacity: 2,
                rotation: 0,
                scale: 1,
                strokeColor: "transparent"
              };
              return <Marker
                key={store.id}
                onClick={() => { handleShowStore(store.id); }} 
                position={store.address.position} 
                icon={customMarker}
              />
            })
          }
        </GoogleMap>
      } else {
        mp = <LoadScript googleMapsApiKey="AIzaSyATdBkKcsZR_L2oirMeSMSxRojyLH2nAvE">
          <GoogleMap
            mapContainerStyle={{width: wrapperSize.width + "px", height: height}}
            zoom={2}
            center={stores[2].address.position}
            options={{
              styles: mapStyles
            }}
          >
            {
              stores.map((store) => {
                const customMarker = {
                  path: "M8.43035 10.7C7.27369 10.7 6.33233 9.73249 6.33233 8.54249C6.33233 7.3534 7.27369 6.38501 8.43035 6.38501C9.58702 6.38501 10.5284 7.3534 10.5284 8.54249C10.5284 9.73249 9.58702 10.7 8.43035 10.7ZM8.43035 4.7392C6.36566 4.7392 4.68651 6.44537 4.68651 8.54249C4.68651 10.6396 6.36566 12.3467 8.43035 12.3467C10.495 12.3467 12.1751 10.6396 12.1751 8.54249C12.1751 6.44537 10.495 4.7392 8.43035 4.7392ZM8.42945 19.9983C7.79347 19.293 6.78904 18.1174 5.78913 16.6986C3.67038 13.6934 2.55065 11 2.55065 8.90823C2.55065 3.02042 7.05119 2.5628 8.43035 2.5628C13.8858 2.5628 14.3101 7.42006 14.3101 8.90823C14.3101 13.0493 10.0969 18.1444 8.42945 19.9983ZM13.7101 2.54839C12.3589 1.34488 10.4833 0.680973 8.43035 0.680973C6.37647 0.680973 4.50184 1.34488 3.1506 2.54839C1.52731 3.99512 0.668823 6.19404 0.668823 8.90823C0.668823 14.8204 7.47277 21.7486 7.76194 22.0405C7.9385 22.218 8.17902 22.3188 8.43035 22.3188C8.68078 22.3188 8.9213 22.218 9.09787 22.0405C9.38793 21.7486 16.191 14.8204 16.191 8.90823C16.191 6.19404 15.3334 3.99512 13.7101 2.54839Z",
                  fillColor: getActualColor(store.uptime),
                  fillOpacity: 2,
                  rotation: 0,
                  scale: 1,
                  strokeColor: "transparent"
                };
                return <Marker
                  key={store.id}
                  onClick={() => { handleShowStore(store.id); }} 
                  position={store.address.position} 
                  icon={customMarker}
                />
              })
            }
          </GoogleMap>
        </LoadScript>
      }
      setMap(mp);
    }
  }, [wrapperSize]);


  return (
    <div ref={wrapperRef} className='flex-grow w-full h-full relative transition-all'>
      {map !== null ? map: ""}
    </div>
  );
}

export default GoogleMapComponent