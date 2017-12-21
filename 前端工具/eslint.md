# 代码规范工具ESLint使用心得

### 问题：
使用 eslint --fix 'some file' ，自动修复某些文件报错：Can't find modules 'some config'

### 原因：
这可能是因为你全局安装了 eslint ，但是你的 config 文件是安装在当前项目的，如果直接使用 eslint --fix 'file'，这时调用的是全局的 eslint 而你的 config 在本项目中，所以无法找到。

### 解决方案：
可以使用项目里的本地 eslint 进行自动修复，eg: node_modules/.bin/eslint --fix 'file' 这样操作。

### 参考文档：
+ [ESLint-Config-Standard Issue: Cannot find module 'eslint-config-standard'](http://link.zhihu.com/?target=https%3A//github.com/standard/eslint-config-standard/issues/84)
