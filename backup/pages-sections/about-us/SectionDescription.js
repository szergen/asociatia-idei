import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import descriptionStyle from "/styles/jss/nextjs-material-kit-pro/pages/aboutUsSections/descriptionStyle.js";

const useStyles = makeStyles(descriptionStyle);

export default function SectionDescription() {
  const classes = useStyles();
  return (
    <div className={classNames(classes.aboutDescription, classes.textCenter)}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(classes.mrAuto, classes.mlAuto)}
        >
          <h5 className={classes.description}>
          Our mission is to provide educational opportunities and resources that foster a deep understanding of sustainable practices and the development of digital skills for the future. We inspire and equip young people with the knowledge, skills, and values necessary to create a more just and environmentally responsible world. <br/><br/>
          We envision a future where young people are empowered with the digital skills and knowledge necessary to actively engage in the transition to a low-carbon, circular, and resource-efficient economy. Our vision is a world where the next generation of leaders drive positive change within their communities and beyond, shaping a more just, environmentally responsible, and interconnected society.
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
}
