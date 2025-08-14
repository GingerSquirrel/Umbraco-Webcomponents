const e = [
  {
    name: "Ginger Squirrel Seo Preview Entrypoint",
    alias: "GingerSquirrel.SeoPreview.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-Bf__tWrZ.js")
  }
], r = [
  {
    type: "propertyEditorUi",
    alias: "GingerSquirrel.PropertyEditorUi.SEOPreview",
    name: "SEO Preview Property Editor UI",
    element: () => import("./seo-preview-property-editor-ui.element-Dx0_GRXh.js"),
    meta: {
      label: "SEO Preview",
      icon: "icon-search",
      group: "common",
      propertyEditorSchemaAlias: "Umbraco.Plain.JSON"
    }
  }
], i = [
  ...e,
  ...r
];
export {
  i as manifests
};
//# sourceMappingURL=ginger-squirrel-seo-preview.js.map
