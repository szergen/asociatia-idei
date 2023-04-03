import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Info from "/components/Typography/Info.js";
// import Danger from "/components/Typography/Danger.js";
import Success from "/components/Typography/Success.js";

import blogsStyle from "/styles/jss/nextjs-material-kit-pro/pages/sectionsSections/blogsStyle.js";
import { ArrowBack, ArrowForward, Warning } from "@material-ui/icons";

const useStyles = makeStyles(blogsStyle);

export default function SectionFutureEvents({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={10}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <h2 className={classes.title}>Events & Activities</h2>
              
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <Card plain blog className={classes.cardEvents}>
                    <CardHeader plain image>
                        <img src="/img/projects/yetti.jpg" alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage:
                            "url('/img/projects/yetti.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody plain>
                      <Info>
                        <h6 className={classes.cardCategory}>
                        <ArrowForward /> YETI</h6>
                      </Info>
                      <h4 className={classes.cardTitle}>
                          European YETI training, Romania
                      </h4>
                      <p className={classes.description}>
                      The European YETI training aims to gather young people, youth educators, professionals and other relevant stakeholders in the eco-tourism industry to test our intellectual outputs and to enable exploitation of our project results. The event will take place in Brasov, Romania in April 2023.
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card plain blog className={classes.cardEvents}>
                    <CardHeader plain image>
                        <img src="/img/projects/yetti.jpg" alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/projects/yetti.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody plain>
                      <Info>
                        <h6 className={classes.cardCategory}>
                        <ArrowForward />
                          YETI</h6>
                      </Info>
                      <h4 className={classes.cardTitle}>
                        European YETI Multiplier Event
                      </h4>
                      <p className={classes.description}>
                      This is a dissemination event to publicly present all the results of the "European Yeti" project and to increase the visibility and adoption of our results among tourism, environment and youth organisations.
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card plain blog className={classes.cardEvents}>
                    <CardHeader plain image>
                        <img src="/img/projects/fit2.jpg" alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/projects/fit2.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody plain>
                      <Success>
                        <h6 className={classes.cardCategory}>
                          <ArrowBack />
                          Youth-Fit-For-55
                        </h6>
                      </Success>
                      <h4 className={classes.cardTitle}>
                        Youth-fit-for-55 Kick-off meeting
                      </h4>
                      <p className={classes.description}>
                       The Youth fit for 55 project, a collaborative effort between 6 organizations from 5 partner countries, has officially kicked off. During a recent meeting in Bordeaux, France, the consortium came together to discuss the project's rationale and plan their next steps.
                      <br/>
                      Stay tuned for updates on our progress and follow the hashtag <b>#YouthFitFor55</b> for more information.
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
