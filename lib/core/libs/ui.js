'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elementUi = require('element-ui');

var _table = require('components/maxilo/data/table.vue');

var _table2 = _interopRequireDefault(_table);

var _tree = require('components/maxilo/data/tree.vue');

var _tree2 = _interopRequireDefault(_tree);

var _maxiloTable = require('components/maxilo/data/maxilo-table.vue');

var _maxiloTable2 = _interopRequireDefault(_maxiloTable);

var _map = require('components/maxilo/layout/map.vue');

var _map2 = _interopRequireDefault(_map);

var _docker = require('components/maxilo/layout/docker.vue');

var _docker2 = _interopRequireDefault(_docker);

var _modal = require('components/maxilo/other/modal.vue');

var _modal2 = _interopRequireDefault(_modal);

var _vhelp = require('components/maxilo/other/vhelp.vue');

var _vhelp2 = _interopRequireDefault(_vhelp);

var _loading = require('components/maxilo/other/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _fileList = require('components/maxilo/other/fileList.vue');

var _fileList2 = _interopRequireDefault(_fileList);

var _tab = require('components/maxilo/navigation/tab.vue');

var _tab2 = _interopRequireDefault(_tab);

var _render = require('components/maxilo/libs/render.vue');

var _render2 = _interopRequireDefault(_render);

var _form = require('components/maxilo/form/form.vue');

var _form2 = _interopRequireDefault(_form);

var _input = require('components/maxilo/form/input.vue');

var _input2 = _interopRequireDefault(_input);

var _inputGroup = require('components/maxilo/form/inputGroup.vue');

var _inputGroup2 = _interopRequireDefault(_inputGroup);

var _textarea = require('components/maxilo/form/textarea.vue');

var _textarea2 = _interopRequireDefault(_textarea);

var _checkbox = require('components/maxilo/form/checkbox.vue');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _link = require('components/maxilo/form/link.vue');

var _link2 = _interopRequireDefault(_link);

var _help = require('components/maxilo/form/help.vue');

var _help2 = _interopRequireDefault(_help);

var _editor = require('components/maxilo/form/editor.vue');

var _editor2 = _interopRequireDefault(_editor);

var _switch = require('components/maxilo/form/switch.vue');

var _switch2 = _interopRequireDefault(_switch);

var _select = require('components/maxilo/form/select.vue');

var _select2 = _interopRequireDefault(_select);

var _datePicker = require('components/maxilo/form/datePicker.vue');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _jFUpload = require('components/maxilo/form/jFUpload.vue');

var _jFUpload2 = _interopRequireDefault(_jFUpload);

var _row = require('components/maxilo/layout/row.vue');

var _row2 = _interopRequireDefault(_row);

var _col = require('components/maxilo/layout/col.vue');

var _col2 = _interopRequireDefault(_col);

var _rowCol = require('components/maxilo/layout/rowCol.vue');

var _rowCol2 = _interopRequireDefault(_rowCol);

var _rowColDocker = require('components/maxilo/layout/rowColDocker.vue');

var _rowColDocker2 = _interopRequireDefault(_rowColDocker);

var _formGroup = require('components/maxilo/layout/formGroup.vue');

var _formGroup2 = _interopRequireDefault(_formGroup);

var _formGroups = require('components/maxilo/layout/formGroups.vue');

var _formGroups2 = _interopRequireDefault(_formGroups);

var _formGroupsTest = require('components/maxilo/layout/formGroupsTest.vue');

var _formGroupsTest2 = _interopRequireDefault(_formGroupsTest);

var _formDocker = require('components/maxilo/form/formDocker.vue');

var _formDocker2 = _interopRequireDefault(_formDocker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//form


//nav


//other


//layout
var components = [
/*饿了么组件*/
_elementUi.Dialog, _elementUi.Button, _elementUi.Pagination, _elementUi.Input, _elementUi.DatePicker, _elementUi.Select, _elementUi.Option, _elementUi.Dropdown, _elementUi.DropdownMenu, _elementUi.DropdownItem, _elementUi.Transfer, _elementUi.Switch, _elementUi.Row, _elementUi.Col, _elementUi.Checkbox, _elementUi.CheckboxGroup, _elementUi.CheckboxButton, _elementUi.RadioButton, _elementUi.RadioGroup, _elementUi.Form, _elementUi.FormItem, _help2.default, _maxiloTable2.default, _loading2.default, _render2.default, _tree2.default, _table2.default, _map2.default, _docker2.default, _form2.default, _input2.default, _inputGroup2.default, _textarea2.default, _select2.default, _checkbox2.default, _modal2.default, _vhelp2.default, _link2.default, _tab2.default, _fileList2.default, _editor2.default, _datePicker2.default, _switch2.default, _row2.default, _rowColDocker2.default, _formGroup2.default, _formGroups2.default, _col2.default, _rowCol2.default, _formGroupsTest2.default, _formDocker2.default, _jFUpload2.default];

//libs


//data


var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    components.map(function (component) {
        Vue.component(component.name, component);
    });

    Vue.component('ohFg', _formGroup2.default);

    var t = ['xs', 'sm', 'md', 'lg'];
    for (var j = 0; j <= 3; j++) {
        for (var i = 1; i <= 12; i++) {
            Vue.component('oh-c-' + t[j] + '-' + i, {
                template: '<maxilo-col l="' + i + '" t="' + t[j] + '" :oc="after" :ocs="before"><slot></slot></maxilo-col>',
                components: { maxiloCol: _col2.default },
                props: {
                    before: {
                        default: ''
                    },
                    after: {
                        default: ''
                    }
                }
            });
            Vue.component('oh-c-' + i, {
                template: '<maxilo-col l="' + i + '" t="md" :oc="after" :ocs="before"><slot></slot></maxilo-col>',
                components: { maxiloCol: _col2.default },
                props: {
                    before: {
                        default: ''
                    },
                    after: {
                        default: ''
                    }
                }
            });
        }
    }
};

exports.default = { install: install };