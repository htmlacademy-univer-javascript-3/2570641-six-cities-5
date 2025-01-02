import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '@/hooks/map';
import { Offer, Offers } from '@/types/offer';
import {URL_PIN, URL_PIN_ACTIVE} from '@/const';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types/location';

type MapProps = {
    location: Location;
    offers: Offers;
    selectedOffer: Offer | undefined;
  };

const defaultCustomIcon = new Icon({
  iconUrl: URL_PIN,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_PIN_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ location, offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        if (offer && offer.location) {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });

          marker
            .setIcon(
              selectedOffer !== undefined && offer.id === selectedOffer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div style={{ width: '100%', height: '100%' }} ref={mapRef}></div>;
}
