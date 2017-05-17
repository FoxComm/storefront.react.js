# FoxCommerce React Storefront concepts

## 1. Data/View separation

FoxCommerce react storefront library is a view layer which helps you show your data to client.
Each component or view has strictly defined interface which it accepts for data rendering.
Interface are described through flow types.

## 2. Theming and customization

Component level customization (in runtime):

1. You could override styles mapping for component
2. You could override/patch existing style in css for component

SDK core built with "default" theme.
Theming is done by overriding existing structure of SDK by new jsx/css/whatever.
You can completely override all files if you want.

So here we get build time customization, by overriding one or multiple files in SDK.