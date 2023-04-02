import React, {useRef, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import PinDrop from "@material-ui/icons/PinDrop";
import emailjs from '@emailjs/browser';
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// import Phone from "@material-ui/icons/Phone";
// import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import InfoArea from "/components/InfoArea/InfoArea.js";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Button from "/components/CustomButtons/Button.js";
import SnackbarContent from "/components/Snackbar/SnackbarContent.js";
import Clearfix from "/components/Clearfix/Clearfix.js";

import contactsStyle from "/styles/jss/nextjs-material-kit-pro/pages/sectionsSections/contactsStyle.js";

const useStyles = makeStyles(contactsStyle);

export default function SectionContact({ ...rest }) {
  // const [checked, setChecked] = React.useState([]);
  // const handleToggle = (value) => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];
  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };
  const classes = useStyles();
  const form = useRef();
  const [formSubmited, setFormSubmited] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // emailjs.sendForm Params: serviceId, templateId, templateParams, userId
    emailjs.sendForm(
      'service_hnqz52d', 
      'contact_form',
      form.current,
      'eMC5J00XgHPI0IgWK'
    ).then((result) => {
      setFormSubmited(true);
      setNotification(successAlert);
      console.log(result.text);
      }, (error) => {
           setFormSubmited(true);
           setNotification(warningAlert);
          console.log(error.text);
      });
  };

  const successAlert = (
    <>
      <SnackbarContent
          message={
            <span>
              Message Sent!<br/> We will get back to you shortly.
            </span>
          }
          close
          color="success"
          icon={Check}
        />
        <Clearfix/>
        </>
  );

  const warningAlert = (
      <SnackbarContent
        message={
          <span>
            There has been an error sending your message.<br/>
            Please reach out to us via email at <a href="mailto:raluca@asociatia-idei.eu">raluca@asociatia-idei.eu</a>.
          </span>
        }
        close
        color="danger"
        icon="info_outline"
      />
  )


  return (
    <div className="cd-section" {...rest}>
      <div
        className={classes.contacts + " " + classes.section}
        style={{ backgroundImage: "url('/img/contact/bucharest.jpg')" }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={5} md={5}>
              <h2 className={classes.title}>Get in Touch</h2>
              <h5 className={classes.description}>
              Hey there! If you want to learn more about what we're doing, or even join us as a partner or supporter, we'd love to hear from you! Our awesome team is always ready and eager to chat. Just fill out the contact form and we'll get back to you in no time. We're all about making a positive impact and working with like-minded folks to drive change and make the world a better place. Let's make it happen!"
              </h5>
              <InfoArea
                className={classes.infoArea}
                title="We are based in"
                description={
                  <span>
                    Bucharest, Romania
                  </span>
                }
                icon={PinDrop}
              />
              
            </GridItem>
            <GridItem xs={12} sm={6} md={6} className={classes.mlAuto}>
              <Card className={classes.card1}>
                <form ref={form} onSubmit={handleSubmit} >
                  <CardHeader
                    contact
                    color="idei"
                    className={classes.textCenter}
                  >
                    <h4 className={classes.cardTitle}>Contact Us</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          labelText="First Name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: 'from_first_name',
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          labelText="Last Name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: 'from_last_name',
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <CustomInput
                      labelText="Email Address"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'email',
                      }}
                    />
                    <CustomInput
                      labelText="Your Message"
                      id="message"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        name: 'message',
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(1)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      classes={{ label: classes.label }}
                      label="I'm not a robot"
                    /> */}
                    <Button type="submit" color="idei" className={classes.pullRight}>
                      Send Message
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <div className={classes.notification}>
              {formSubmited && notification}
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
