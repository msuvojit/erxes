import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'meteor/erxes-notifier';
import { ModalTrigger, Tip, ActionButtons } from '/imports/react-ui/common';
import { KbGroup } from '../containers';

const propTypes = {
  kbGroup: PropTypes.object.isRequired,
  removeKbGroup: PropTypes.func.isRequired,
};

class Row extends Component {
  constructor(props) {
    super(props);

    this.removeKbGroup = this.removeKbGroup.bind(this);
  }

  removeKbGroup() {
    if (!confirm('Are you sure?')) return; // eslint-disable-line

    const { kbGroup, removeKbGroup } = this.props;

    removeKbGroup(kbGroup._id, error => {
      if (error) {
        return Alert.error("Can't delete a integration", error.reason);
      }

      return Alert.success('Congrats', 'Integration has deleted.');
    });
  }

  renderExtraLinks() {
    const kbGroup = this.props.kbGroup;
    const kind = kbGroup.kind;

    const editTrigger = (
      <Button bsStyle="link">
        <Tip text="Edit"><i className="ion-edit" /></Tip>
      </Button>
    );

    return (
      <div style={{ display: 'inline-block' }}>
        <ModalTrigger title="Edit integration" trigger={editTrigger}>
          <Messenger kbGroup={kbGroup} />
        </ModalTrigger>
      </div>
    );

    return null;
  }

  render() {
    const kbGroup = this.props.kbGroup;

    return (
      <tr>
        <td>{kbGroup.name}</td>
        <td>{kbGroup.kind}</td>
        <td>{kbGroup.brand().name}</td>

        <td className="text-right">
          <ActionButtons>
            {this.renderExtraLinks()}

            <Tip text="Delete">
              <Button bsStyle="link" onClick={this.removeKbGroup}>
                <i className="ion-close-circled" />
              </Button>
            </Tip>
          </ActionButtons>
        </td>
      </tr>
    );
  }
}

Row.propTypes = propTypes;

export default Row;
