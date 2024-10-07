
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Icon} from 'leaflet';
import axios from "axios";
import "./App.css";
import Swal from 'sweetalert2'
const base_url = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const center = [13.838487865712025, 100.02534086066446]; //SE NPRU
  const [stores, setStores] = useState([]);
  const [mylocation, setMylocation] = useState({lat:"",lng:""})
const [deliveryZone, setDalivery] = useState({
  lat: 13.83231804,
  lng: 100.04105221,
  radius: 1000,
});

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; //earth radius  in meters
  const phi_1 = (lat1 * Math.PI) / 180;
  const phi_2 = (lat2 * Math.PI) / 180;

  const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
  const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
    Math.cos(phi_1) *
      Math.cos(phi_2) *
      Math.sin(delta_lambda / 2) *
      Math.sin(delta_lambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};





  useEffect(() => {
   const fetchStore = async () => {
     try {
       const response = await axios.get(base_url + "/api/stores");
       console.log(response.data);
       if (response.status === 200) {
         setStores(response.data);
       }
     } catch (error) {
       console.error("Error fetching stores:", error);
     }
   };
    fetchStore();
  }, []);


  const Locationmap = ()=>{
    useMapEvent({
      click(e) {
        const { lat, lng } = e.latlng;
        setMylocation({ lat, lng });
        console.log("Click at latitue:" + lat + "longtitue" + lng);
      },
    });
    return (
      <Marker position={[mylocation.lat, mylocation.lng]} icon={housingIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  }
  
   const housingIcon = new Icon({
     iconUrl: "https://img.icons8.com/plasticine/100/exterior.png",
     iconSize: [38, 45], // size of the icon
   });


  const handleGetLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setMylocation({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
      })
    })
  }

 const handleLocationCheck = () => {
   if (mylocation.lat === "" || mylocation.lng === "") {
     Swal.fire({
       title: "Error",
       text: "Please enter your valid location",
       icon: "error",
       confirmButtonText: "OK",
     });
     return;
   }

   if (!deliveryZone.lat || !deliveryZone.lng) {
     Swal.fire({
       title: "Error",
       text: "Please enter a valid store location",
       icon: "error",
       confirmButtonText: "OK",
     });
     return;
   }

   const distance = calculateDistance(
     mylocation.lat,
     mylocation.lng,
     deliveryZone.lat,
     deliveryZone.lng
   );

   if (distance <= deliveryZone.radius) {
     Swal.fire({
       title: "Success",
       text: "You are within the delivery zoneบักเสี่ยว.",
       icon: "success",
       confirmButtonText: "OK",
     });
   } else {
     Swal.fire({
       title: "Sorry",
       text: "You are outside the delivery zone.",
       icon: "error",
       confirmButtonText: "OK",
     });
   }
 };

  return (
    <div>
      <h1>Store Dalivery Zone Checker</h1>
      <button onClick={handleGetLocation}>Get My location</button>
      <button onClick={handleLocationCheck}>check Delivery </button>
      <div>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "75vh", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/**Display all stores on map */}
          {stores &&
            stores.map((store) => {
              return (
                <Marker position={[store.lat, store.lng]} key={store.id}>
                  <Popup>
                    <p>{store.name}</p>
                    <p>{store.address}</p>
                    <a href={store.direction}>Get Direction</a>
                  </Popup>
                </Marker>
              );
            })}
          {/**Choose Location on Map */}
          <Locationmap />
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
