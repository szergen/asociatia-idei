import {
  container,
  section,
  sectionDark,
  mlAuto,
  title,
  description,
  cardTitle,
  blackColor,
  whiteColor,
  hexToRgb
} from "/styles/jss/nextjs-material-kit-pro.js";

const mobileBp = '@media (max-width: 720px)';
const tabletBp = "@media (max-width: 1280px)";

import customCheckboxRadioSwitch from "/styles/jss/nextjs-material-kit-pro/customCheckboxRadioSwitchStyle.js";

const contactsSection = {
  ...customCheckboxRadioSwitch,
  container,
  mlAuto,
  title,
  description,
  cardTitle,
  section: {
    ...sectionDark,
    ...section,
    position: "relative",
    "& $container": {
      padding: "0 100px",
      zIndex: "2",
      position: "relative",
      [mobileBp]: {
        padding: "0 15px",
      },
      [tabletBp]: {
        padding: "0 30px",
      },
    },
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.7)"
    },
    "& $title": {
      color: whiteColor
    },
    "& $description": {
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)"
    },
    "& $infoArea": {}
  },
  contacts: {
    [mobileBp]: {
      padding: "0",
    },
    padding: "80px 0"
  },
  errorMsg: {
    background: "white",
    padding: "20px",
    color: "red",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "1.5em",
    marginTop: "0",
    marginBottom: "0",
    textAlign: "left",
    width: "100%",
    position: "absolute",
    top: "0px",
    left: "0px",
  },
  notification: {
    position: "absolute",
    textAlign: "left",
    width: "93%",
  },
  infoArea: {
    padding: "0",
    margin: "0",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      color: whiteColor
    },
    "& h4": {
      marginTop: "20px",
      color: whiteColor
    }
  },
  card1: {
    marginTop: "30px",
    "& $cardTitle": {
      marginBottom: "0.75rem !important",
      color: whiteColor
    }
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentBetween: {
    WebkitBoxPack: "justify !important",
    MsFlexPack: "justify !important",
    justifyContent: "space-between !important"
  },
  pullRight: {
    float: "right"
  },
  card2: {
    "@media (min-width: 991px)": {
      margin: "80px 0 80px 150px"
    },
    maxWidth: "560px",
    float: "left",
    "& $cardTitle": {
      marginBottom: "0.75rem !important",
      color: whiteColor
    }
  },
  map: {
    overflow: "hidden",
    width: "100%",
    height: "800px",
    position: "absolute"
  },
  contacts2: {
    padding: "0",
    height: "800px"
  },
  infoArea2: {
    padding: "0",
    margin: "0",
    "& h4": {
      fontSize: "1.0625rem",
      lineHeight: "1.55em"
    }
  }
};

export default contactsSection;
