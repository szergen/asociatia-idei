import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardAvatar from "/components/Card/CardAvatar.js";
import CardBody from "/components/Card/CardBody.js";
import CardFooter from "/components/Card/CardFooter.js";
import Button from "/components/CustomButtons/Button.js";
import EmailIcon from '@material-ui/icons/Email';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import teamStyle from "/styles/jss/nextjs-material-kit-pro/pages/aboutUsSections/teamStyle.js";

const useStyles = makeStyles(teamStyle);

export default function SectionTeam() {
  const classes = useStyles();
  return (
    <div className={classes.team}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mrAuto,
            classes.mlAuto,
            classes.textCenter
          )}
        >
          <h2 className={classes.title}>Our Team</h2>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={3} sm={3}>
          <Card profile plain>
            <CardAvatar profile plain>
                <img
                  src="/img/team/raluca.jpg"
                  alt="Pic Raluca"
                  className={classes.img}
                />
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Raluca Ciobotaru</h4>
              <h6 className={classes.textMuted}>President / EU PROJECTS EXPERT</h6>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
            <Button justIcon simple color="linkedin" href="https://ro.linkedin.com/in/ralucaciobotaru" target="_blank">
                      <i className="fab fa-linkedin" />
                    </Button>
                    <Button justIcon simple color="facebook" href="https://facebook.com/ciobotaru.raluca/" target="_blank">
                      <i className="fab fa-facebook-square" />
                    </Button>
                    <Button justIcon simple color="youtube" href="https://instagram.com/r.l.k.208?igshid=Mzc1MmZhNjY=" target="_blank">
                      <i className="fab fa-instagram" />
                    </Button>
                    <Button justIcon simple color="facebook" href="mailto:raluca@asociatia-idei.eu" target="_blank">
                      <EmailIcon className={classes.EmailIcon}/>
                    </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
        <Card profile plain>
            <CardAvatar profile plain>
                <img
                  src="/img/team/right.jpg"
                  alt="Pic Cristina"
                  className={classes.img}
                />
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Cristina Chira</h4>
              <h6 className={classes.textMuted}>SUSTAINABILITY EXPERT</h6>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
            <Button justIcon simple color="linkedin" href="https://ro.linkedin.com/in/ralucaciobotaru" target="_blank">
                      <i className="fab fa-linkedin" />
                    </Button>
                    <Button justIcon simple color="facebook" href="https://facebook.com/ciobotaru.raluca/" target="_blank">
                      <i className="fab fa-facebook-square" />
                    </Button>
                    <Button justIcon simple color="youtube" href="https://instagram.com/r.l.k.208?igshid=Mzc1MmZhNjY=" target="_blank">
                      <i className="fab fa-instagram" />
                    </Button>
                    <Button justIcon simple color="facebook" href="mailto:raluca@asociatia-idei.eu" target="_blank">
                      <EmailIcon className={classes.EmailIcon}/>
                    </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
        <Card profile plain>
            <CardAvatar profile plain>
                <img
                  src="/img/team/right.jpg"
                  alt="Pic Catalin"
                  className={classes.img}
                />
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Catalin Sirbu</h4>
              <h6 className={classes.textMuted}>WEB DESIGNER</h6>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
            <Button justIcon simple color="linkedin" href="https://ro.linkedin.com/in/ralucaciobotaru" target="_blank">
                      <i className="fab fa-linkedin" />
                    </Button>
                    <Button justIcon simple color="facebook" href="https://facebook.com/ciobotaru.raluca/" target="_blank">
                      <i className="fab fa-facebook-square" />
                    </Button>
                    <Button justIcon simple color="youtube" href="https://instagram.com/r.l.k.208?igshid=Mzc1MmZhNjY=" target="_blank">
                      <i className="fab fa-instagram" />
                    </Button>
                    <Button justIcon simple color="facebook" href="mailto:raluca@asociatia-idei.eu" target="_blank">
                      <EmailIcon className={classes.EmailIcon}/>
                    </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
        <Card profile plain>
            <CardAvatar profile plain>
                <img
                  src="/img/team/right.jpg"
                  alt="Pic Claudia"
                  className={classes.img}
                />
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Claudia Mihaela Calciu</h4>
              <h6 className={classes.textMuted}>PROJECTS SPECIALIST</h6>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
            <Button justIcon simple color="linkedin" href="https://ro.linkedin.com/in/ralucaciobotaru" target="_blank">
                      <i className="fab fa-linkedin" />
                    </Button>
                    <Button justIcon simple color="facebook" href="https://facebook.com/ciobotaru.raluca/" target="_blank">
                      <i className="fab fa-facebook-square" />
                    </Button>
                    <Button justIcon simple color="youtube" href="https://instagram.com/r.l.k.208?igshid=Mzc1MmZhNjY=" target="_blank">
                      <i className="fab fa-instagram" />
                    </Button>
                    <Button justIcon simple color="facebook" href="mailto:raluca@asociatia-idei.eu" target="_blank">
                      <EmailIcon className={classes.EmailIcon}/>
                    </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
