import { createApp } from 'vue'
import App from './MainPage.vue'

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// import VueRouter from 'vue-router'

// MD editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Code highlight

import Prism from 'prismjs';

//MD preview
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
VMdPreview.use(vuepressTheme, {
    Prism,
});


VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});


loadFonts()

createApp(App)
  .use(VMdPreview)
  .use(vuetify)
  .use(VueMarkdownEditor)
  .mount('#app')
