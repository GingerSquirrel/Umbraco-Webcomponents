/// <reference types="@umbraco-cms/backoffice" />

declare module "@umbraco-cms/backoffice/external/lit" {
  export * from "lit";
  export * from "lit/decorators.js";
}

declare module "@umbraco-cms/backoffice/element-api" {
  export * from "@umbraco-cms/backoffice/dist-cms/libs/element-api";
}

declare module "@umbraco-cms/backoffice/notification" {
  export * from "@umbraco-cms/backoffice/dist-cms/packages/core/notification";
}
