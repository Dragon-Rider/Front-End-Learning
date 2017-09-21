---
layout: default
title: {{ site.name }}
---

# 版本控制工具Git

> Git是重要的版本控制工具，这里列一些平常比较少用的Git语法, 作为备忘录。

### 1. Commit之后重新修改Commit Message的内容
```bash
    $ git commit --amend -m "the new message" 
```

### 2. 丢弃还未commit的本地修改
```bash
    $ git checkout -f 
```

### 3. git查看分支图表
```bash
    $ git log --graph
```

### 4. 合并分支git rebase与git merge 
```bash
    $ git rebase dev        //将dev分支合并到当前分支
    $ git merge --no-ff dev //将dev分支合并到当前分支(不使用fast-forward方式)
```
这里可以绘制图表比较三者关系，参考下面的文档。(待补充~~)

### 5. git删除本地和远程分支
远程分支删除：
```bash
    $ git push origin --delete <branchName>
```

本地分支删除：
```bash
    $ git branch -d <branchName>
```

### 6. git垃圾回收机制
```bash
    $ git gc
```
在大的仓库中, git靠压缩历史信息来节约磁盘和内存空间，压缩操作并不是自动进行的, 你需要手动执行 git gc。压缩操作比较耗时, 你运行git gc命令最好是在你没有其它工作的时候。

### 7. git多行注释
```bash
    $ git commit -am "1. update;
    2. update;
    3. update;"
```


## 参考文档
- [How to rename commit messages in Git?](https://stackoverflow.com/questions/10748749/how-to-rename-commit-messages-in-git)
- [git merge和git rebase小结](http://blog.csdn.net/wh_19910525/article/details/7554489)
- [维护Git(git gc)](http://gitbook.liuhui998.com/4_10.html)
- [git merge --no-ff是什么意思](https://segmentfault.com/q/1010000002477106)
- [Git查看、删除、重命名远程分支和tag](https://blog.zengrong.net/post/1746.html)
