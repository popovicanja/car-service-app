import React from "react";

import { Container, Grid, Image } from "semantic-ui-react";

import styles from "./Nav.module.scss";

function Nav() {
  return (
    <div className={styles.nav__container}>
      <Container>
        <Grid>
          <Grid.Row className="middle aligned center">
            <Grid.Column width={3}>
              <Image src="tokic-logo.jpg" />
            </Grid.Column>
            <Grid.Column width={8}>
              <div className={styles.title}>Konfigurator servisa </div>
              <div className={styles.subtitle}>Izračunajte trošak servisa</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Nav;
