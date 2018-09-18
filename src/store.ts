import Vue from 'vue';
import Vuex from 'vuex';
import ProjectItem from './model/ProjectItem';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [
      {
        id: 'xx1',
        name: '系统名称',
        selected: false,
        descr: '这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;',
      }, {
        id: 'xx2',
        name: '系统名称',
        selected: false,
        descr: '这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;',
      }, {
        id: 'xx3',
        name: '系统名称',
        selected: false,
        descr: '这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;',
      }, {
        id: 'xx4',
        name: '系统名称',
        descr: '这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;',
        selected: false,
      }, {
        id: 'xx5',
        name: '系统名称',
        descr: '这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;',
        selected: false,
      }, {
        id: 'xx6',
        name: '系统名称',
        descr: '这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;这是一段文字说明xxx;',
        selected: false,
      },
    ],
  },
  mutations: {
    delPro(state, id) {
      const oldPros: ProjectItem[] = state.projects;
      state.projects = oldPros.filter((item) => item.id !== id);
    },
  },
  actions: {

  },
});
