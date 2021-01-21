<template>
    <section class="resource-container">
        <div class="resource layer" v-for="(layer, layerIndex) in this.resources" :key="layerIndex">
            <div :class="[layer.resource.type, layer.resource.dataType]" :style="layerBackgroundProperties(layer)"></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ResourceRenderer",
        props: [
            'resource',
            'defaultProperties'
        ],
        computed: {
            resources: function() {
                if(!!this.resource.resources) {
                    return this.resource.resources;
                } else {
                    return [{
                        layerIndex: 0,
                        properties: !!this.defaultProperties ? this.defaultProperties : {},
                        resource: this.resource
                    }];
                }
            }
        },
        methods: {
            layerBackgroundProperties: function(resource) {
                return Object.assign({}, resource.properties, {'--layer-data': `${resource.resource.dataType == 'url' ? 'url(' : ''}${resource.resource.data}${resource.resource.dataType == 'url' ? ')' : ''}`})
            }
        }
    }
</script>

<style scoped>
    .layer, .layer * {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .layer .colour.hexcode {
        background-color: var(--layer-data);
    }
    .layer .colour.gradient {
        background: var(--layer-data);
    }
    .layer .image.url {
        background-image: var(--layer-data);
        background-repeat: no-repeat;
        background-size: var(--background-size, cover);
        background-position: var(--background-position, center);
    }
</style>