function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Select from '../select';

var MiniSelect = function MiniSelect(props) {
  return /*#__PURE__*/React.createElement(Select, _extends({
    size: "small"
  }, props));
};

MiniSelect.Option = Select.Option;
export default MiniSelect;