function getLayoutItemModel(objectInfo, record, recordType, item) {

  var result = {};
  result.label = item.label;

  var values = [];
  var linkId;
  var linkText;
  var customLinkUrl;
  var customText;

  (item.layoutComponents || []).forEach(function (component) {

    let picklistUrl = undefined;

    // Component display info.
    if (component.componentType == 'Field') {
      var compValue = component.value;
      var fieldInfo = objectInfo.fields[compValue];

      // Picklist value URL.
      if (fieldInfo && fieldInfo.picklistValuesUrls) {
        picklistUrl = fieldInfo.picklistValuesUrls[recordType];
      }

      // Reference link.
      if (fieldInfo && fieldInfo.reference) {
        // The relationship may be absent if it amounts to null.
        if (record.fields[fieldInfo.relationshipName]) {
          var relatedData = record.fields[fieldInfo.relationshipName].value
          if (relatedData) {
            linkId = relatedData.fields.Id.value
            linkText = relatedData.fields.Name.value
          }
        }
      }

      if (fieldInfo && (fieldInfo.type == 'Datetime' || fieldInfo.type == 'DateOnly')) {
        var currValue = record.fields[compValue].value;
        var formattedData = new Date(currValue);
        values.push(
          {displayValue: formattedData,
           value: currValue,
           label:component.label,
           field:compValue,
           fieldInfo,
           picklistUrl,
           editableForNew:item.editableForNew,
           editableForUpdate:item.editableForUpdate,
           isNull:currValue == null});
      } else if (record.fields[compValue]) {
        var formattedData = record.fields[compValue].displayValue;
        var currValue = formattedData ? formattedData : record.fields[compValue].value;
        values.push(
          {displayValue: currValue,
           value: record.fields[compValue].value,
           label:component.label,
           field:compValue,
           fieldInfo,
           picklistUrl,
           editableForNew:item.editableForNew,
           editableForUpdate:item.editableForUpdate,
           isNull:currValue == null})
      } else {
        console.log('Missing expected field: ' + compValue);
      }

    } else if (component.componentType == 'CustomLink') {
      customLinkUrl = component.customLinkUrl;
      linkText = component.label;
    } else if (component.componentType == 'Canvas') {
      customText = 'Canvas: ' + component.value;
    } else if (component.componentType == 'EmptySpace') {
      customText = '';
    } else if (component.componentType == 'VisualforcePage') {
      customText = 'VF Page: ' + component.value;
    } else if (component.componentType == 'ReportChart') {
      customText = 'Report Chart: ' + component.value;
    }
  });

  result.values = values;
  result.linkId = linkId;
  result.linkText = linkText;
  result.customLinkUrl = customLinkUrl;
  result.customText = customText;

  return result;
}

function getLayoutRowModel(objectInfo, record, recordType, itemsIn) {
  var items = [];

  (itemsIn || []).forEach(function (item) {
    items.push(getLayoutItemModel(objectInfo, record, recordType, item));
  });

  var result = {
    items: items
  };
  return result;
}

function getLayoutSectionModel(objectInfo, record, recordType, section) {
  var result = {};
  result.heading = section.heading;
  result.useHeading = (section.useHeading) ? section.useHeading : false;

  var rows = [];
  (section.layoutRows || []).forEach(function (row) {
    rows.push(getLayoutRowModel(objectInfo, record, recordType, row.layoutItems));
  });

  result.rows = rows;
  return result;
}

function getLayoutModelForDefaults(defaults) {
  let objectInfo = defaults.objectInfo;
  let record = defaults.record;
  let layout = defaults.layout;

  let recordType = '012000000000000AAA'; // 'Master'
  if (record.recordTypeInfo) {
    recordType = record.recordTypeInfo.recordTypeId;
  }

  let layouts = {};
  let editValues = {};

  try {
    let modeType = layout.mode;
    let layoutType = layout.layoutType;

    layouts[layoutType] = {};

    const sections = layout.sections.map((section) => getLayoutSectionModel(objectInfo, record, recordType, section));
    sections.forEach((section) =>
      section.rows.forEach((row) =>
        row.items.forEach((item) =>
          item.values.forEach((value) =>
            editValues[value.field] = {
              original: value.value,
              current: value.value
            }))));
    layouts[layoutType][modeType] = sections;

    let result = {
      layouts,
      editValues,
      objectInfo,
      apiName: objectInfo.apiName
    };
    return result;

  } catch (err) {
    console.log('ERROR CREATING DEFAULTS LAYOUT MODEL ' + err);
    return {layouts: [], editValues: {}, objectInfo:{}, apiName:null};
  }
}

function getLayoutModel(recordView) {
  let entityEntry = recordView.layouts[Object.keys(recordView.layouts)[0]];
  let objectInfo = recordView.objectInfos[Object.keys(recordView.objectInfos)[0]];
  let record = recordView.records[Object.keys(recordView.records)[0]];

  let recordType = '012000000000000AAA'; // 'Master'
  if (record.recordTypeInfo) {
    recordType = record.recordTypeInfo.recordTypeId;
  }

  let layouts = {};
  let editValues = {};

  try {
    let recordTypeRep = entityEntry[Object.keys(entityEntry)[0]]; // TODO: support multiple record types.
    for (const layoutType of Object.keys(recordTypeRep)) {
      let layoutTypeRep = recordTypeRep[layoutType];
      for (const modeType of Object.keys(layoutTypeRep)) {
        let layoutRep = layoutTypeRep[modeType];
        if (!layouts[layoutType]) {
          layouts[layoutType] = {};
        }

        const sections = layoutRep.sections.map((section) => getLayoutSectionModel(objectInfo, record, recordType, section));

        if (modeType === 'Edit') {
          sections.forEach((section) =>
            section.rows.forEach((row) =>
              row.items.forEach((item) =>
                item.values.forEach((value) =>
                  editValues[value.field] = {
                    original: value.value,
                    current: value.value}
                ))));
        }

        layouts[layoutType][modeType] = sections;
      }
    }

    let result = {
      layouts,
      editValues,
      objectInfo,
      recordId: record.id
    };
    return result;

  } catch (err) {
    console.log('ERROR CREATING LAYOUT MODEL ' + err);
    return {layouts: [], editValues: {}, objectInfo:{}, recordId: null};
  }
}

export default {getLayoutItemModel, getLayoutRowModel, getLayoutSectionModel, getLayoutModel, getLayoutModelForDefaults}
