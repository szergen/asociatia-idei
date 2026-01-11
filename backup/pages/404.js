/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";

import errorPageStyle from "/styles/jss/nextjs-material-kit-pro/pages/errorPageStyles.js";

const useStyles = makeStyles(errorPageStyle);

export default function ErrorPage({ ...rest }) {
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
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/clint-mckoy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        {/* <div className={classes.container}> */}
        <div className={classes.contentCenter}>
          <GridContainer>
            <GridItem md={12}>
              <h1 className={classes.title}>404</h1>
              <h2 className={classes.subTitle}>Page not found :(</h2>
              <h4 className={classes.description}>
                Ooooups! Looks like you got lost.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
        {/* </div> */}
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
