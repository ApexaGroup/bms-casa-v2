const initialState = "#ff5500";
const changeTheTheme = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return (state = action.payload);

    default:
      return state;
  }
};

export default changeTheTheme;
