import React from "react";

import { Container, Header } from "semantic-ui-react";
import Configurator from "../Configurator/Configurator";

function ConfiguratorContainer() {
  const [open, setOpen] = React.useState(false);

  return (
    <Container className="center aligned" style={{ padding: "80px" }}>
      <Header as="h5">Pritisnite gumb niže kako biste pokrenuli</Header>
      <Configurator open={open} setOpen={setOpen}></Configurator>
    </Container>
  );
}

export default ConfiguratorContainer;
