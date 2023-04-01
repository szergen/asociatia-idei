/* eslint-disable */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Build from "@material-ui/icons/Build";
import Subject from "@material-ui/icons/Subject";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import NavPills from "/components/NavPills/NavPills.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";

import projectsStyle from "/styles/jss/nextjs-material-kit-pro/pages/sectionsSections/projectsStyle.js";

const useStyles = makeStyles(projectsStyle);

export default function SectionProjects({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={8}
              md={8}
              className={
                classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
              }
            >
              <h2 className={classes.title}>
                Projects
              </h2>
              {/* <NavPills
                alignCenter
                color="rose"
                tabs={[
                  { tabButton: "All", tabContent: "" },
                  { tabButton: "Marketing", tabContent: "" },
                  { tabButton: "Development", tabContent: "" },
                  { tabButton: "Productivity", tabContent: "" },
                  { tabButton: "Web Design", tabContent: "" }
                ]}
              /> */}
              {/* <div className={classes.tabSpace} /> */}
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <Card
                raised
                background
                style={{ backgroundImage: "url('/img/projects/yetti.jpg')" }}
              >
                <CardBody background>
                  <h6 className={classes.cardCategory}>ECO-TOURISM</h6>
                  <a href="#pablito" onClick={(e) => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>
                    European YETI
                    </h3>
                    <h4 className={classes.cardTitleWhite}>
                    European Youth Eco-tourism Initiatives 
                    </h4>
                  </a>
                  <p className={classes.cardDescription}>
                  European YETI is a European project aiming to develop the young people’s skills who want to work in the field of eco-tourism and support them in their commitment to share and value Europe in a more sustainable way.
                  </p>
                  <Button round color="idei" href="https://european-yeti.eu/" target="_blank">
                    <Icon>content_copy</Icon> View Project
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card
                raised
                background
                style={{
                  backgroundImage: "url('/img/projects/ydsi.jpg')"
                }}
              >
                <CardBody background>
                  <h6 className={classes.cardCategory}>DIGITAL INNOVATION</h6>
                  <a href="#pablito" onClick={(e) => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>
                    YDSI
                    </h3>
                    <h4 className={classes.cardTitleWhite}>
                    Young Digital Social Innovators
                    </h4>
                  </a>
                  <p className={classes.cardDescription}>
                  Young Digital Social Innovators aims to empower young people to become confident social innovators making the most of digital technology available to them by modernising youth work curricula and practice so ...
                  </p>
                  <Button round color="idei" href="https://www.ydsi.eu/" target="_blank">
                    <Icon>content_copy</Icon>
                    View Project
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card
                raised
                background
                style={{
                  backgroundImage: "url('/img/projects/fit.jpg')"
                }}
              >
                <CardBody background className={classes.longCard}>
                  <h6 className={classes.cardCategory}>SUSTAINABILITY</h6>
                  <a href="#pablito" onClick={(e) => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>
                    Youth-fit-for-55
                    </h3>
                    <h4 className={classes.cardTitleWhite}>
                    Youth engagement and education for realising the Green Deal on the “fit for 55” wave
                    </h4>
                  </a>
                  <p className={classes.cardDescription}>
                  The general objective of Youth-fit-for-55 project is to build the knowledge base (integrating expertise and stimulating creativity and innovation), substantiate the mechanisms, develop the skills of young people across Europe and the organisational capacity of youth serving organisations for getting involved with and driving the green transition, in a fully-fledged learning cycle that will be starting off from raising awareness with the underpinning ideas that the transition process is new and challenging and that embedding green transition principles in youth serving organisations` practice requires a broad, sustained dialogue.
                  </p>
                  {/* <Button round color="idei">
                  <Icon>content_copy</Icon> View Project
                  </Button> */}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
