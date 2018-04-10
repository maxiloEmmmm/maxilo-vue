import {
    Dialog,
    Button,
    Pagination,
    Input,
    DatePicker,
    Select,
    Option,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Transfer,
    Switch,
    Row,
    Col,
    Checkbox,
    CheckboxGroup,
    CheckboxButton,
    RadioButton,
    RadioGroup,
    Form,
    FormItem
} from 'element-ui';

//data
import maxiloBTable from 'components/maxilo/data/table.vue';
import maxiloTree from 'components/maxilo/data/tree.vue';
import maxiloTable from 'components/maxilo/data/maxilo-table.vue';

//layout
import maxiloMap from 'components/maxilo/layout/map.vue';
import maxiloDocker from 'components/maxilo/layout/docker.vue';

//other
import maxiloModal from 'components/maxilo/other/modal.vue';
import maxiloHelp from 'components/maxilo/other/vhelp.vue';
import maxiloLoading from 'components/maxilo/other/loading.vue';
import maxiloFileList from 'components/maxilo/other/fileList.vue';


//nav
import maxiloTab from 'components/maxilo/navigation/tab.vue';

//libs
import maxiloRender from 'components/maxilo/libs/render.vue';

//form
import maxiloForm from 'components/maxilo/form/form.vue';
import maxiloInput from 'components/maxilo/form/input.vue';
import maxiloInputGroup from 'components/maxilo/form/inputGroup.vue';
import maxiloTextarea from 'components/maxilo/form/textarea.vue';
import maxiloCheckbox from 'components/maxilo/form/checkbox.vue';
import maxiloLink from 'components/maxilo/form/link.vue';
import maxiloVHelp from 'components/maxilo/form/help.vue';
import maxiloV2vEditor from 'components/maxilo/form/editor.vue';
import maxiloV2vSwitch from 'components/maxilo/form/switch.vue';
import maxiloSelect from 'components/maxilo/form/select.vue';
import maxiloV2vDatePicker from 'components/maxilo/form/datePicker.vue';
import maxiloUpload from 'components/maxilo/form/jFUpload.vue';



const components = [
    /*饿了么组件*/
    Dialog,
    Button,
    Pagination,
    Input,
    DatePicker,
    Select,
    Option,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Transfer,
    Switch,
    Row,
    Col,
    Checkbox,
    CheckboxGroup,
    CheckboxButton,
    RadioButton,
    RadioGroup,
    Form,
    FormItem,

    maxiloVHelp,
    maxiloTable,
    maxiloLoading,
    maxiloRender,
    maxiloTree,
    maxiloBTable,
    maxiloMap,
    maxiloDocker,
    maxiloForm,
    maxiloInput,
    maxiloInputGroup,
    maxiloTextarea,
    maxiloSelect,
    maxiloCheckbox,
    maxiloModal,
    maxiloHelp,
    maxiloLink,
    maxiloTab,
    maxiloFileList,

    maxiloV2vEditor,
    maxiloV2vDatePicker,
    maxiloV2vSwitch,

    maxiloRow,
    maxiloRcDocker,
    maxiloFormGroup,
    maxiloFormGroups,
    maxiloCol,
    maxiloRowCol,
    maxiloFormGroupsTest,
    maxiloFormDocker,
    maxiloUpload
];

import maxiloRow from 'components/maxilo/layout/row.vue';
import maxiloCol from 'components/maxilo/layout/col.vue';
import maxiloRowCol from 'components/maxilo/layout/rowCol.vue';
import maxiloRcDocker from 'components/maxilo/layout/rowColDocker.vue';
import maxiloFormGroup from 'components/maxilo/layout/formGroup.vue';
import maxiloFormGroups from 'components/maxilo/layout/formGroups.vue';
import maxiloFormGroupsTest from 'components/maxilo/layout/formGroupsTest.vue';
import maxiloFormDocker from 'components/maxilo/form/formDocker.vue';

const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });

    Vue.component('ohFg', maxiloFormGroup);

    let t = ['xs', 'sm', 'md', 'lg'];
    for(let j = 0; j <= 3; j++) {
        for(var i = 1; i <= 12; i++) {
            Vue.component('oh-c-' + t[j] + '-' + i, {
                template: '<maxilo-col l="' + i + '" t="' + t[j] + '" :oc="after" :ocs="before"><slot></slot></maxilo-col>',
                components: { maxiloCol },
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
                components: { maxiloCol },
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

export default {install};