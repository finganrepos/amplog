<template>
<div>
<header class="headerbar">
    <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
    <a href="/" class="site-name"><h1>{{appConfigs.title}}</h1></a>
	
</header>
<nuxt/>
<amp-analytics type="gtag" data-credentials="include" v-if="appConfigs.analyticsID">
    <script type="application/json" v-html="analyticsData"></script>
</amp-analytics>
</div>
</template>

<script>
import { appConfigs } from '../configs'

var analyticsData = {
    "vars" : {
        config: {}
    },
}
if (appConfigs.analyticsID) {
    analyticsData.vars.gtag_id = appConfigs.analyticsID
    analyticsData.vars.config[appConfigs.analyticsID] = { "groups": "default" }
}
export default {
    data() {
        return { 
            appConfigs: appConfigs,
            analyticsData: analyticsData 
        }
    }
}
</script>
