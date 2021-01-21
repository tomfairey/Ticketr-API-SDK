# Ticketr-API-SDK
 JS SDK for the Ticketr API

 In '/res/' there is a file named 'ResourceRenderer.vue', this is a Vue module that takes a 'resource' prop that accepts either a 'TicketrResource' or 'TicketrResourceGroup' instance. A 'defaultProperties' can also be passed, when loading a TicketrOperator's logo you **must** pass this prop tha value of "{'--background-size': 'contain', '--background-position': 'left top'}", all other uses do not require this prop at all.