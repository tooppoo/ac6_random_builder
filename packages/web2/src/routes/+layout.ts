import i18n from '$lib/i18n/define';
import { setContext } from 'svelte';

export const prerender = true;

setContext('i18n', i18n)
