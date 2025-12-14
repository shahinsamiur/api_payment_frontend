import { useEffect, useState } from "react";

const useCountryFromGeolocation = () => {
  const [country, setCountry] = useState("BD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `/api/get-country?lat=${latitude}&lng=${longitude}`
          );
          const data = await res.json();

          if (data.error) setError(data.error);
          else setCountry(data.country);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return { country, loading, error };
};

export default useCountryFromGeolocation;
