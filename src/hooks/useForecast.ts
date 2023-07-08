/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useEffect, useState } from 'react';
import { OptionType } from '../types';
import { ForecastResponse, ForecastType } from '../types/forecastType';
// import { useDebounce } from './useDebounce';

export const useForecast = () => {
  const [term, setTerm] = useState('');
  const [options, setOptions] = useState<OptionType[]>([]);
  const [city, setCity] = useState<OptionType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  // const debounced = useDebounce(term);

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then(res => res.json())
      .then((data: OptionType[]) => {
        setOptions(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   if (debounced) {
  //     getSearchOptions(debounced);
  //   }
  // }, [debounced]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setTerm(value);
    // if (value === '') return;
    if (value !== '') getSearchOptions(value);
  };

  const getForecast = (city: OptionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
        city.lon
      }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then(res => res.json())
      .then((data: ForecastResponse) => {
        const forecastData = {
          ...data.city,
          list: data.list?.slice(0, 16),
        };
        setForecast(forecastData as ForecastType);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onSubmit = () => {
    if (!city) {
      return;
    } else {
      getForecast(city);
    }
  };

  const onOptionSelect = (option: OptionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
  };
};
