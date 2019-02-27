import { Link } from "../lib/routes";
import ButtonBase from "@material-ui/core/ButtonBase";

export default class ListObject extends React.Component {
  render() {
    let subjects = this.props.subjects;
    let letter = this.props.letter;
    let oddNumber = subjects.length % 2;
    return (
      <React.Fragment>
        <div className="letter text-light text-center w-100">
          <header>{letter}</header>
        </div>
        <div className="list">
          {subjects.map(subject => (
            <ButtonBase
              className="list-object standpoint-subject"
              key={`${subject.id}`}
            >
              <Link route="subject" params={{ id: `${subject.id}` }}>
                <a className="text-dark">
                  <span>{subject.name}</span>
                </a>
              </Link>
            </ButtonBase>
          ))}
          {oddNumber === 1 && <div className="empty-col" />}
        </div>
      </React.Fragment>
    );
  }
}
