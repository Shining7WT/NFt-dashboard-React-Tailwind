import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import useDebounce from '../../Shared/UseDebounce';
import PaymentDueTable from './components/PaymentDueTable';
import { fetchMilestonesAction, updateMilestoneAction } from '../../redux/actions/MilestoneAction';
import { fetchGrantAction } from '../../redux/actions/GrantAction';
import Pagination from '../../Shared/Pagination';
import ElementModal from '../../Shared/ElementModal';
import GrantOverviewTable from '../SingleGrant/components/GrantOverviewTable';

const PaymentDue = ({
  milestones, total, loading, grant, fetchMilestones, updateMilestone, fetchGrant,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeInfo, setActiveInfo] = useState({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSTXAddress, setShowSTXAddress] = useState(false);
  const [markAsFundedModal, setMarkAsFundedModal] = useState(false);
  const [orderBy, setOrderBy] = useState('-updated_at');
  const [currentPage, setCurrentPage] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (data) => {
    if (data.length) {
      if (data[0].desc)
        setOrderBy(`-${data[0].id}`);
      else
        setOrderBy(`${data[0].id}`);
    }
  };

  const handleRowClick = (row) => {
    setActiveInfo(row.grant);
    setShowInfoModal(true);
  };

  useEffect(() => {
    fetchMilestones({
      params: {
        related: 'grant',
        ...(orderBy && {order: orderBy}),
        page: searchTerm !== '' ? 0 : currentPage,
        'filter[ready_for_funding]': true,
      },
      ...(searchTerm !== '' && {
        searchValue: searchTerm.trim(),
        'searchRelated[grant]': searchTerm.trim(),
      }),
    })
  }, [debouncedSearchTerm, currentPage, orderBy]);

  return (
    <>
      <div className="block lg:flex justify-between items-center">
        <div className="text-black font-bold text-4xl leading-10">Payments Due</div>
        <div className="flex items-center justify-start mt-5 lg:mt-0 w-auto lg:w-72 h-12 py-4 pl-5 bg-white shadow-md border border-gray-300 rounded-lg">
          <p className="text-lg text-center text-gray-800">
            <i className="far fa-search" />
          </p>
          <input type="text" className="pl-2 md:pl-5 text-base md:text-lg text-gray-600 outline-none" placeholder="Search" onChange={onSearch} />
        </div>
      </div>
      <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <PaymentDueTable
          inputData={milestones}
          handleSort={handleSort}
          loading={loading}
          setShowSTXAddress={setShowSTXAddress}
          setMarkAsFundedModal={setMarkAsFundedModal}
          handleRowClick={handleRowClick}
        />
      </div>
      <div className="mt-7 w-full inline-flex justify-end items-center">
        {
          total > 20 && (
            <Pagination
              total={total}
              dataPerPage={20}
              setCurrentPage={setCurrentPage}
              currentLength={milestones.length}
            />
          )
        }
      </div>
      {
        showInfoModal &&
        <ElementModal
          open={showInfoModal}
          component={<GrantOverviewTable grant={activeInfo} onClose={() => setShowInfoModal(false)} type="modal" />}
          onClose={() => setShowInfoModal(false)}
        />
      }
    </>
  );
};

export default connect(state => {
  return {
    milestones: state.milestones.milestones,
    total: state.milestones.total,
    loading: state.milestones.loading,
    grant: state.grants.grant,
  }
}, dispatch => {
  return {
    fetchMilestones: data => dispatch(fetchMilestonesAction(data)),
    updateMilestone: data => dispatch(updateMilestoneAction(data)),
    fetchGrant: data => dispatch(fetchGrantAction(data)),
  }
})(PaymentDue)
