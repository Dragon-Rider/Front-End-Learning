---
layout: default
title: {{ site.name }}
---

# 版本控制工具Git

> Git是重要的版本控制工具，这里列一些平常比较少用的Git语法, 作为备忘录。

### 1. Commit之后重新修改Commit Message的内容
    git commit --amend -m "the new message" 

### 2. 丢弃还未commit的本地修改
    git checkout -f 

### 3. git查看分支图表
    git log --graph

### 4. 合并分支
    git rebase dev //将dev分支合并到当前分支

### 5. git垃圾回收机制
    git gc

## 参考文档
---
- [How to rename commit messages in Git?](https://stackoverflow.com/questions/10748749/how-to-rename-commit-messages-in-git)
- [git merge和git rebase小结](http://blog.csdn.net/wh_19910525/article/details/7554489)
- [维护Git](http://gitbook.liuhui998.com/4_10.html)
