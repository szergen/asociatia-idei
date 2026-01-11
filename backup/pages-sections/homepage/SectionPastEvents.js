import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Info from "/components/Typography/Info.js";
import Danger from "/components/Typography/Danger.js";
import Success from "/components/Typography/Success.js";
import Button from "/components/CustomButtons/Button.js";

import blogsStyle from "/styles/jss/nextjs-material-kit-pro/pages/sectionsSections/blogsStyle.js";

const useStyles = makeStyles(blogsStyle);

export default function SectionPastEvents({ ...rest }) {
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
              <h2 className={classes.title}>Past Events</h2>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <Card plain blog>
                    <CardHeader plain image>
                      <a href="#pablito" onClick={(e) => e.preventDefault()}>
                        <img src="/img/examples/card-blog4.jpg" alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage:
                            "url('/img/examples/card-blog4.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody plain>
                      <Info>
                        <h6 className={classes.cardCategory}>ENTERPRISE</h6>
                      </Info>
                      <h4 className={classes.cardTitle}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Autodesk looks to future of 3D printing with Project
                          Escher
                        </a>
                      </h4>
                      <p className={classes.description}>
                        Like so many organizations these days, Autodesk is a
                        company in transition. It was until recently a
                        traditional boxed software company selling licenses.
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          {" "}
                          Read More{" "}
                        </a>
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card plain blog>
                    <CardHeader plain image>
                      <a href="#pablito" onClick={(e) => e.preventDefault()}>
                        <img src="/img/examples/blog5.jpg" alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/examples/blog5.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody plain>
                      <Success>
                        <h6 className={classes.cardCategory}>STARTUPS</h6>
                      </Success>
                      <h4 className={classes.cardTitle}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Lyft launching cross-platform service this week
                        </a>
                      </h4>
                      <p className={classes.description}>
                        Like so many organizations these days, Autodesk is a
                        company in transition. It was until recently a
                        traditional boxed software company selling licenses.
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          {" "}
                          Read More{" "}
                        </a>
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card plain blog>
                    <CardHeader plain image>
                      <a href="#pablito" onClick={(e) => e.preventDefault()}>
                        <img src="/img/examples/blog7.jpg" alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/examples/blog7.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody plain>
                      <Danger>
                        <h6 className={classes.cardCategory}>
                          <TrendingUp />
                          ENTERPRISE
                        </h6>
                      </Danger>
                      <h4 className={classes.cardTitle}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          6 insights into the French Fashion landscape
                        </a>
                      </h4>
                      <p className={classes.description}>
                        Like so many organizations these days, Autodesk is a
                        company in transition. It was until recently a
                        traditional boxed software company selling licenses.
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          {" "}
                          Read More{" "}
                        </a>
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
