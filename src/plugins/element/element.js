import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'

import locale from 'element-ui/lib/locale/lang/zh-CN'
import GeminiScrollbar from 'vue-gemini-scrollbar'
import baseCard from '@/components/card/base-card'
import titleCard from '@/components/card/title-card'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

Vue.use(Element, {locale});
Vue.use(Avue);
Vue.use(GeminiScrollbar);

Vue.component('base-card', baseCard);
Vue.component('title-card', titleCard);

console.log(
    '.__        __        .___     ________\n' +
    '|__| _____/  |_    __| _/____ \\_____  \\\n' +
    '|  |/  _ \\   __\\  / __ |/ ___\\  _(__  <\n' +
    '|  (  <_> )  |   / /_/ \\  \\___ /       \\\n' +
    '|__|\\____/|__|   \\____ |\\___  >______  /\n' +
    '                      \\/    \\/       \\/\n' +
    '  https://dc3.site\n' +
    '  https://gitee.com/pnoker/iot-dc3\n' +
    '  https://github.com/pnoker/iot-dc3\n' +
    ' DC3 IOT Platform V3.0 Pnoker Authors'
);
