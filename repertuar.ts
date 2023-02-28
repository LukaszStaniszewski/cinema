const repertoire = {
  "5-12-2022": {
    cinemaRoom1: {
      "10:00": {
        //movie
      },
      "12:00": {
        //movie
      },
      "14:00": {
        //movie
      },
      "17:00": {
        //movie
      },
      "20:00": {
        //movies
      },
    },
    cinemaRoom2: {
      "10:00": {
        //movie
      },
      "12:00": {
        //movie
      },
      "14:00": {
        //movie
      },
      "17:00": {
        //movie
      },
      "20:00": {
        //movies
      },
    },
    cinemaRoom3: {
      "10:00": {
        //movie
      },
      "12:00": {
        //movie
      },
      "14:00": {
        //movie
      },
      "17:00": {
        //movie
      },
      "20:00": {
        //movies
      },
    },
  },
  apperances: {
    darkKnight: 3,
    diune: 4,
    rickMorty: 3,
    avatar: 3,
    lotr: 2,
  },
  "6-12-2022": {
    cinemaRoom1: {
      "10:00": {
        //movie
        // //rick and morty
      },
      "12:00": {
        //movie
        //diune
      },
      "14:00": {
        //movie
        //diune
      },
      "17:00": {
        //movie
        // "dark-knight"
      },
      "20:00": {
        //movies
        // "dark-knight"
      },
    },
    cinemaRoom2: {
      "10:00": {
        //movie
        //"dark-knight"
      },
      "12:00": {
        //movie
        //avatar
      },
      "14:00": {
        //movie
        //avatar
      },
      "17:00": {
        //movie
        //lotr
      },
      "20:00": {
        //movies
        //lotr
      },
    },
    ciemaRoom3: {
      "10:00": {
        //movie
        //diune
      },
      "12:00": {
        //movie
        //rick and morty
      },
      "14:00": {
        //movie
        //rick and morty
      },
      "17:00": {
        //movie
        //diune
      },
      "20:00": {
        //movies
        //avatar
      },
    },
  },
};
//@@@@@@@ dashboard(home-page) - default @@@@@@
// /api/repertoire/currentDate

//@@@@@@@ dashboard(home-page) - byDate @@@@@@
// /api/repertoire/6-12-2022

//@@@@@@@ reservation page @@@@@@
// /api/repertoire/6-12-2022/cinemaRoomId/hour

const test = {
  "06-12-2022": {
    "room-a": [
      {
        hour: "10:00",
        movieTitle: "Rick and Morty",
        runTime: 240,
      },
      {
        hour: "14:15",
        movieTitle: "Dune",
        runTime: 155,
      },
      {
        hour: "17:00",
        movieTitle: "Dune",
        runTime: 155,
      },
      {
        hour: "19:45",
        movieTitle: "Dark Knight",
        runTime: 140,
      },
      {
        hour: "22:30",
        movieTitle: "Dark Knight",
        runTime: 140,
      },
    ],
    "room-b": [
      {
        hour: "10:00",
        movieTitle: "Dark Knight",
        runTime: 140,
      },
      {
        hour: "12:35",
        movieTitle: "Avatar",
        runTime: 192,
      },
      {
        hour: "16:00",
        movieTitle: "Avatar",
        runTime: 192,
      },
      {
        hour: "19:25",
        movieTitle: "Władca Pierścieni: Powrót Króla",
        runTime: 201,
      },
    ],
    "room-c": [
      {
        hour: "10:00",
        movieTitle: "Dune",
        runTime: 155,
      },
      {
        hour: "12:45",
        movieTitle: "Rick and Morty",
        runTime: 240,
      },
      {
        hour: "17:00",
        movieTitle: "Władca Pierścieni: Powrót Króla",
        runTime: 201,
      },
      {
        hour: "20:35",
        movieTitle: "Diune",
        runTime: 155,
      },
      {
        hour: "22:00",
        movieTitle: "Avatar",
        runTime: 192,
      },
    ],
  },
  "07-12-2022": {
    "room-a": [
      {
        hour: "10:00",
        movieTitle: "Rick and Morty",
        runTime: 240,
      },
      {
        hour: "14:15",
        movieTitle: "Dune",
        runTime: 155,
      },
      {
        hour: "17:00",
        movieTitle: "Dune",
        runTime: 155,
      },
      {
        hour: "19:45",
        movieTitle: "Dark Knight",
        runTime: 140,
      },
      {
        hour: "22:30",
        movieTitle: "Dark Knight",
        runTime: 140,
      },
    ],
  },
  "22-12-2022": {
    "room-a": [
      {
        hour: "16:00",
        movieTitle: "Avatar: Istota Wody",
        runTime: 192,
      },
    ],
  },
};
