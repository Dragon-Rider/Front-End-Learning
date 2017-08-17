---
layout: default
title: {{ site.name }}
---

# 代码规范工具eslint



Note
Can't find modules 'some config',  是因为你全局安装了eslint，但是你的config文件是安装在当前项目的，你如果直接eslint --fix file，这时调用的是全局的eslint而你的config在本地，所以无法找到。

你可以使用项目里的本地eslint进行自动修复，eg: node_modules/.bin/eslint --fix 'file' 这样操作。

参考文档：[git代码统计](http://link.zhihu.com/?target=https%3A//github.com/standard/eslint-config-standard/issues/84)
