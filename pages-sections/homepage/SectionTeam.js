import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import  from "@material-ui/icons/";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
// import CardFooter from "/components/Card/CardFooter.js";
// import Muted from "/components/Typography/Muted.js";
// import Button from "/components/CustomButtons/Button.js";
// import EmailIcon from '@material-ui/icons/Email';

import teamsStyle from "/styles/jss/nextjs-material-kit-pro/pages/sectionsSections/teamsStyle.js";
import teamStyle from "/styles/jss/nextjs-material-kit-pro/pages/landingPageSections/teamStyle.js";

const style = {
  ...teamsStyle,
  ...teamStyle,
  justifyContentCenter: {
    justifyContent: "center"
  }
};

const useStyles = makeStyles(style);

export default function SectionTeam() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Areas of work</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                      <img
                        src="/img/team/capacity_building.jpg"
                        alt="Pic of Capacity Building"
                      />
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage:
                          "url('/img/team/capacity_building.jpg')",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>CAPACITY BUILDING</h4>
                    {/* <Muted>
                      <h6 className={classes.cardCategory}>EU PROJECTS EXPERT</h6>
                    </Muted> */}
                    <p className={classes.description}>
                    We work closely with youth serving organizations and other grassroot organisations to enhance their capabilities in digital transformation, environmental sustainability, and other relevant areas.
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                      <img
                        src="/img/team/youth_employment.jpg"
                        alt="Pic Youth Employment"
                      />
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage:
                          "url('/img/team/youth_employment.jpg')",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Youth Employment and Entrepreneurship</h4>
                    <p className={classes.description}>
                    Our initiatives and projects promote job opportunities for young people.and enhance their entrepreneurial spirit and prospects.
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                      <img
                        src="/img/team/social_inclusion.jpg"
                        alt="Photo by William White on Unsplash"
                      />
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage:
                          "url('/img/team/social_inclusion.jpg')",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Social Inclusion and Equal Opportunities</h4>
                    <p className={classes.description}>
                    We work to ensure that all young people, regardless of their background or circumstances, have equal access to opportunities and resources for personal and professional development.
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                      <img
                        src="/img/team/civic_engagement.jpg"
                        alt="Photo by William White on Unsplash"
                      />
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage:
                          "url('/img/team/civic_engagement.jpg')",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Youth Participation and Civic Engagement</h4>
                    <p className={classes.description}>
                    We encourage young people to take an active role in shaping their communities and society at large.
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
