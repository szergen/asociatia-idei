/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "next/link";
// @material-ui/icons
// import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Parallax from "/components/Parallax/Parallax.js";
import Footer from "/components/Footer/Footer.js";
// sections for this page
import SectionDescription from "/pages-sections/about-us/SectionDescription.js";
import SectionTeam from "/pages-sections/about-us/SectionTeam.js";
// import SectionServices from "/pages-sections/about-us/SectionServices.js";
// import SectionOffice from "/pages-sections/about-us/SectionOffice.js";
// import SectionContact from "/pages-sections/about-us/SectionContact.js";

import aboutUsStyle from "/styles/jss/nextjs-material-kit-pro/pages/aboutUsStyle.js";

// import styles
const useStyles = makeStyles(aboutUsStyle);

export default function AboutUsPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
         color="transparent"
         logo="/img/logo-inverted.png"
         links={<HeaderLinks dropdownHoverColor="info" />}
         fixed
         changeColorOnScroll={{
           height: 200,
           color: "idei"
         }}
      />
      <Parallax image="/img/bg9.jpg" filter="dark" small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>About Us</h1>
              <h4>
                IDEI is dedicated to empowering individuals across Europe to become leaders in environmental sustainability and digital education.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionDescription />
          <SectionTeam />
          {/* <SectionServices />
          <SectionOffice />
          <SectionContact /> */}
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                  <Link
                    href="/"
                  >
                    <span className={classes.block}>Asociatia IDEI</span>
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link
                    href="/about-us"
                    target="_blank"
                  >
                    <span className={classes.block}>About us</span>
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/#:~:text=Get%20in-,Touch,-Hey%20there!%20If"
                    className={classes.block}
                  >
                    Contact Us
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()}&nbsp;
              Asociatia IDEI - Initiative si Demersuri Educationale si Inovatoare
            </div>
          </div>
        }
      />
    </div>
  );
}
