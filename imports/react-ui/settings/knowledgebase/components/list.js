import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import Sidebar from '../../Sidebar';
import Row from './row';

const propTypes = {
  kbGroups: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  removeKbGroup: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

class List extends Component {
  constructor(props) {
    super(props);

    this.renderKbGroups = this.renderKbGroups.bind(this);
  }

  renderKbGroups() {
    const { brands, kbGroups, removeKbGroup } = this.props;

    return kbGroups.map(kbGroup => (
      <Row key={kbGroup._id} kbGroup={kbGroup} brands={brands} removeKbGroup={removeKbGroup} />
    ));
  }

  render() {
    const { loadMore, hasMore } = this.props;

    const actionBarLeft = (
      <Button bsStyle="link" href={FlowRouter.path('settings/integrations/add')}>
        <i className="ion-plus-circled" /> Add group
      </Button>
    );

    const actionBar = <Wrapper.ActionBar left={actionBarLeft} />;

    const content = (
      <Pagination loadMore={loadMore} hasMore={hasMore}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>Brand</th>
              <th width="183" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderKbGroups()}
          </tbody>{' '}
        </Table>
      </Pagination>
    );

    const breadcrumb = [
      { title: 'Settings', link: '/settings/integrations' },
      { title: 'Integrations' },
    ];

    return (
      <div>
        <Wrapper
          header={<Wrapper.Header breadcrumb={breadcrumb} />}
          leftSidebar={<Sidebar />}
          actionBar={actionBar}
          content={content}
        />
      </div>
    );
  }
}

List.propTypes = propTypes;

export default List;
