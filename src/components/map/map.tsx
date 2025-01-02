import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '@/hooks/map';
import { URL_PIN, URL_PIN_ACTIVE } from '@/const';
import { Location } from '@/types/location';
import { Offers, Offer } from '@/types/offer';

export default function Map({
  location,
  offers,
  selectedOffer,
}: {
  location: Location;
  offers: Offers;
  selectedOffer: Offer | null;
}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                offer.id === selectedOffer?.id
                  ? leaflet.icon({
                    iconUrl: URL_PIN_ACTIVE,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                  })
                  : leaflet.icon({
                    iconUrl: URL_PIN,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                  }),
            }
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <div style={{ width: '100%', height: '100%' }} ref={mapRef}></div>;
}
