import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import RecordRow from './RecordRow';

// Component that displays a Record section.
const RecordSection = ({section, error, editValues, picklists, onFieldValueUpdate, onFetchPicklist, allowEdit, index}) => {

  return (
    <tbody>
      { section.useHeading &&
       <tr>
         <td colSpan="4" key={'sectionHeading' + index} className="slds-text-heading--small slds-p-left--medium slds-p-top--small slds-p-botom--medium">
           {section.heading}
         </td>
       </tr>
      }
      {section.rows.map((row, i) =>
        <RecordRow
          key={'sectionRow' + index + ',' + i}
          allowEdit={allowEdit}
          picklists={picklists}
          onFieldValueUpdate={onFieldValueUpdate}
          onFetchPicklist={onFetchPicklist}
          error={error}
          editValues={editValues}
          row={row}
          sectionIndex={index}
          rowIndex={i} />
      )}
   </tbody>
  );
}

RecordSection.propTypes = {
  error: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  editValues: PropTypes.object.isRequired,
  picklists: PropTypes.object.isRequired,
  allowEdit: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  onFetchPicklist: PropTypes.func.isRequired
}

export default RecordSection
