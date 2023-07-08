export type ForecastType = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  list:
    | [
        {
          dt: number;
          main: {
            feels_like: number;
            humidity: number;
            pressure: number;
            temp: number;
            temp_max: number;
            temp_min: number;
          };
          weather: [
            {
              main: string;
              icon: string;
              description: string;
            }
          ];
          wind: {
            speed: number;
            gust: number;
            deg: number;
          };
          clouds: {
            all: number;
          };
          pop: number;
          visibility: number;
        }
      ];
};

export type ForecastResponse = {
  cod?: string;
  message?: number;
  cnt?: number;
  list: List[];
  city: City;
};

type List = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
};

type Main = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

type Weather = {
  main: string;
  icon: string;
  description: string;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type City = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
};
