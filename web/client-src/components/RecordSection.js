import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import RecordRow from './RecordRow';

// Component that displays a Record section.
const RecordSection = ({section, error, editValues, picklists, onFieldValueUpdate, allowEdit, index, objectInfo, onEditDepGraph, uiMode, recordView}) => {

  return (
    <tbody>
      { section.useHeading &&
       <tr>
         <td colSpan="4" key={'sectionHeading' + index} className="slds-text-heading--small slds-p-left--medium slds-p-top--small slds-p-bottom--medium">
           {section.heading}
         </td>
       </tr>
      }
      {section.rows.map((row, i) =>
        <RecordRow
          key={'sectionRow' + index + ',' + i}
          allowEdit={allowEdit}
          uiMode={uiMode}
          picklists={picklists}
          onFieldValueUpdate={onFieldValueUpdate}
          error={error}
          editValues={editValues}
          row={row}
          sectionIndex={index}
          rowIndex={i} 
          objectInfo={objectInfo}
          recordView={recordView}
          onEditDepGraph={onEditDepGraph}/>
      )}
   </tbody>
  );
}

RecordSection.propTypes = {
  error: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  objectInfo: PropTypes.object.isRequired,
  editValues: PropTypes.object.isRequired,
  picklists: PropTypes.object,
  uiMode: PropTypes.string.isRequired,
  allowEdit: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  onEditDepGraph: PropTypes.func.isRequired,
  recordView: PropTypes.object.isRequired,
}

export default RecordSection
