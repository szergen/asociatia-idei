import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import Info from "/components/Typography/Info.js";
import Danger from "/components/Typography/Danger.js";
import Success from "/components/Typography/Success.js";

import blogsStyle from "/styles/jss/nextjs-material-kit-pro/pages/sectionsSections/blogsStyle.js";

const useStyles = makeStyles(blogsStyle);

export default function SectionBlogPosts({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={10}
              md={10}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <h2 className={classes.title}>Latest Blogposts 3</h2>
              <br />
              <Card plain blog className={classes.card}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <CardHeader image plain>
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
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage:
                            "url('/img/examples/card-blog4.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={8}>
                    <Info>
                      <h6 className={classes.cardCategory}>ENTERPRISE</h6>
                    </Info>
                    <h3 className={classes.cardTitle}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Autodesk looks to future of 3D printing with Project
                        Escher
                      </a>
                    </h3>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a
                      company in transition. It was until recently a traditional
                      boxed software company selling licenses. Today, it’s
                      moving to a subscription model. Yet its own business model
                      disruption is only part of the story — and…
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                    <p className={classes.author}>
                      by{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <b>Mike Butcher</b>
                      </a>{" "}
                      , 2 days ago
                    </p>
                  </GridItem>
                </GridContainer>
              </Card>
              <Card plain blog className={classes.card}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <CardHeader image plain>
                      <a href="#pablito" onClick={(e) => e.preventDefault()}>
                        <img src="/img/office2.jpg" alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/office2.jpg')",
                          opacity: "1"
                        }}
                      />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/office2.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={8}>
                    <Danger>
                      <h6 className={classes.cardCategory}>
                        <TrendingUp />
                        TRENDING
                      </h6>
                    </Danger>
                    <h3 className={classes.cardTitle}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        6 insights into the French Fashion landscape
                      </a>
                    </h3>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a
                      company in transition. It was until recently a traditional
                      boxed software company selling licenses. Today, it’s
                      moving to a subscription model. Yet its own business model
                      disruption is only part of the story — and…
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                    <p className={classes.author}>
                      by{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <b>Mike Butcher</b>
                      </a>{" "}
                      , 2 days ago
                    </p>
                  </GridItem>
                </GridContainer>
              </Card>
              <Card plain blog className={classes.card}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <CardHeader image plain>
                      <a href="#pablito" onClick={(e) => e.preventDefault()}>
                        <img src="/img/examples/blog8.jpg" alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/examples/blog8.jpg')",
                          opacity: "1"
                        }}
                      />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: "url('/img/examples/blog8.jpg')",
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={8}>
                    <Success>
                      <h6 className={classes.cardCategory}>STARTUPS</h6>
                    </Success>
                    <h3 className={classes.cardTitle}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Lyft launching cross-platform service this week
                      </a>
                    </h3>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a
                      company in transition. It was until recently a traditional
                      boxed software company selling licenses. Today, it’s
                      moving to a subscription model. Yet its own business model
                      disruption is only part of the story — and…
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                    <p className={classes.author}>
                      by{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <b>Megan Rose</b>
                      </a>{" "}
                      , 2 days ago
                    </p>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
