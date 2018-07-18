import React, { PropTypes } from 'react'

import RecentItem from './RecentItem'

// Component that displays a list of recent items and supports a hook for handling a click
// on one of them.
const RecentItemList = ({onClick, recentItems}) => {

  return (
    <div className="slds-m-around--large" style={{"textAlign":"center"}}>
      <div style={{"display":"inline-block","textAlign":"left"}}>
        <label className="slds-text-heading--medium slds-p-bottom--medium">Recent Items</label>
        {recentItems.recentItems.map((recentItem, index) =>
          <RecentItem
            index={index}
            key={'RecentItem' + recentItem.Id}
            onClick={() => onClick(recentItem.Id)}
            item={recentItem} />
        )}
      </div>
    </div>
  )
}

RecentItemList.propTypes = {
  onClick: PropTypes.func.isRequired,
  recentItems: PropTypes.object.isRequired
}

export default RecentItemList
