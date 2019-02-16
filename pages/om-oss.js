import Container from "react-bootstrap/Container";
import InfoIcon from "@material-ui/icons/Info";

export default () => (
  <Container>
    <div className="text-center font-weight-light">
      <InfoIcon style={{ fontSize: "2.5rem" }} />
      <h1>Om oss</h1>
    </div>
    <p>
      Partiguiden.nu skapades med syftet av att kunna erbjuda en plattform där
      man lätt kan kolla upp partiernas ståndpunkter i olika ämnen och
      sakfrågor. Under utvecklingen av hemsidan togs det hänsyn till
      begriplighet och användarvänlighet för att kunna erbjuda den bästa möjliga
      användarupplevensen.
    </p>
    <p>
      Utvecklingen av sidan påbörjades som ett fritidsprojekt år 2017 för att
      utveckla kunskaper inom webbutveckling.
    </p>
    <p>
      Informationen som presenteras på sidan är utvald information från
      partiernas egna hemsidor.
    </p>
  </Container>
);
