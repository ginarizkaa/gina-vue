import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'

import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QTable,
  QTh,
  QTr,
  QTd,
  QForm,
  QInput,
  QToggle,
  Notify,
  QBtnDropdown,
  ClosePopup,
  QSelect
} from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: {}
  },
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QTable,
    QTh,
    QTr,
    QTd,
    QForm,
    QInput,
    QToggle,
    Notify,
    QBtnDropdown,
    QSelect
  },
  directives: {
    ClosePopup
  },
  plugins: {
    Notify
  }
 })