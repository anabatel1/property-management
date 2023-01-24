import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState
} from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const ErrorText = () => {
  const { t } = useTranslation();
  return t('listingDetails.map.notFound');
};
const LoadingText = () => {
  const { t } = useTranslation();
  return t('listingDetails.map.loading');
};

const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const MapComponent = ({
  center,
  zoom,
  children,
  style,
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map, center, zoom]);

  return (
    <div ref={ref} id="map" style={style}>
      {Children.map(children, (child, key) => {
        if (isValidElement(child)) {
          return cloneElement(child, { key, map });
        }
      })}
    </div>
  );
};

const render = (status) => {
  if (status === Status.LOADING) {
    return <h4><LoadingText /></h4>;
  }

  if (status === Status.FAILURE) {
    return <h4><ErrorText /></h4>;
  }

  return null;
};

const Map = ({
  center = {
    lat: 0,
    lng: 0,
  },
  zoom = 18,
  markers = [],
  style = {}
}) => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
      <MapComponent center={center} zoom={zoom} style={style}>
        {markers?.length > 0 && markers.map((position) => (
          <Marker key={JSON.stringify(position)} position={position} />
        ))}
      </MapComponent>
    </Wrapper>
  );
};

const CoordinatesPropTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};

Map.propTypes = {
  center: PropTypes.shape(CoordinatesPropTypes),
  zoom: PropTypes.number,
  markers: PropTypes.array,
  style: PropTypes.object,
};

MapComponent.propTypes = {
  center: PropTypes.shape(CoordinatesPropTypes),
  zoom: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Map;