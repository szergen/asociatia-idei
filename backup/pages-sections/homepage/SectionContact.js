import React, {useRef, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Joi from 'joi-browser';
// import ReactJoiValidations from 'react-joi-validation'
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import PinDrop from "@material-ui/icons/PinDrop";
import emailjs from '@emailjs/browser';
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
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
// ReactJoiValidations.setJoi(Joi);

const schema = {
  from_first_name: Joi.string().required(),
  from_last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
};

export default function SectionContact({ ...props }) {
  const classes = useStyles();
  const form = useRef();
  const [formSubmited, setFormSubmited] = useState(false);
  const [notification, setNotification] = useState(null);
  const [justLanded, setJustLanded] = useState(true);
  const [formData, setFormData] = useState({
    from_first_name: '',
    from_last_name: '',
    email: '',
    message: '',
    errors: {}
  });
  
  const validatePropery = (name, value, schema) => {
    const obj = {
        [name]: value
    };
    const fieldSchema = {
        [name]: schema[name]
    };
    //return result
    const result = Joi.validate(obj, fieldSchema);
    setFormData({
      ...formData,
      [name]: value,
      errors: {
        ...formData.errors,
        [name]: result.error?.details[0]?.message
      }
    })
    if(justLanded) {
      setJustLanded(false);
    }
    // result.error === null -> valid
}

  const handleSubmit = (event) => {
    event.preventDefault();
    // emailjs.sendForm Params: serviceId, templateId, templateParams, userId
    if(!checkErrors(formData.errors)) {
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
    }
  };

  const checkErrors = (errors) => {
    // check if the errors object has any null values
    return Object.values(errors).some(err => err !== null && err !== undefined);
  }

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
    <div className="cd-section" {...props}>
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
                          labelText="*First Name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: 'from_first_name',
                            onChange: (e) => validatePropery(e.target.name, e.target.value, schema),
                            onBlur: (e) => validatePropery(e.target.name, e.target.value, schema),
                            error: formData.errors.from_first_name
                          }}
                        />
                       {/* <span className={classes.errorMsg}>{formData.errors?.from_first_name?.replace("from_first_name", "First Name")}</span> */}
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          labelText="*Last Name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: 'from_last_name',
                            onChange: (e) => validatePropery(e.target.name, e.target.value, schema),
                            onBlur: (e) => validatePropery(e.target.name, e.target.value, schema),
                            error: formData.errors.from_last_name,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <CustomInput
                      labelText="*Email Address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'email',
                        onChange: (e) => validatePropery(e.target.name, e.target.value, schema),
                        onBlur: (e) => validatePropery(e.target.name, e.target.value, schema),
                        error: formData.errors.email
                      }}
                    />
                    <CustomInput
                      labelText="*Your Message"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        name: 'message',
                        onChange: (e) => validatePropery(e.target.name, e.target.value, schema),
                        onBlur: (e) => validatePropery(e.target.name, e.target.value, schema),
                        error: formData.errors.message
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <Button type="submit" color="idei" className={classes.pullRight} disabled={justLanded || checkErrors(formData.errors)}>
                      Send Message
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <div className={classes.notification}>
                {checkErrors(formData.errors) && (
                  <span className={classes.errorMsg}>
                  <p>{formData.errors?.from_first_name?.replace("from_first_name", "First Name")}</p>
                  <p>{formData.errors?.from_last_name?.replace("from_last_name", "Last Name")}</p>
                  <p>{formData.errors?.email?.replace("email", "Email")}</p>
                  <p>{formData.errors?.message?.replace("message", "Message")}</p>
                  </span>
                )}
              {formSubmited && notification}
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}