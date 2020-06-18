import landing from './components/landing.vue';
import map from './components/map.vue';

export const routes = [
    {path: '/', component: landing, name: 'landing' },
    {path: '/map', component: map, name: 'map' },
]