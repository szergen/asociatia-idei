import {
  container,
  mrAuto,
  mlAuto,
  description,
} from "/styles/jss/nextjs-material-kit-pro.js";

const descriptionStyle = {
  container,
  textCenter: {
    textAlign: "center",
  },
  aboutDescription: {
    padding: "70px 0 0 0",
  },
  mrAuto,
  mlAuto,
  description: {
    ...description,
    fontSize: "1.2rem",
    lineHeight: "1.6em",
    textAlign: "left",
    padding: "0 20px",
    margin: "0 auto",
    maxWidth: "800px",
  },
};

export default descriptionStyle;
