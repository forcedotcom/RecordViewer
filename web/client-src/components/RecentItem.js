import React, { PropTypes } from 'react';

// Component that displays a recent item and supports a hook for handling a click.
const RecentItem = ({onClick, item, index}) => {

  return (
    <div onClick={onClick} key={'recentItemBox' + index}>
      {item.Name &&
        <label style={{"cursor":"pointer"}} key={'recentItemName' + index}>{item.Name}</label>}
      {item.CaseNumber &&
        <label style={{"cursor":"pointer"}} key={'recentItemCaseNumber' + index}>Case {item.CaseNumber}</label>}
    </div>
  )
}

RecentItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default RecentItem
