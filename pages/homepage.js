/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
// import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import homepageStyle from "/styles/jss/nextjs-material-kit-pro/pages/homepageStyle.js";

// Sections for this page
// import SectionProduct from "/pages-sections/homepage/SectionProduct.js";
import SectionTeam from "/pages-sections/homepage/SectionTeam.js";
import SectionProjects from '/pages-sections/homepage/SectionProjects.js';
import SectionFutureEvents from '/pages-sections/homepage/SectionFutureEvents.js';
// import SectionPastEvents from '/pages-sections/homepage/SectionPastEvents.js';
// import SectionBlogPosts from '/pages-sections/homepage/SectionBlogPosts.js';
import SectionContact from '/pages-sections/homepage/SectionContact.js';

const useStyles = makeStyles(homepageStyle);

export default function Homepage({ ...rest }) {
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
          height: 300,
          color: "idei"
        }}
        {...rest}
      />
      <Parallax image="/img/idei-hero-image.jpg" filter="dark">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <h1 className={classes.title}>SHAPING <br/>
              <span className={classes.highlight}>FUTURE LEADERS</span> IN SUSTAINABILITY</h1>
              <h4>
              We empower young people to become leaders in sustainability by providing educational opportunities and resources that foster a deep understanding of environmental stewardship, social responsibility and economic viability.
              </h4>
              <br />
              {/* Make it a Link element */}
              <Button
                color="danger"
                size="lg"
                href="/about-us"
                target="_blank"
              >
                <i className="fas fa-play" />
                About Us
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* <SectionProduct /> */}
          <SectionTeam />
          <SectionProjects />
          <SectionFutureEvents />
          {/* <SectionPastEvents /> */}
          {/* <SectionBlogPosts /> */}
          <SectionContact />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/"
                    className={classes.block}
                  >
                    Asociatia IDEI
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/about-us"
                    target="_blank"
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="#:~:text=Get%20in-,Touch,-Hey%20there!%20If"
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
