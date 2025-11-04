import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import descriptionStyle from "/styles/jss/nextjs-material-kit-pro/pages/aboutUsSections/descriptionStyle.js";

const useStyles = makeStyles(descriptionStyle);

export default function SectionDescription() {
  const classes = useStyles();
  return (
    <div className={classNames(classes.aboutDescription, classes.textCenter)}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(classes.mrAuto, classes.mlAuto)}
        >
          <h5 className={classes.description}>
            Proiectul a fost finanțat prin programul Efectiv Civic, derulat de
            Fundația pentru Dezvoltarea Societății Civile (FDSC) în parteneriat
            cu Romanian-American Foundation (RAF) și cu sprijinul Centrului
            pentru Jurnalism Independent (CJI). <br />
            <br />
            Proiectul a abordat problema alfabetizării media în rândul
            tinerilor, cu o focalizare clară pe combaterea dezinformării și a
            discursului instigator la ură – fenomene care afectează profund
            coeziunea socială și calitatea dialogului public în societatea
            contemporană. Scopul principal a fost creșterea gradului de
            alfabetizare media și dezvoltarea competențelor soft esențiale
            pentru consumul și producția responsabilă de informație digitală, în
            rândul a peste 300 de tineri din România, cu vârste între 15 și 29
            de ani. <br />
            <br />
            Proiectul a răspuns unei nevoi stringente: combaterea efectelor
            dezinformării, bulelor informaționale și a discursului instigator la
            ură, contribuind la formarea unor cetățeni mai informați, empatici
            și responsabili. <br />
            <br />
            <strong>Ce am realizat prin proiect:</strong>
            <ul>
              <li>
                A fost dezvoltat un cadru de competențe soft adaptat nevoilor
                tinerilor din România, inspirat din bune practici
                internaționale, care include: gândire critică, responsabilitate,
                performanță, respect social, curiozitate, inspirație și
                bunăstare emoțională. Acest cadru a fundamentat întregul proces
                educațional.{" "}
              </li>
              <li>
                A fost elaborat un material educațional digital, structurat pe
                grupe de vârstă și teme relevante, care tratează subiecte precum
                dezinformarea, algoritmii, identitatea digitală și discursul
                instigator la ură. Acest material este disponibil gratuit pe
                site-ul Asociației IDEI și poate fi folosit ca resursă deschisă
                în alte inițiative educaționale.
              </li>
              <li>
                Peste 300 de tineri din județul Botoșani au participat la
                ateliere interactive organizate în școli și licee, unde au
                învățat cum să recunoască manipularea online, să navigheze cu
                discernământ în social media și să creeze conținut digital
                responsabil.
              </li>
            </ul>
            <strong>Resurse:</strong>
            <ul>
              <li>
                <a
                  href="/img/Scroll Control - Busola media pentru Tineri.pptx"
                  target="_blank"
                >
                  Prezentare Scroll Control (PPTX)
                </a>
              </li>
              <li>
                <a href="/img/brosura.pdf" target="_blank">
                  Caietul de lucru Scroll Control (PDF)
                </a>
              </li>
              <li>
                <a
                  href="/img/projects/web_v2 _full_v2_optimized.jpeg"
                  target="_blank"
                >
                  Infografic (JPG)
                </a>
              </li>
            </ul>
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
}
