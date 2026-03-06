export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  background: "https://vishub.org/pictures/27471.png",
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //message: "Custom message",
  rows: 6,
  columns: 6,
  timer: "TrUe",


  //Settings that will be automatically specified by the Escapp server
  localStorageKey: "12230",
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/509",
    linkedPuzzleIds: [1],
    rtc: false,
    preview: false
  },
};